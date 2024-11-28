'use client';
import {useState} from 'react';
import signUp from '@/firebase/auth/signUp';

const SchoolAdminSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const { result, error } = await signUp(email, password);
        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            console.log(
                'School Admin signed up successfully:',
                result?.user
            );
        }
    };

    return (
        <div>
            <h1>School Admin Signup</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && (
                <p style={{ color: 'green' }}>School Admin Signup successful!</p>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="email">School Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SchoolAdminSignup;