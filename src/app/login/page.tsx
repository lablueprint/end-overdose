import Link from 'next/link';

// interface metadata {
//     title: string;
// }
export const metadata = {
    title: 'Log In',
};

async function handleLogin(formData: FormData) {
    'use server'; //needed to mark this as server bc we used Next.js Form component
    const studentEmail = formData.get('studentEmail');
    const studentId = formData.get('studentId');
    const password = formData.get('password');
    console.log(
        JSON.stringify({
            studentEmail,
            studentId,
            password,
        })
    );
    // handleSubmit2({ title: 'Hello' });
}

// async function handleSubmit2(meta: metadata) {
//     console.log(meta.title);
// }

export default function LoginPage() {
    return (
        <div>
            <h1>Log In</h1>
            <form action={handleLogin}>
                <label htmlFor="studentEmail">Student Email:</label>
                <input
                    type="email"
                    name="studentEmail"
                    id="studentEmail"
                    placeholder="Enter email"
                    required
                />
                <br />
                <label htmlFor="studentId">Student ID:</label>
                <input
                    type="text"
                    name="studentId"
                    id="studentId"
                    placeholder="Enter student ID"
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
