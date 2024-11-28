'use client';
import {useState} from 'react';

const SchoolAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in as School Admin:', {email, password});
        //call the firebase sign-in function here
    };

    return (
        <div>
            <h1>School Admin Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default SchoolAdminLogin;
