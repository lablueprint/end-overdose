'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { addAdmin, getSchoolorEOAdmin } from '@/app/api/admins/actions';
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
import { role } from '@/store/userStore';

export default function InitAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setUser, setLoading, setRole, setUID, user } = useUserStore();
    const auth = getAuth();

    // check for saved student in local storage
    const fetchStudent = async () => {
        const savedStudent = await getCookie('student-token');
        // student is logged in
        if (savedStudent && savedStudent.value !== '') {
            // check if the token username password is valid
            const tokenData = JSON.parse(savedStudent.value);
            // console.log('Token Data:', tokenData);
            const result = await validateUserCredentials(
                tokenData.school,
                tokenData.username,
                tokenData.password
            );
            if (!result.success) {
                // console.log('Invalid token');
                setUser(null);
                return false;
            }
            // console.log('Valid token');
            // if the token is valid, get the student data
            const studentDoc = await getStudent(result.firebase_id);
            if (studentDoc) {
                setUser(studentDoc);
                setUID(result.firebase_id);
                setRole('student');
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        setLoading(true);
        // Confirm the link is a sign-in with email link.
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
                    // Clear email from storage
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

        // handle admin auth state
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            console.log('Auth State Changed:', authUser);

            if (authUser) {
                const admin = await getSchoolorEOAdmin(authUser.uid);
                if (admin) {
                    setUser(admin.result);
                    setUID(authUser.uid);
                    setRole(admin.role as role);
                } else {
                    setUser(null);
                    setUID('');
                    setRole('');
                }
            } else {
                const hi = await fetchStudent();
                if (hi == false){
                    setCookie('admin-token', '');
                    setUser(null);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setLoading, setUID, setRole]);

    return <>{children}</>;
}
