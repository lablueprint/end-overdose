'use client';
import Link from 'next/link';

const SignupPage = () => {
    return (
        <div>
            <h1>Signup</h1>
            <li>
                <Link href="/signup/admin">
                    <button>Admin Signup</button>
                </Link>
            </li>
        </div>
    );
};

export default SignupPage;
