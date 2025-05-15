'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import InvalidAccess from '@/components/InvalidAccess';
import { useEffect, useState } from 'react';

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
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            console.log('User:', user);
            if (user == null) {
                // user is not signed in
                router.push('/signin');
            } else if (!roles.includes(role)) {
                // user is not authorized to see the page
                router.push('/');
                setUnauthorized(true);
            }
        }
    }, [user, loading, router, role, roles]);

    if (!loading && user && roles.includes(role)) {
        return <>{children}</>;
    }
    if (unauthorized) {
        return <InvalidAccess />;
    }

    return <div>Loading...</div>;
}
