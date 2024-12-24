'use client';
import Link from 'next/link';

const SignupPage = () => {
    return (
        <div>
            <h1>Signup</h1>
            <Link href="/signup/school-admin">
                <button>School Admin Login</button>
            </Link>
            <Link href="/login/students">
                <button>Student Login</button>
            </Link>
            <Link href="/signup/eo-admin">
                <button>EO Admin Login</button>
            </Link>
        </div>
    );
};

export default SignupPage;
