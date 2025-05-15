'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/firebase/auth';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import GridViewIcon from '@mui/icons-material/GridView';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Store from '@mui/icons-material/Store';

export default function NavBar() {
    const router = useRouter();
    const path = usePathname();
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const setLoading = useUserStore((state) => state.setLoading);
    const [collapsed, setCollapsed] = useState(false);
    const setUser = useUserStore((state) => state.setUser);
    const setRole = useUserStore((state) => state.setRole);
    const setUID = useUserStore((state) => state.setUID);
    interface Tab {
        href: string;
        tab: string;
        icon: React.JSX.Element;
    }

    const [tabs, setTabs] = useState<Tab[]>([]);
    // console.log('role:', role);

    // Toggle sidebar collapse state
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    // Reset and set tabs based on user role
    useEffect(() => {
        if (!user) {
            setTabs([]);
            return;
        }

        // Set tabs based on role
        if (role === 'eo_admin') {
            setTabs([
                {
                    href: '/eo-admin',
                    tab: 'Dashboard',
                    icon: <GridViewIcon />,
                },
                {
                    href: '/eo-admin',
                    tab: 'Courses',
                    icon: <CollectionsBookmarkIcon />,
                },
                {
                    href: '/eo-admin',
                    tab: 'Schools',
                    icon: <SchoolOutlinedIcon />,
                },
                {
                    href: '/eo-admin',
                    tab: 'Reports',
                    icon: <QueryStatsIcon />,
                },
            ]);
        } else if (role === 'school_admin') {
            setTabs([
                {
                    href: '/admin',
                    tab: 'Dashboard',
                    icon: <GridViewIcon />,
                },
                {
                    href: '/courses',
                    tab: 'Courses',
                    icon: <CollectionsBookmarkIcon />,
                },
                {
                    href: '/schools',
                    tab: 'Schools',
                    icon: <SchoolOutlinedIcon />,
                },
                {
                    href: '/reports',
                    tab: 'Reports',
                    icon: <QueryStatsIcon />,
                },
            ]);
        } else if (role === 'student') {
            setTabs([
                {
                    href: '/courses',
                    tab: 'Courses',
                    icon: <BookIcon />,
                },
                {
                    href: '/profile',
                    tab: 'Profile',
                    icon: <PermIdentityIcon />,
                },
                {
                    href: '/store',
                    tab: 'Store',
                    icon: <Store />,
                },
            ]);
        } else {
            // Clear tabs for unknown roles
            setTabs([]);
        }
    }, [user, role]);

    // Handle logout
    const handleLogout = async () => {
        setLoading(true);
        setTabs([]);
        setUser(null);
        setRole('');
        setUID('');
        await logout();
        router.push('/signin');
    };
    const hideNavBar = path.startsWith('/courses/') && path !== '/courses';

    if (hideNavBar) return null;
    return (
        <nav
            className={`bg-black min-h-screen w-64 p-4 shadow-md flex flex-col justify-start transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
        >
            <div className="flex-none mb-6 flex items-center">
                <div
                    className={
                        collapsed ? 'w-full flex justify-center' : 'mr-4'
                    }
                >
                    <button
                        onClick={toggleSidebar}
                        className={`text-white p-1 rounded hover:bg-gray-800 ${collapsed ? 'mx-auto mt-4' : ''}`}
                        aria-label={
                            collapsed ? 'Expand sidebar' : 'Collapse sidebar'
                        }
                    >
                        {collapsed ? <MenuOpenIcon /> : <MenuIcon />}
                    </button>
                    <Link href={user ? '/' : '/signin'}>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={collapsed ? 40 : 80}
                            height={collapsed ? 40 : 80}
                            style={{
                                width: 'auto',
                                height: '100%',
                            }}
                        />
                    </Link>
                </div>
            </div>

            <ul className="flex-grow flex flex-col space-y-5">
                {tabs.map(({ href, tab, icon }) => (
                    <li
                        key={`${href}-${tab}`}
                        className={`relative text-lg w-full rounded-md ${
                            path.startsWith(href)
                                ? 'bg-white text-black'
                                : 'text-white'
                        } ${collapsed ? 'flex justify-center' : ''}`}
                        title={collapsed ? tab : ''}
                    >
                        {collapsed ? (
                            <Link
                                href={href}
                                className="py-2 px-2 flex justify-center items-center"
                            >
                                {icon}
                            </Link>
                        ) : (
                            <>
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    {icon}
                                </span>
                                <Link
                                    href={href}
                                    className="block w-full px-4 py-2 ml-8"
                                >
                                    {tab}
                                </Link>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Logout button at the bottom */}
            {user != null && (
                <div className="flex-none mt-auto pt-3">
                    <div
                        className={`relative text-lg w-full ${collapsed ? 'flex justify-center' : ''}`}
                    >
                        {collapsed ? (
                            <button
                                className="py-2 px-2 text-white"
                                title="Logout"
                                onClick={handleLogout}
                            >
                                <LogoutIcon />
                            </button>
                        ) : (
                            <>
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <LogoutIcon />
                                </span>
                                <button
                                    className="block w-full rounded-md px-4 py-2 text-white text-lg ml-8 text-left"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
