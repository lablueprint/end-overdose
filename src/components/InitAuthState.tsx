'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { getAdminFromEmail } from '@/app/api/admins/actions';
import { setCookie } from '@/firebase/cookies';
import { getStudent } from '@/app/api/students/actions';

export default function InitAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, setLoading, setRole, setUID } = useUserStore();

    useEffect(() => {
        setLoading(true);

        // listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            console.log('Auth State Changed:', authUser);

            // user is signed in
            if (authUser) {
                const token = await getIdToken(authUser);
                setCookie('user-token', token);

                const email = authUser.email || '';
                const isStudent = email.endsWith('@eo-placeholder.com');
                const user = isStudent
                    ? await getStudent(authUser.uid)
                    : await getAdminFromEmail(email);

                if (user) {
                    setUser(user);
                    setUID(authUser.uid);
                    if (!isStudent && 'role' in user) {
                        setRole(user.role);
                    } else {
                        setRole('student');
                    }
                } else {
                    setUser(null);
                    setRole('');
                    setUID('');
                }
            }
            // user is logged out
            else {
                // clear the user token cookie
                setCookie('user-token', '');
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setLoading, setUID, setRole]);

    return <>{children}</>;
}
