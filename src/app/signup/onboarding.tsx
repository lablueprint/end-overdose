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
        3: '',
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
                                <div className={styles.onboardingHeading}>
                                    Text
                                </div>
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
                                        Third Slide
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleNext}
                                className={styles.continueButton}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                    <div
                        className={styles.foregroundImg}
                        style={{
                            backgroundImage: bgMap[page]
                                ? `url(${bgMap[page]})`
                                : undefined,
                            height: `${page == 1 ? '50%' : '110%'}`,
                        }}
                    >
                        {' '}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
