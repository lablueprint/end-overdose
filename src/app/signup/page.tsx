'use client';
import Link from 'next/link';

const SignupPage = () => {
    return (
        <div>
            <h1>Signup</h1>
            <li>
                <Link href="/signup/school-admin">
                    <button>School Admin Signup</button>
                </Link>
            </li>
            <li>
                <Link href="/login/students">
                    <button>Student Signup</button>
                </Link>
            </li>
            <li>
                <Link href="/signup/eo-admin">
                    <button>EO Admin Signup</button>
                </Link>
            </li>
        </div>
    );
};

export default SignupPage;
