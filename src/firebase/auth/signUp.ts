'use server';

import firebase_app from '@/firebase/config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

type SignUpResult = { userId: string; email: string | null };

const auth = getAuth(firebase_app);

export default async function signUp(
    email: string,
    password: string
): Promise<{ result: SignUpResult | null; error: string | null }> {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const serializedResult: SignUpResult = {
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
