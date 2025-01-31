'use client';
import { useState } from 'react';

const StudentLogin = () => {
    const [schoolId, setSchoolId] = useState('');
    const [schoolName, setSchoolName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in as Student:', { schoolId, schoolName });
        //call the firebase sign-in function here
    };

    return (
        <div>
            <h1>Student Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="schoolId">School Id:</label>
                <input
                    type="text"
                    id="schoolId"
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="schoolName">School Name:</label>
                <input
                    type="text"
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default StudentLogin;
