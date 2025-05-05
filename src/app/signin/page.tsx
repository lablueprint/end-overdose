'use client';
import Link from 'next/link';
import styles from './signin.module.css';
import { useState, useEffect } from 'react';
import { Admin } from '@/types/Admin';
import { signUp } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { School } from '@/types/School';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    getAuth,
    sendSignInLinkToEmail,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
export default function SignInPage() {
    const { register, handleSubmit } = useForm();

    //This is an anonymous function
    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        //Function starts here
        const { email, password, termsAgreed, newsletter } = data;

        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Agreed to Terms:', termsAgreed);
        console.log('Subscribed to Newsletter:', newsletter);

        //1. Check if valid
        if (!termsAgreed || !newsletter) {
            return;
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
                    <h2 className={styles.h2}>We're so glad you're back!</h2>
                </div>

                <div className={styles.formContainer}>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="email">
                                Email address
                            </label>
                            <input
                                className={styles.input}
                                type="email"
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

                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="termsAgreed"
                                    className={styles.checkbox}
                                    {...register('termsAgreed', {
                                        required: true,
                                    })}
                                />
                                <label
                                    htmlFor="termsAgreed"
                                    className={styles.checkboxLabel}
                                >
                                    Agree to our{' '}
                                    <Link href="/terms" className={styles.link}>
                                        Terms of use
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy"
                                        className={styles.link}
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    className={styles.checkbox}
                                    {...register('newsletter', {
                                        required: true,
                                    })}
                                />
                                <label
                                    htmlFor="newsletter"
                                    className={styles.checkboxLabel}
                                >
                                    Subscribe to our monthly newsletter
                                </label>
                            </div>
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
