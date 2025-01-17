'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const path = usePathname();
    // add a new navigation tab here
    const tabs = [
        { href: '/courses', tab: 'Courses' },
        { href: '/quiz', tab: 'Quiz' },
        { href: '/jobs', tab: 'Jobs' },
        { href: '/profile', tab: 'Profile' },
        { href: '/admin', tab: 'Admin' },
        { href: '/login', tab: 'Login' },
        { href: '/signup', tab: 'Signup' },
        { href: '/testing', tab: 'Testing' },
    ];

    return (
        <nav className="bg-black p-4 shadow-md h-full">
            <ul className="flex flex-col justify-start space-y-3">
                <li className="relative mb-3">
                    <Link href="/">
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
                            path.includes(href)
                                ? 'bg-white text-black rounded-md'
                                : 'text-white'
                        }`}
                    >
                        <Link href={href} className="block w-full px-4 py-2">
                            {tab}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
