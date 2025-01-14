'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

export default function AuthWrap({
    children,
    roles,
}: {
    children: React.ReactNode;
    roles: string[];
}) {
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const loading = useUserStore((state) => state.loading);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user == null) {
                // user is not signed in
                router.push('/login');
            } else if (!roles.includes(role)) {
                // user is not authorized to see the page
                router.push('/not-authorized');
            }
        }
    }, [user, loading, router, role, roles]);

    if (!loading && user && roles.includes(role)) {
        return <>{children}</>;
    }

    return <div>Loading...</div>;
}
