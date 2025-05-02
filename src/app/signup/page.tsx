'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState, useEffect } from 'react';
import { Student } from '@/types/Student';
import { Admin } from '@/types/Admin';
import { signUp } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { School } from '@/types/School';
import { WolfPackAlphaUniversity, UCLA } from '@/types/School';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    getAuth,
    sendSignInLinkToEmail,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import { addAdmin } from '@/app/api/admins/actions';
import { addStudent } from '@/app/api/students/actions';

type Inputs = {
    role: string;
    email: string;
    password: string;
    school_name: string;
};

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    // DELETE LATER TEMPORARY TOGGLE FOR STUDENT OR ADMIN
    const [student, setStudent] = useState(false);

    const roles = ['Student', 'School Admin', 'End Overdose Admin'];
    const roleValues = roles.map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: `${window.location.origin}/login`,
        // This must be true.
        handleCodeInApp: true,
        //links specificlaly for IOS or android
        //iOS: {
        //bundleId: 'com.example.ios',
        //},
        //android: {
        //packageName: 'com.example.android',
        //installApp: true,
        //minimumVersion: '12',
        //},
        // The domain must be configured in Firebase Hosting and owned by the project.
        linkDomain: 'end-overdose-bcbd0.firebaseapp.com',
    };

    //Change selected school from dropdown selection MERGE CONCLICT SO COMMENTED OUT IF DONT NEED DELETE
    /*const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSchoolName = e.target.value;
        if (selectedSchoolName) {
            setSchoolName(selectedSchoolName);
        }
    };*/
    const schools = ['UCLA', 'USC', 'UCSD', 'UCI', 'UCB'];
    const schoolValues = schools.map((school) => (
        <option key={school} value={school}>
            {school}
        </option>
    ));

    const { register, handleSubmit } = useForm<Inputs>();

    // Check if passwords match
    // if (password !== confirmPassword) {
    //     setError('Passwords do not match.');
    //     return;
    // }
    const onSubmit: SubmitHandler<Inputs> = async ({
        email,
        password,
        role,
        school_name,
    }) => {
        setError('');

        try {
            const auth = getAuth();
            // 1) Create the user in Firebase Auth with email & password
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const verifySettings =
                role === 'School Admin'
                    ? {
                          url: `${window.location.origin}/login`,
                          handleCodeInApp: true,
                      }
                    : {
                          url: `${window.location.origin}/onboarding`,
                          handleCodeInApp: true,
                      };

            // 2) Build your Admin object
            if (role === 'Student') {
                // build your student object
                const newStudent: Student = {
                    student_id: '12345',
                    email,
                    school_name,
                    nameplate: '',
                    kibble_count: 1000,
                    course_completion: {
                        opioidCourse: {
                            courseScore: 0, // half of lessons completed
                            courseProgress: 0, // half of modules completed in the current lesson
                        },
                        careerCourse: {
                            courseScore: 0,
                            courseProgress: 0,
                        },
                    },
                    quizzes: [
                        { name: 'quiz1', score: 0 },
                        { name: 'quiz2', score: 0 },
                    ],
                    badges: [],
                    certificates: [],
                };
                await addStudent(newStudent, user.uid);
                setSuccess(true);
                router.push('/onboarding');
                return;
            } else {
                // default to school admin
                const newAdmin: Admin = {
                    name: { first: 'Test', last: 'Test' },
                    email,
                    role: 'school_admin',
                    school_name,
                    approved: false,
                };
                await addAdmin(newAdmin, user.uid);
            }

            // 4) Send email‑verification instead of a magic link:
            if (role === 'SchoolAdmin') {
                await sendEmailVerification(user, verifySettings);
                console.log('Verification email sent');
                setSuccess(true);

                // 5) Redirect to login or dashboard
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong.');
        }
    };

    /*const response = await signUp(newAdmin, password);
        const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const response = await signUp(data);

        if (response.error) {
            setError(response.error);
            setSuccess(false);
        } else {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        }*/

    useEffect(() => {
        const auth = getAuth();
        auth.signOut();
    }, []);

    return (
        <div className={styles.splitContainer}>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <div className={styles.bodyContainer}>
                        <div className={styles.titleTextContainer}>
                            <h1 className={styles.h1}>CREATE AN ACCOUNT</h1>
                            <h2 className={styles.h2}>
                                We're so glad you could join us!
                            </h2>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && (
                            <p style={{ color: 'green' }}>Signup successful!</p>
                        )}
                        <div className={styles.formContainer}>
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className={styles.subForm}>
                                    <label className={styles.h2} htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        className={`${styles.input} ${styles.formControl}`}
                                        id="role"
                                        {...register('role', {
                                            required: true,
                                        })}
                                    >
                                        {roleValues}
                                    </select>
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="school_name"
                                    >
                                        School Name
                                    </label>
                                    <select
                                        className={`${styles.input} ${styles.formControl}`}
                                        id="schoolName"
                                        name="schoolName"
                                        onChange={(e) => handleSelectChange(e)}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                            Select your school…
                                        </option>
                                        {schoolValues}
                                    </select>
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="email"
                                    >
                                        Email address:
                                    </label>
                                    <input
                                        className={`${styles.input} ${styles.formControl}`}
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={styles.subForm}>
                                    <label
                                        className={styles.h2}
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        className={`${styles.input} ${styles.formControl}`}
                                        type="password"
                                        id="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={styles.buttonContainer}>
                                    <div
                                        className={styles.robotVerPlaceholder}
                                    ></div>
                                    <button
                                        className={styles.loginButton}
                                        type="submit"
                                    >
                                        SIGN UP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.navigationContainer}>
                        <h2 className={styles.h2}>
                            {`Already have an account?   `}
                            <Link className={styles.link} href="/login">
                                Sign In
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
            <div className={styles.placeHolderHalf}>
                <div className={styles.narcat}></div>
            </div>
        </div>
    );
};

export default SignUpPage;
