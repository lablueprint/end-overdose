import firebase_app from '@/firebase/config';
import {
    getAuth,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function signIn(
    email: string,
    password: string
): Promise<{ result: UserCredential | null; error: Error | null }> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { result, error: null };
    } catch (error) {
        return { result: null, error: error as Error };
    }
}
