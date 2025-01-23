'use server';

import firebase_app from '@/firebase/config';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function logout(): Promise<{ error: string | null }> {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        return { error: (error as Error).message };
    }
}
