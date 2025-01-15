'use client';
import { useState } from 'react';
import signIn from '@/firebase/auth/signIn';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const EOAdminLogin = () => {
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

                    if (role === 'eo-admin') {
                        setSuccess(true);
                        console.log(
                            'EO Admin signed in successfully:',
                            result?.userId
                        );
                    } else {
                        setError('Unauthorized access: Not an EO admin.');
                    }
                } else {
                    setError('User data not found in Firestore.');
                }
            }
        }
    };

    return (
        <div>
            <h1>End Overdose Admin Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && (
                <p style={{ color: 'green' }}>EO Admin Signup successful!</p>
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

export default EOAdminLogin;
