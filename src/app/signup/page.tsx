'use client';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import { getSchoolNames } from '@/app/api/generalData/actions';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { addSchoolAdmin } from '@/app/api/admins/actions';
import { NewEOAdmin } from '@/types/newEOAdmin';
import { addEOAdmin } from '@/app/api/admins/actions';
import { Eye, EyeOff } from 'lucide-react';

type Inputs = {
    role: string;
    email: string;
    password: string;
    school: string;
    termsAgreed: boolean;
    newsletter: boolean;
};

export default function SignUpPage() {
    const router = useRouter();
    const { register, handleSubmit, watch } = useForm<Inputs>();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [schools, setSchools] = useState<string[]>([]);

    const selectedRole = watch('role');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

    const onSubmit: SubmitHandler<Inputs> = async ({
        email,
        password,
        role,
        school,
        termsAgreed,
        newsletter,
    }) => {
        //1. Needs to agree to terms of service
        if (!termsAgreed) {
            setError('Need to Agree to Terms of Serivice');
            return;
        }

        //2. The rest of the boxed need to be filled
        if (!email || !password || !role) {
            setError('Need to fill out all the fields');
            return;
        }

        try {
            //ERROR CHECK: SCHOOL ADMIN NEEDS TO SELECT A SCHOOL
            if (role == 'admin') {
                if (!school) {
                    setError('Need to select a school');
                    return;
                }
            }

            // 3 Create the user in Firebase Auth with email & password
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(user.uid);
            if (role == 'admin') {
                //school admin
                const newSchoolAdmin: NewSchoolAdmin = {
                    approved: false,
                    email: email,
                    school_id: '',
                };

                await addSchoolAdmin(newSchoolAdmin, user.uid);
            } else if (role == 'eo_admin') {
                //ERROR CHECK: If user is EO admin then email must end in @endoverdose.net
                if (!email.endsWith('@endoverdose.net')) {
                    setError('Email must end in @endoverdose.net');
                }

                const newEOAdmin: NewEOAdmin = {
                    email: email,
                };

                console.log(newEOAdmin);
                await addEOAdmin(newEOAdmin, user.uid);
            } else {
                //SHOULDN'T GET HERE
                setError('ERROR');
            }

            // 4) Send email‑verification instead of a magic link:
            await sendEmailVerification(user);
            console.log('Verification email sent');

            // 5) Redirect to login or dashboard
            setTimeout(() => {
                router.push('/signin');
            }, 1000);
        } catch (err) {
            console.error(err);
            setError('Something went wrong.');
        }
    };

    useEffect(() => {
        const auth = getAuth();
        auth.signOut();
    }, []);

    return (
        <div className="bg-[#0C1321]">
            <div className={styles.splitContainer}>
                <div className={styles.loginHalf}>
                    <div className={styles.contentContainer}>
                        <div className={styles.bodyContainer}>
                            <div className={styles.titleTextContainer}>
                                <h1 className={styles.h1}>CREATE AN ACCOUNT</h1>
                                <h2 className={styles.h2}>
                                    We&apos;re so glad you could join us!
                                </h2>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && (
                                <p style={{ color: 'green' }}>
                                    Signup successful!
                                </p>
                            )}
                            <div className={styles.formContainer}>
                                <form
                                    className={styles.form}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className={styles.subForm}>
                                        <label
                                            className={styles.h2}
                                            htmlFor="role"
                                        >
                                            Select your Role
                                        </label>
                                        <select
                                            className={`${styles.input} ${styles.formControl}`}
                                            id="role"
                                            {...register('role', {
                                                required: true,
                                            })}
                                        >
                                            <option value="">
                                                Choose a Role
                                            </option>
                                            <option value="eo_admin">
                                                EO Admin
                                            </option>
                                            <option value="admin">
                                                School Admin
                                            </option>
                                        </select>
                                    </div>

                                    {selectedRole !== 'eo_admin' && (
                                        <div className={styles.subForm}>
                                            <label
                                                className={styles.h2}
                                                htmlFor="school"
                                            >
                                                Select your School
                                            </label>
                                            <select
                                                className={`${styles.input} ${styles.formControl}`}
                                                id="school"
                                                {...register('school', {
                                                    required:
                                                        selectedRole !==
                                                        'eo_admin',
                                                })}
                                            >
                                                <option value="">
                                                    Choose a School
                                                </option>
                                                {schoolValues}
                                            </select>
                                        </div>
                                    )}

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
                                        <div className="relative">
                                            <input
                                                className={styles.input}
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                id="password"
                                                {...register('password', {
                                                    required: true,
                                                })}
                                            />
                                            <button
                                                type="button"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <Eye
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <EyeOff
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </button>
                                        </div>
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
                                                <Link
                                                    href="/terms"
                                                    className={styles.link}
                                                >
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
                                                    required: false,
                                                })}
                                            />
                                            <label
                                                htmlFor="newsletter"
                                                className={styles.checkboxLabel}
                                            >
                                                Subscribe to our monthly
                                                newsletter
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex justify-start mt-1">
                                        <p className="text-gray-400 text-sm">
                                            Already have an account?{' '}
                                            <Link
                                                href="/signin"
                                                className="text-white font-semibold hover:underline"
                                            >
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>

                                    <div className={styles.buttonContainer}>
                                        <button
                                            className={styles.submitButton}
                                            type="submit"
                                        >
                                            SIGN UP
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.placeHolderHalf}>
                    <div className={styles.narcat}></div>
                </div>
            </div>
        </div>
    );
}
