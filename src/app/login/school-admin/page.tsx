'use client';
import { useState } from 'react';
import signIn from '@/firebase/auth/signIn';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const SchoolAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { result, error } = await signIn(email, password);
        if (error) {
            setError(error);
        } else {
            const auth = getAuth();
            const db = getFirestore(firebase_app);
            const user = auth.currentUser;

            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const role = userDoc.data().role;
                    console.log('Role:', role);

                    if (role === 'school-admin') {
                        setSuccess(true);
                        console.log(
                            'School Admin signed in successfully:',
                            result?.userId
                        );
                    } else {
                        setError('Unauthorized access: Not a school admin.');
                    }
                } else {
                    setError('User data not found in Firestore.');
                }
            }
        }
    };

    return (
        <div>
            <h1>School Admin Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && (
                <p style={{ color: 'green' }}>
                    School Admin Signup successful!
                </p>
            )}
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
};

export default SchoolAdminLogin;
