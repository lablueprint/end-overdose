import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    deleteUser,
    signInWithCustomToken,
} from 'firebase/auth';
import { auth } from './clientApp';
import { addAdmin } from '@/app/api/admins/actions';
import { Admin } from '@/types/Admin';
import { Student } from '@/types/Student';
import { getAdminFromEmail } from '@/app/api/admins/actions';
import { getStudentFromID } from '@/app/api/students/actions';
import { validateUserCredentials } from '@/app/api/students/actions';

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

type SignInResultStudent = { student: Student; UID: string };
export async function signInStudent(
    schoolName: string,
    schoolId: string,
    password: string
): Promise<{
    result: SignInResultStudent | null;
    error: string | null;
}> {
    try {
        const { success, token } = await validateUserCredentials(
            //Check if ID and password are inside map of selected school
            schoolName,
            schoolId,
            password
        );
        if (!success || !token) {
            return {
                result: null,
                error: 'Wrong student ID or password.',
            };
        }
        const result = await signInWithCustomToken(auth, token);
        if (!result.user.uid) {
            throw new Error('student id is null.');
        }
        const studentDoc = await getStudentFromID(result.user.uid);
        if (!studentDoc) {
            return {
                result: null,
                error: 'Unable to find student with that id.',
            };
        }
        return {
            result: { UID: result.user.uid, student: studentDoc },
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

// this signs in the user and returns the admin and its document id
type SignInResult = { id: string; admin: Admin };
export async function signIn(
    email: string,
    password: string
): Promise<{ result: SignInResult | null; error: string | null }> {
    try {
        // sign in through firebase auth
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.email) {
            throw new Error('User email is null.');
        }
        // get the admin from firebase admins collection
        const adminDoc = await getAdminFromEmail(result.user.email);
        if (!adminDoc) {
            return {
                result: null,
                error: 'Unable to find admin with that email.',
            };
        }
        // check if admin is approved
        if (!adminDoc.approved) {
            return {
                result: null,
                error: 'Admin not approved yet.',
            };
        }
        return {
            result: { id: adminDoc.id, admin: adminDoc },
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

// this creates a new auth user and adds a new admin to the database, as an atomic action
type SignUpResult = { userId: string; email: string | null };
export async function signUp(
    newAdmin: Admin,
    password: string
): Promise<{ result: SignUpResult | null; error: string | null }> {
    let authUser = null;
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            newAdmin.email,
            password
        );
        authUser = result.user;
        // add new admin to firebase admins collection
        try {
            await addAdmin(newAdmin, result.user.uid);
        } catch (adminError) {
            // if adding to admins collection fails, delete the auth user
            if (result.user) {
                await deleteUser(result.user);
            }
            throw adminError;
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
