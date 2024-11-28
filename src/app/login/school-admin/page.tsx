import Link from 'next/link';

export const metadata = {
    title: 'Log In',
};

async function handleLogin(formData: FormData) {
    'use server'; //needed to mark this as server bc we used Next.js Form component
    const schoolEmail = formData.get('schoolEmail');
    const password = formData.get('password');
    console.log(
        JSON.stringify({
            schoolEmail,
            password,
        })
    );
}

export default function LoginPage() {
    return (
        <div>
            <h1>Log In</h1>
            <form action={handleLogin}>
                <label htmlFor="schoolEmail">School Email:</label>
                <input
                    type="email"
                    name="schoolEmail"
                    id="schoolEmail"
                    placeholder="Enter email"
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    required
                />
                <br />
                <button type="submit">Log In</button>
            </form>
            <p>
                Don&apos;t have an account?{' '}
                <Link href="/signup">
                    <button>Sign Up</button>
                </Link>
            </p>
        </div>
    );
}
