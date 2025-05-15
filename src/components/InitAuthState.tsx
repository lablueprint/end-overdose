'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { addAdmin, getAdmin } from '@/app/api/admins/actions';
import {
    getStudent,
    validateUserCredentials,
} from '@/app/api/students/actions';
import { getCookie, setCookie } from '@/firebase/cookies';
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
    const { setUser, setLoading, setRole, setUID, user } = useUserStore();

    // check for saved student in local storage
    const fetchStudent = async () => {
        const savedStudent = await getCookie('student-token');
        // student is logged in
        if (savedStudent && savedStudent.value !== '') {
            // check if the token username password is valid
            const tokenData = JSON.parse(savedStudent.value);
            console.log('Token Data:', tokenData);
            const result = await validateUserCredentials(
                tokenData.school,
                tokenData.username,
                tokenData.password
            );
            if (!result.success) {
                // console.log('Invalid token');
                setUser(null);
                setLoading(false);
            }
            // console.log('Valid token');
            // if the token is valid, get the student data
            const studentDoc = await getStudent(result.firebase_id);
            if (studentDoc) {
                setUser(studentDoc);
                setUID(result.firebase_id);
                setRole('student');
            }
        }
        return true;
    };

    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);

            const auth = getAuth();
            const studentLoaded = await fetchStudent();

            // If student was found, don't do anything else (no admin logic needed)
            if (studentLoaded) {
                setLoading(false);
                return;
            }

            // check for email link sign-in
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt(
                        'Please provide your email for confirmation'
                    );
                }
                if (email) {
                    try {
                        await signInWithEmailLink(
                            auth,
                            email,
                            window.location.href
                        );
                        const newAdmin: Admin = {
                            name: { first: 'Test', last: 'Test' },
                            email,
                            role: 'school_admin',
                            school_name: 'UCLA',
                            approved: false,
                        };
                        if (auth.currentUser?.uid) {
                            await addAdmin(newAdmin, auth.currentUser?.uid);
                        }
                        window.localStorage.removeItem('emailForSignIn');
                    } catch (error) {
                        console.error('Email link sign-in error:', error);
                    }
                }
            }

            // handle admin auth state
            const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
                console.log('Auth State Changed:', authUser);

                if (authUser) {
                    const token = await getIdToken(authUser);
                    setCookie('admin-token', token);

                    const admin = await getAdmin(authUser.uid);
                    if (admin) {
                        setUser(admin);
                        setUID(authUser.uid);
                        setRole(admin.role || '');
                    } else {
                        setUser(null);
                        setUID('');
                        setRole('');
                    }
                } else {
                    setCookie('admin-token', '');
                    setUser(null);
                }
            });

            return unsubscribe;
        };

        const run = async () => {
            const unsubscribe = await initAuth();
            return () => {
                if (unsubscribe) unsubscribe();
            };
        };

        run();
    }, [setUser, setLoading, setUID, setRole]);

    return <>{children}</>;
}
