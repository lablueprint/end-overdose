'use client';
import { useState } from 'react';
import { loginAdmin } from '@/app/api/admins/actions';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await loginAdmin(email, password);
        if (response.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setSuccess(true);
            setError('');
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && (
                <p style={{ color: 'green' }}>Admin Login successful!</p>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default AdminLogin;
