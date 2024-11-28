import Link from 'next/link';

export const metadata = {
    title: 'Sign Up',
};

async function handleSignup(formData: FormData) {
    'use server'; //needed to mark this as server bc we used Next.js Form component
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        console.error('Passwords do not match.');
        return; //STOP and console log error
    }

    console.log(
        JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
        })
    );
}

export default function SignUpPage() {
    return (
        <div>
            <h1>Sign Up</h1>
            <form action={handleSignup}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    required
                />
                <br />
                <label htmlFor="enail">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    required
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link href="/login">
                    <button>Log In</button>
                </Link>
            </p>
        </div>
    );
}
