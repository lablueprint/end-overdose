'use client';

import { useState, useEffect } from 'react';
import styles from './onboarding.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export default function Onboarding() {
    const [page, setPage] = useState(() => {
        const saved = sessionStorage.getItem('onboardingPage');
        return saved ? Number(saved) : 1;
    });
    const [direction, setDirection] = useState(0);

    const bgMap: Record<number, string> = {
        1: '/cactusForeground.svg',
        2: '/moonForeground.png',
        3: '/terrainForeground.svg',
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative',
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
    };

    useEffect(() => {
        const savedPage = sessionStorage.getItem('onboardingPage');
        if (savedPage) setPage(Number(savedPage));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('onboardingPage', String(page));
    }, [page]);

    const handleNext = () => {
        if (page < 3) {
            setPage((p) => p + 1);
            setDirection(1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setDirection(-1);
            setPage((p) => p - 1);
        }
    };

    return (
        <div className={styles.onboardingBg}>
            <div className={styles.progressContainer}>
                <span onClick={handlePrevious} className={styles.previousArrow}>
                    &#8592;
                </span>
                <progress
                    id="onboardingProgress"
                    value={page / 0.03}
                    max="100"
                    className={styles.progressBar}
                ></progress>
            </div>
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={page} // important: triggers animation on change
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{
                        minHeight: '100vh',
                        minWidth: '90vw',
                        border: '`1px solid white',
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <div className={styles.onboardingContainer}>
                        <div className={styles.onboardingContent}>
                            <div className={styles.onboardingHeadingContainer}>
                                <div className={styles.onboardingCat}></div>
                                {page === 1 && (
                                    <div className={styles.onboardingHeading}>
                                        <div className={styles.title}>
                                            HOWDY PARTNER
                                        </div>
                                        <div className={styles.subheading}>
                                            We're here to empower you with the
                                            knowledge and tools to prevent
                                            overdose and save lives. Through
                                            interactive lessons, mini-games, and
                                            videos, you'll learn how to
                                            recognize and respond to an overdose
                                            and make a real impact in your
                                            community.
                                        </div>
                                    </div>
                                )}
                                {page === 2 && (
                                    <div className={styles.onboardingHeading}>
                                        <div className={styles.title}>
                                            PICK A NAME
                                        </div>
                                        <div className={styles.subheading}>
                                            Before we dive in, let’s give you a
                                            name! Choose a username from our
                                            name generator and make it yours.
                                        </div>
                                    </div>
                                )}
                                {page === 3 && (
                                    <div className={styles.onboardingHeading}>
                                        <div className={styles.title}>
                                            SOOOO MANY NARCATS
                                        </div>
                                        <div className={styles.subheading}>
                                            Welcome! I’m your Narcat: I come in
                                            various styles, joining you on your
                                            journey to learn how to end
                                            overdose. As you complete courses,
                                            you’ll earn rewards to customize me
                                            with fun accessories.
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.onboardingText}>
                                {page === 1 && (
                                    <div className={styles.onboarding_1}>
                                        <div className={styles.row}>
                                            <div
                                                className={styles.icon}
                                                style={{
                                                    backgroundImage:
                                                        'url(/book.png)',
                                                }}
                                            ></div>
                                            <div className={styles.label}>
                                                <h3>Interactive Lessons</h3>
                                                <p>
                                                    Stress-free speaking and
                                                    listening interactive
                                                    exercises.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.divider}></div>
                                        <div className={styles.row}>
                                            <div
                                                className={styles.icon}
                                                style={{
                                                    backgroundImage:
                                                        'url(/award.png)',
                                                }}
                                            ></div>
                                            <div className={styles.label}>
                                                <h3>Mini Games + Awards</h3>
                                                <p>
                                                    Gain XP, skins, and badges
                                                    through mini games.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.divider}></div>
                                        <div className={styles.row}>
                                            <div
                                                className={styles.icon}
                                                style={{
                                                    backgroundImage:
                                                        'url(/heart.png)',
                                                }}
                                            ></div>
                                            <div className={styles.label}>
                                                <h3>Save a life</h3>
                                                <p>
                                                    Most importantly, save a
                                                    life!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {page === 2 && (
                                    <div className={styles.onboarding_2}>
                                        Second Slide
                                    </div>
                                )}
                                {page === 3 && (
                                    <div className={styles.onboarding_3}>
                                        <div className={styles.narcat}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.foregroundImg}
                        style={{
                            backgroundImage: bgMap[page]
                                ? `url(${bgMap[page]})`
                                : undefined,
                            height: `${page == 2 ? '110%' : '50%'}`,
                        }}
                    >
                        {' '}
                    </div>
                </motion.div>
            </AnimatePresence>
            <button onClick={handleNext} className={styles.continueButton}>
                {page === 3 ? "Let's Get Started!" : 'Continue'}
            </button>
        </div>
    );
}
