'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/firebase/auth';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();
    const path = usePathname();
    const user = useUserStore((state) => state.user);

    // add any new navigation tabs here
    const tabs = user
        ? [
              { href: '/courses', tab: 'Courses' },
              { href: '/quiz', tab: 'Quiz' },
              { href: '/profile', tab: 'Profile' },
              { href: '/admin', tab: 'Admin' },
              { href: '/testing', tab: 'Testing' },
          ]
        : [];

    return (
        <nav className="bg-black p-4 shadow-md h-full">
            <ul className="flex flex-col justify-start space-y-3">
                <li className="relative mb-3">
                    <Link href={user ? '/' : '/login'}>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            style={{
                                width: 'auto',
                                height: '100%',
                            }}
                        />
                    </Link>
                </li>

                {tabs.map(({ href, tab }) => (
                    <li
                        key={href}
                        className={`relative text-lg w-full ${
                            path.startsWith(href)
                                ? 'bg-white text-black rounded-md'
                                : 'text-white'
                        }`}
                    >
                        <Link href={href} className="block w-full px-4 py-2">
                            {tab}
                        </Link>
                    </li>
                ))}

                {/* only show logout button if user is logged in */}
                {user != null && (
                    <li className="relative text-lg w-full">
                        <button
                            className="block w-full bg-red-700 border-2 border-red-700 rounded-md px-4 py-2 text-white"
                            onClick={async () => {
                                await logout();
                                router.push('/login');
                            }}
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
