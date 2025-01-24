'use client';
import Link from 'next/link';
import styles from '../login.module.css';
import { useState } from 'react';
import { WolfPackAlphaUniversity, UCLA, School } from '@/types/School';

const StudentLogin = () => {
    const [schoolId, setSchoolId] = useState('');
    const [school, setSchool] = useState(WolfPackAlphaUniversity);
    const [password, setPassword] = useState('');
    const schools = [WolfPackAlphaUniversity, UCLA];

    const schoolValues = schools.map((school: School) => (
        <option key={school.name} value={school.name}>
            {school.name}
        </option>
    ));

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSchoolName = e.target.value;
        const selectedSchool = schools.find(
            (s) => s.name === selectedSchoolName
        );
        if (selectedSchool) {
            setSchool(selectedSchool);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in as Student:', { schoolId, school });
        //call the firebase sign-in function here
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
                                        htmlFor="school"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={styles.input}
                                        id="school"
                                        name="school"
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
                        <div className={styles.navButtons}>
                            <Link className={styles.link} href="/login/admin">
                                <button>Admin Login </button>
                            </Link>
                            <Link
                                className={styles.link}
                                href="/login/students"
                            >
                                <button>Student Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
