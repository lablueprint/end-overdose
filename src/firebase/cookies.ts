'use server';
import { cookies } from 'next/headers';

// getting cookies
export async function getCookie(key: string) {
    return (await cookies()).get(key);
}

// setting cookies
export async function setCookie(key: string, value: string) {
    (await cookies()).set(key, value, {
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // lifetime of 1 week
    });
}
