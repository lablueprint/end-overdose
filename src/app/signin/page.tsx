'use client';
import { signInStudent, signInAdmin } from '@/firebase/auth';
import styles from './signin.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateUserCredentials } from '../api/students/actions';
import { useState } from 'react';

type Inputs = {
    school: string;
    role: string;
    email: string;
    password: string;
};
export default function SignInPage() {
    const { register, handleSubmit, watch } = useForm<Inputs>();
    const [error, setError] = useState<string | null>(null);

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
            if (!success) {
                setError('Wrong student ID or password.');
                return {
                    result: null,
                    error: 'Wrong student ID or password.',
                };
            }
            await signInStudent({
                firebase_id,
                username: email,
                password,
                school,
            });
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
                            <label className={styles.label} htmlFor="school">
                                Select your School
                            </label>
                            <select
                                id="school"
                                className={styles.input}
                                {...register('school', { required: true })}
                            >
                                <option value="">Choose a School</option>
                                <option value="UCLA">UCLA</option>
                                <option value="USC">USC</option>
                                <option value="UCB">UCB</option>
                            </select>
                        </div>

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

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="email">
                                {watch('role') === 'student'
                                    ? 'Username'
                                    : 'Email address'}
                            </label>
                            <input
                                className={styles.input}
                                type={
                                    watch('role') === 'student'
                                        ? 'text'
                                        : 'email'
                                }
                                id="email"
                                {...register('email', { required: true })}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="password">
                                Password
                            </label>
                            <input
                                className={styles.input}
                                type="password"
                                id="password"
                                {...register('password', { required: true })}
                            />
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
    );
}
