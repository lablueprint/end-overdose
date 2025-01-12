'use client';

// initialize the user when the app loads
import { useCallback, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { StudentJosh } from '@/types/Student';

export default function InitAuthState({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const setRole = useUserStore((state) => state.setRole);
    const setLoading = useUserStore((state) => state.setLoading);

    // placeholder to access all pages
    const autoSignIn = useCallback(() => {
        setUser(StudentJosh);
        setRole('student');
        setLoading(false);
    }, [setLoading, setUser, setRole]);

    useEffect(() => {
        if (!user) {
            // first check firebase auth for admin users
            // then check local storage for student users
            // otherwise, the user is null and do nothing

            autoSignIn(); // remove this line when you implement the above logic
        }
    }, [user, autoSignIn]);

    return <>{children}</>;
}
