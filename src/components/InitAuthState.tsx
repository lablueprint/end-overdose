'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { addAdmin, getAdminFromEmail } from '@/app/api/admins/actions';
import { setCookie } from '@/firebase/cookies';
import { Admin } from '@/types/Admin';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
} from 'firebase/auth';

export default function InitAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, setLoading, setRole, setUID } = useUserStore();

    useEffect(() => {
        setLoading(true);
        // Confirm the link is a sign-in with email link.
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                console.log(email);
                email = window.prompt(
                    'Please provide your email for confirmation'
                );
            }
            if (email) {
                // The client SDK will parse the code from the link for you.
                signInWithEmailLink(auth, email, window.location.href)
                    .then((result) => {
                        // Clear email from storage.
                        const newAdmin: Admin = {
                            name: {
                                // MAKE SURE TO IMPORT FIRST AND LAST NAME
                                first: 'Test',
                                last: 'Test',
                            },
                            email,
                            role: 'school_admin',
                            school_name: 'UCLA', // ALSO MAKE SURE TO IMPORT
                            approved: false,
                        };
                        if (auth.currentUser?.uid) {
                            addAdmin(newAdmin, auth.currentUser?.uid);
                        }
                        window.localStorage.removeItem('emailForSignIn');
                        // You can access the new user by importing getAdditionalUserInfo
                        // and calling it with result:
                        // getAdditionalUserInfo(result)
                        // You can access the user's profile via:
                        // getAdditionalUserInfo(result)?.profile
                        // You can check if the user is new or existing:
                        // getAdditionalUserInfo(result)?.isNewUser
                    })
                    .catch((error) => {
                        // Some error occurred, you can inspect the code: error.code
                        // Common errors could be invalid email and invalid or expired OTPs.
                    });
            }
        }

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
