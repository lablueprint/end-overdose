import Form from 'next/form';
import Link from 'next/link';

export const metadata = {
    title: 'Sign Up',
};

async function handleSignup(formData: FormData) {
    'use server'; //needed to mark this as server bc we used Next.js Form component
    const studentEmail = formData.get('studentEmail');
    const studentId = formData.get('studentId');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        console.error('Passwords do not match.');
        return; //STOP and console log error
    }

    console.log(
        JSON.stringify({
            studentEmail,
            studentId,
            password,
            confirmPassword,
        })
    );
}

export default function SignUpPage() {
    return (
        <div>
            <h1>Sign Up</h1>
            <Form action={handleSignup}>
                <label htmlFor="studentEmail">Student Email:</label>
                <input
                    type="email"
                    name="studentEmail"
                    id="studentEmail"
                    placeholder="Enter your email"
                    required
                />
                <br />
                <label htmlFor="studentId">Student ID:</label>
                <input
                    type="text"
                    name="studentId"
                    id="studentId"
                    placeholder="Enter your student ID"
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
            </Form>
            <p>
                Already have an account?{' '}
                <Link href="/login">
                    <button>Log In</button>
                </Link>
            </p>
        </div>
    );
}
