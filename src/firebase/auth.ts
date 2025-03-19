import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    deleteUser,
} from 'firebase/auth';
import { auth } from './clientApp';
import { Admin } from '@/types/Admin';
import { Student } from '@/types/Student';
import { getUserInfo, handleUserCreation } from './auth_helpers';

export async function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

// this logs out the user
export async function logout(): Promise<{ error: string | null }> {
    try {
        console.log('Logging out');
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

type SignInResult = { id: string; user: Admin | Student };
export async function signIn(data: {
    role: string;
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
            throw new Error('User email is null.');
        }

        // get the user from firebase admins collection
        const doc = await getUserInfo(data.role, result.user.uid);
        if (!doc.docId || !doc.user) {
            throw new Error('User not found');
        }
        return {
            result: { id: doc.docId ?? '', user: doc.user },
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
