'use client';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div>
            <h1>Login</h1>
            <li>
                <Link href="/login/admin">
                    <button>Admin Login</button>
                </Link>
            </li>
            <li>
                <Link href="/login/students">
                    <button>Student Login</button>
                </Link>
            </li>
        </div>
    );
};

export default LoginPage;
