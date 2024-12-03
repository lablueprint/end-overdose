import firebase_app from '@/firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function signUp(
    email: string,
    password: string
): Promise<{ result: UserCredential | null; error: Error | null }> {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { result, error: null };
    } catch (error) {
        return { result: null, error: error as Error };
    }
}
