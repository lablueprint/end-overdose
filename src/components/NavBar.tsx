'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/firebase/auth';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Store from '@mui/icons-material/Store';
import { getStudentFromID2 } from '@/app/api/students/actions';

export default function NavBar() {
    const router = useRouter();
    const path = usePathname();
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const setLoading = useUserStore((state) => state.setLoading);
    const [collapsed, setCollapsed] = useState(
        path.startsWith('/courses/') && path !== '/courses' ? true : false
    );
    const setUser = useUserStore((state) => state.setUser);
    const setRole = useUserStore((state) => state.setRole);
    const setUID = useUserStore((state) => state.setUID);
    const schoolSlug = useUserStore((state) => {
        const user = state.user;
        return user && 'school_id' in user ? user.school_id : undefined;
    });
    interface Tab {
        href: string;
        tab: string;
        icon: React.JSX.Element;
    }

    const [tabs, setTabs] = useState<Tab[]>([]);

    const [selectedBackground, setSelectedBackground] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [homePage, setHomePage] = useState('');
    // console.log('role:', role);

    // Toggle sidebar collapse state
    const toggleCollapse = () => {
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
                    icon: <BookIcon />,
                },
                {
                    href: '/admin',
                    tab: 'Schools',
                    icon: <PermIdentityIcon />,
                },
            ]);
            setHomePage('/eo-admin');
        } else if (role === 'school_admin') {
            setTabs([
                {
                    href: `/school-dashboard/${schoolSlug}`,
                    tab: 'Statistics',
                    icon: <QueryStatsIcon />,
                },
                {
                    href: `/students/${schoolSlug}`,
                    tab: 'Students',
                    icon: <SchoolOutlinedIcon />,
                },
            ]);
            setHomePage(`/school-dashboard/${schoolSlug}`);
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
            if ('profile' in user) {
                setSelectedBackground(
                    `/backgrounds/${user.profile.background}-profile.png`
                );
                setSelectedCat(`/cats/${user.profile.cat}.png`);
            }
            setHomePage('/');
        } else {
            // Clear tabs for unknown roles
            setTabs([]);
        }
    }, [user, role]);

    useEffect(() => {
        async function fetchThemes() {
            if (user && 'student_id' in user) {
                const student = await getStudentFromID2(user.student_id);
                if ('profile' in student) {
                    setSelectedBackground(
                        `/backgrounds/${student.profile.background}-profile.png`
                    );
                    setSelectedCat(`/cats/${student.profile.cat}.png`);
                }
            }
        }
        fetchThemes();
    }, [user]);

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
    //const hideNavBar = path.startsWith('/courses/') && path !== '/courses';
    const isAdmin = role === 'eo_admin' || role === 'school_admin';

    if (!user) return null;
    return (
        <nav
            className={`bg-[#0C1321] h-full flex flex-col p-6 shadow-lg transition-all duration-500 ease-in-out ${
                collapsed ? 'p-3 w-[80px]' : 'p-6'
            }`}
        >
            {collapsed && (
                <button
                    onClick={toggleCollapse}
                    className="text-white hover:bg-gray-800 rounded-full p-1 mt-6 mb-2 flex justify-center"
                    aria-label="Expand sidebar"
                >
                    <ChevronRight size={16} />
                </button>
            )}

            <div
                className={`mb-10 mt-4 ${collapsed ? 'flex justify-center' : 'ml-2 flex relative'}`}
            >
                <Link href={homePage}>
                    {collapsed ? (
                        <div className="flex justify-center items-center">
                            <Image
                                src="/smallLogo.svg"
                                alt="EO"
                                width={30}
                                height={20}
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <Image
                            src="/logo.png"
                            alt="End Overdose Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                        />
                    )}
                </Link>

                {!collapsed && !isAdmin && (
                    <button
                        onClick={toggleCollapse}
                        className="text-white hover:bg-gray-800 rounded-full p-1 absolute right-0"
                        aria-label="Collapse sidebar"
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
            </div>

            <ul
                className={`flex-grow flex flex-col space-y-2 mt-12 ${collapsed ? 'items-center' : ''}`}
            >
                {tabs.map(({ href, tab, icon }) => (
                    <li
                        key={href}
                        className={
                            collapsed ? 'w-full flex justify-center' : ''
                        }
                    >
                        <Link
                            href={href}
                            className={`flex items-center rounded-md ${collapsed ? 'justify-center p-2 w-10 h-10' : 'p-3'} ${
                                path === href
                                    ? 'bg-white text-black'
                                    : 'text-white hover:bg-gray-800'
                            }`}
                            title={collapsed ? tab : undefined}
                        >
                            <span className={collapsed ? '' : 'mr-3'}>
                                {icon}
                            </span>
                            {!collapsed && <span>{tab}</span>}
                        </Link>
                    </li>
                ))}
            </ul>

            {user && (
                <div
                    className={`mt-auto pt-4 ${collapsed ? 'flex flex-col items-center' : 'mb-2'}`}
                >
                    {'profile' in user && (
                        <div
                            className={`mb-4 ${collapsed ? 'flex flex-col items-center' : 'flex items-center'}`}
                        >
                            <div
                                className={`relative rounded-full overflow-hidden cursor-pointer ${
                                    collapsed
                                        ? 'w-10 h-10 mb-2'
                                        : 'w-12 h-12 mr-3'
                                }`}
                            >
                                <Image
                                    src={selectedBackground}
                                    alt="Avatar background"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center mt-4 ml-1">
                                    <Image
                                        src={selectedCat}
                                        alt="Avatar cat"
                                        width={80}
                                        height={80}
                                        className="object-contain z-10"
                                    />
                                </div>
                            </div>
                            <div
                                className={
                                    collapsed
                                        ? 'flex flex-col items-center'
                                        : ''
                                }
                            >
                                {!collapsed && (
                                    <p className="text-white text-sm">
                                        {user.profile.nameplate}
                                    </p>
                                )}
                                <div className="flex items-center mt-1">
                                    <Image
                                        src="/kibble.png"
                                        alt="Fish points"
                                        width={16}
                                        height={16}
                                        className="mr-1"
                                    />
                                    <span className="text-xs text-gray-400">
                                        {user.fish_count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className={
                            collapsed ? 'w-full flex justify-center' : ''
                        }
                    >
                        <button
                            className={`flex ${
                                collapsed
                                    ? 'justify-center p-2 w-10 h-10'
                                    : 'items-center w-full p-3'
                            } text-white rounded-md hover:bg-gray-800`}
                            onClick={handleLogout}
                            title={collapsed ? 'Logout' : undefined}
                        >
                            <LogoutIcon
                                className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`}
                            />
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
