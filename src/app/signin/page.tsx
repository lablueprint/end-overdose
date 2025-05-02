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

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        // Placeholder for form submission logic
    };

    return (
        <div className={styles.splitContainer}>
            <div className={styles.loginHalf}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.h1}>SIGN IN</h1>
                    <h2 className={styles.h2}>We're so glad you're back!</h2>
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form}>
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
                                    id="termsAgree"
                                    className={styles.checkbox}
                                />
                                <label
                                    htmlFor="termsAgree"
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
