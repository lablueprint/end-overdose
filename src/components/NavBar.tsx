'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// navigation bar
export default function NavBar() {
    return (
        <nav className="bg-black p-4 shadow-md">
            <ul className="flex justify-start space-x-6">
                <li className="relative">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={100}
                            height={50}
                        />
                    </Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/courses'}>Courses</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/quiz'}>Quiz</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/profile'}>Profile</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/admin'}>Admin</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/login'}>Login</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/signup'}>Signup</Link>
                </li>

                <li className="relative text-white hover:text-gray-200">
                    <Link href={'/testing'}>Testing</Link>
                </li>
            </ul>
        </nav>
    );
}
