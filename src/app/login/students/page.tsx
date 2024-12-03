import Link from 'next/link';

export const metadata = {
    title: 'Log In',
};

async function handleLogin(formData: FormData) {
    'use server'; //needed to mark this as server bc we used Next.js Form component
    const schoolId = formData.get('schoolId');
    console.log(
        JSON.stringify({
            schoolId,
        })
    );
}

export default function LoginPage() {
    return (
        <div>
            <h1>Log In</h1>
            <form action={handleLogin}>
                <label htmlFor="schoolId">School ID:</label>
                <input
                    type="text"
                    name="schoolId"
                    id="schoolId"
                    placeholder="Enter school ID"
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
