'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { getAdmin } from '@/app/api/admins/actions';
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

                const student = await getStudent(authUser.uid);

                if (student) {
                    setUser(student);
                    setUID(authUser.uid);
                    setRole('student');
                } else {
                    const admin = await getAdmin(authUser.uid);
                    if (admin) {
                        setUser(admin);
                        setUID(authUser.uid);
                        if ('role' in admin) {
                            setRole(admin.role);
                        } else {
                            setRole('');
                        }
                    } else {
                        setUser(null);
                        setRole('');
                        setUID('');
                    }
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
