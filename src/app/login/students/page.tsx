'use client';
import Link from 'next/link';
import styles from '../login.module.css';
import { useState } from 'react';
import { WolfPackAlphaUniversity, UCLA, School } from '@/types/School';
import {
    validateUserCredentials,
    getStudentFromID,
} from '@/app/api/students/actions';
import { useUserStore } from '@/store/userStore';

const StudentLogin = () => {
    const setUser = useUserStore((state) => state.setUser);
    const setUID = useUserStore((state) => state.setUID);
    const setRole = useUserStore((state) => state.setRole);
    const user = useUserStore((state) => state.user);
    const uid = useUserStore((state) => state.uid);
    const role = useUserStore((state) => state.role);

    const schools = [WolfPackAlphaUniversity, UCLA];

    const [schoolId, setSchoolId] = useState('');
    const [schoolName, setSchoolName] = useState(schools[0].name);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const schoolValues = schools.map((school: School) => (
        <option key={school.name} value={school.name}>
            {school.name}
        </option>
    ));

    //Change selected school from dropdown selection
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSchoolName = e.target.value;
        if (selectedSchoolName) {
            setSchoolName(selectedSchoolName);
        }
    };

    //Check authentication on form submit
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // console.log('Logging in as Student:', { schoolId, schoolName });
        //call the firebase sign-in function here
        const authentication = await validateUserCredentials(
            //Check if ID and password are inside map of selected school
            schoolName,
            schoolId,
            password
        );

        if (authentication) {
            const student = await getStudentFromID(schoolId);
            // console.log('student ; ', student);
            if (student) {
                setUID(student.student_id); //Set zustand state to hold user if authentication is successful
                setRole('student');
                setUser(student);
                setSuccess(true);
            } else {
                setError(
                    'Authentication successful, but unable to find student with that id in the database.'
                );
            }
        } else {
            console.log('User was unable to be authenticated');
            return;
        }
    };

    return (
        <div className={styles.splitContainer}>
            <div className={styles.placeHolderHalf}></div>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>Student Login</h1>
                            <h2 className={styles.h2}>
                                Login to your account using your school-given
                                credentials
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && (
                                <p style={{ color: 'green' }}>
                                    Admin Login successful!
                                </p>
                            )}
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="schoolId"
                                    >
                                        School ID
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        id="schoolId"
                                        value={schoolId}
                                        onChange={(e) =>
                                            setSchoolId(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="schoolName"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={styles.input}
                                        id="schoolName"
                                        name="schoolName"
                                        onChange={(e) => handleSelectChange(e)}
                                        required
                                    >
                                        {schoolValues}
                                    </select>
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    className={styles.loginButton}
                                    type="submit"
                                >
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.navigationContainer}>
                        <h2 className={styles.h2}>
                            {`Don't have an account?   `}
                            <Link className={styles.link} href="/signup">
                                Sign-up
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
