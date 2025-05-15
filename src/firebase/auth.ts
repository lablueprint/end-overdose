import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    deleteUser,
    getIdToken,
} from 'firebase/auth';
import { auth } from './clientApp';
import { handleUserCreation } from './auth_helpers';
import { setCookie } from './cookies';
import { NewStudent } from '@/types/newStudent';
import { getSchoolorEOAdmin } from '@/app/api/admins/actions';
import { getStudent } from '@/app/api/students/actions';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { NewEOAdmin } from '@/types/newEOAdmin';

export async function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

// this logs out the user
export async function logout(): Promise<{ error: string | null }> {
    try {
        console.log('Logging out');
        await setCookie('student-token', '');
        await auth.signOut();
        return { error: null };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

// this creates a new auth user and adds a new admin to the database, as an atomic action
type SignUpResult = { userId: string; email: string | null };
export async function signUp(data: {
    role: string;
    email: string;
    password: string;
    school_name: string;
}): Promise<{ result: SignUpResult | null; error: string | null }> {
    let authUser = null;
    try {
        const { role, password, ...rest } = data;
        const result = await createUserWithEmailAndPassword(
            auth,
            rest.email,
            password
        );
        authUser = result.user;
        // add new admin to firebase admins collection
        try {
            await handleUserCreation(role, rest, result.user.uid);
        } catch (error) {
            // if adding to collection fails, delete the auth user
            if (result.user) {
                await deleteUser(result.user);
            }
            throw error;
        }

        const serializedResult: SignUpResult = {
            userId: result.user.uid,
            email: result.user.email,
        };
        return { result: serializedResult, error: null };
    } catch (error) {
        if (authUser) {
            try {
                await deleteUser(authUser);
            } catch (deleteError) {
                console.error('Error cleaning up auth user:', deleteError);
            }
        }
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

type SignInResult = { id: string; user: NewSchoolAdmin | NewEOAdmin | NewStudent };

// sign in for students
export async function signInStudent(data: {
    firebase_id: string;
    username: string;
    password: string;
    school: string;
}): Promise<{ result: SignInResult | null; error: string | null }> {
    try {
        const doc = await getStudent(data.firebase_id);
        if (!doc || !doc.id) {
            throw new Error('Student not found');
        }
        await setCookie('student-token', JSON.stringify(data));
        return {
            result: { id: doc.id ?? '', user: doc },
            error: null,
        };
    } catch (error) {
        console.error(error);
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

// sign in for admin
export async function signInAdmin(data: {
    email: string;
    password: string;
}): Promise<{ result: SignInResult | null; error: string | null }> {
    try {
        // sign in through firebase auth
        const result = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        if (!result.user.email) {
            throw new Error('Admin email is null.');
        }

        // get the user from firebase admins collection
        const doc = await getSchoolorEOAdmin(result.user.uid);
        if (!doc || !doc.result.id) {
            throw new Error('Admin not found');
        }

        // set the cookie
        if (!auth.currentUser) {
            throw new Error('Auth Error');
        }
        const token = await getIdToken(auth.currentUser);
        setCookie('admin-token', token);
        
        return {
            result: { id: doc.result.id ?? '', user: doc.result },
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}
