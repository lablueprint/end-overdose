'use client';

// initialize the user when the app loads
import { useCallback, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { StudentJosh } from '@/types/Student';
import { useRouter } from 'next/navigation';
import { firebaseConfig } from '@/firebase/config';
import { onAuthStateChanged as _onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

export default function InitAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const setRole = useUserStore((state) => state.setRole);
    const setLoading = useUserStore((state) => state.setLoading);
    const auth = getAuth(firebase_app);

    function onAuthStateChanged(cb) {
        return _onAuthStateChanged(auth, cb);
    }

    // placeholder to access all pages
    // const autoSignIn = useCallback(() => {
    //     setUser(StudentJosh);
    //     setRole('student');
    //     setLoading(false);
    // }, [setLoading, setUser, setRole]);

    // useEffect(() => {
    //     if (!user) {
    //         // first check firebase auth for admin users
    //         // then check local storage for student users
    //         // otherwise, the user is null and do nothing

    //         autoSignIn(); // remove this line when you implement the above logic
    //     }
    // }, [user, autoSignIn]);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const serializedFirebaseConfig = encodeURIComponent(
                JSON.stringify(firebaseConfig)
            );
            const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

            navigator.serviceWorker
                .register(serviceWorkerUrl)
                .then((registration) =>
                    console.log('scope is: ', registration.scope)
                );
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            console.log(authUser);
            // setUser(authUser);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser) => {
            if (user === undefined) return;

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh();
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <>{children}</>;
}
