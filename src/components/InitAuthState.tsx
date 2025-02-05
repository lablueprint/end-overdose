'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { getAdminFromEmail } from '@/app/api/admins/actions';
import { setCookie } from '@/firebase/cookies';

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
                // set the user token as a cookie
                setCookie('user-token', token);
                // update the global user state
                if (authUser.email) {
                    const admin = await getAdminFromEmail(authUser.email);
                    if (admin) {
                        setUser(admin.approved ? admin : null);
                        setRole(admin.role);
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
    }, [setUser, setLoading]);

    return <>{children}</>;
}
