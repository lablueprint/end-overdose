'use server';

import firebase_app from '@/firebase/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

type SignInResult = { userId: string; email: string | null };

const auth = getAuth(firebase_app);

export default async function signIn(
    email: string,
    password: string
): Promise<{ result: SignInResult | null; error: string | null }> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const serializedResult: SignInResult = {
            userId: result.user.uid,
            email: result.user.email,
        };

        return { result: serializedResult, error: null };
    } catch (error) {
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}
