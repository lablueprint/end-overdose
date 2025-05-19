'use client';
import Link from 'next/link';
import { signInStudent, signInAdmin } from '@/firebase/auth';
import styles from './signin.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    validateUserCredentials,
    checkHasLoggedIn,
} from '../api/students/actions';
import { useState, useEffect } from 'react';
import { getSchoolNames } from '@/app/api/generalData/actions';
import { setCookie } from '@/firebase/cookies';
import { useUserStore } from '@/store/userStore';
import Onboarding from './onboarding';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { NewEOAdmin } from '@/types/newEOAdmin';
import { NewStudent } from '@/types/newStudent';
import { Eye, EyeOff } from "lucide-react";

type Inputs = {
    school: string;
    role: string;
    email: string;
    password: string;
};
export default function SignInPage() {
    const { register, handleSubmit, watch } = useForm<Inputs>();
    const [error, setError] = useState<string | null>(null);
    const [schools, setSchools] = useState<string[]>([]);
    const { setUser, setRole, setUID } = useUserStore();

    const selectedRole = watch('role');

    // Fetch schools using the server action
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const schoolList = await getSchoolNames();
                setSchools(schoolList);
            } catch (error) {
                console.error('Error fetching schools:', error);
                setError('Failed to load schools. Please try again later.');
            }
        };

        fetchSchools();
    }, []);

    // Create school options from fetched data
    const schoolValues = schools.map((school) => (
        <option key={school} value={school}>
            {school}
        </option>
    ));
    const user = useUserStore((state) => state.user);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // console.log(user);

    //This is an anonymous function
    const onSubmit: SubmitHandler<Inputs> = async ({
        school,
        role,
        email,
        password,
    }) => {
        if (role == 'student') {
            const { firebase_id, success } = await validateUserCredentials(
                school,
                email,
                password
            );
            console.log(firebase_id);
            if (!success) {
                setError('Wrong student ID or password.');
                return {
                    result: null,
                    error: 'Wrong student ID or password.',
                };
            }
            const result = await signInStudent({
                firebase_id,
                username: email,
                password,
                school,
            });
            // set the user in the store
            if (result.result) {
                // set the cookie
                setCookie(
                    'student-token',
                    JSON.stringify({
                        firebase_id,
                        username: email,
                        password,
                        school,
                    })
                );
                setUser(result.result.user);
                setRole(role);
                setUID(firebase_id);
                // setProgress(0);
                const hasLoggedIn = await checkHasLoggedIn(firebase_id);
                if (!hasLoggedIn) {
                    setShowOnboarding(true);
                    return;
                }
            }
            // redirect to dashboard
            window.location.href = '/';
        } else {
            const result = await signInAdmin({ email, password });
            if (result.error) {
                // console.error('Error signing in:', result.error);
                setError('Wrong email or password.');
                return {
                    result: null,
                    error: 'Wrong email or password.',
                };
            }

            if (result.result) {
                const user = result.result.user;
                const isSchoolAdmin = (
                    user: NewSchoolAdmin | NewEOAdmin | NewStudent
                ): user is NewSchoolAdmin => user && 'school_id' in user;

                if (user) {
                    if (isSchoolAdmin(user)) {
                        window.location.href = `/school-dashboard/${user.school_id}`;
                    } else {
                        window.location.href = '/eo-admin';
                    }
                }
            }
        }
    };

    /*UNDERSTANDING HOW THE FORM WORKS
    
    function handleSubmit(onSubmit) {
    return function (event) {
        event.preventDefault(); // stop page reload
        const data = collectFormData(); // React Hook Form gathers data
        const valid = validate(data);  // runs validation rules

        if (valid) {
        onSubmit(data); // YOUR function gets called here!
        }
    };
    }
    */

    //NOTES
    /*
    1. Currently the Form is only submittable if the user agrees to TERMS OF USE AND agrees to NEWSLETTER
    2. handleSubmit is a higher order functon that gets passed into it a variable named onSubmit that has an anonymous function attached to it
    3. Using anonymous functions insie of the react component is a stylistic choice and not necessary, I could have done function onSubmit(data)

    interface SignInFormData { THIS IS HOW OUR FORM DATA CURRENTLY LOOKS
        email: string;
        password: string;
        termsAgreed: boolean;
        newsletter: boolean;
        role: 'student' | 'eo_admin' | 'admin'; // restrict to valid options
    }

    */

    return (
        <div className="bg-[#0C1321]">
            {showOnboarding && <Onboarding />}
            <div className={styles.splitContainer}>
                <div className={styles.loginHalf}>
                    <div className={styles.contentContainer}>
                        <h1 className={styles.h1}>SIGN IN</h1>
                        <h2 className={styles.h2}>
                            We&#39;re so glad you&#39;re back!
                        </h2>
                    </div>

                    <div className={styles.formContainer}>
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {error && <p className={styles.error}>{error}</p>}
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="role">
                                    Select your Role
                                </label>
                                <select
                                    id="role"
                                    className={styles.input}
                                    {...register('role', { required: true })}
                                >
                                    <option value="">Choose a Role</option>
                                    <option value="student">Student</option>
                                    <option value="eo_admin">EO Admin</option>
                                    <option value="admin">School Admin</option>
                                </select>
                            </div>

                            {error && <p className={styles.error}>{error}</p>}
                            {selectedRole !== "eo_admin" && (<div className={styles.inputGroup}>
                                <label
                                    className={styles.label}
                                    htmlFor="school"
                                >
                                    Select your School
                                </label>
                                <select
                                    id="school"
                                    className={styles.input}
                                    {...register('school', { required: selectedRole !== "eo_admin" })}
                                >
                                    <option value="">Choose a School</option>
                                    {schoolValues}
                                </select>
                            </div>)}

                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="email">
                                    {selectedRole === 'student'
                                        ? 'Username'
                                        : 'Email address'}
                                </label>
                                <input
                                    className={styles.input}
                                    type={
                                        selectedRole === 'student'
                                            ? 'text'
                                            : 'email'
                                    }
                                    id="email"
                                    {...register('email', { required: true })}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label
                                    className={styles.label}
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className={styles.input}
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <Eye className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <EyeOff className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-1">
                                <p className="text-gray-400 text-sm">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/signup"
                                        className="text-white font-semibold hover:text-gray-200 hover:underline transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            <div className={styles.buttonContainer}>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    SIGN IN
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={styles.placeHolderHalf}></div>
            </div>
        </div>
    );
}
