'use client';

import { useState, useEffect } from 'react';
import styles from './onboarding.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { updateHasLoggedIn, updateNameplate } from '../api/students/actions';
import { useUserStore } from '@/store/userStore';

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
    const uid = useUserStore((state) => state.uid);

    const fullList1 = [
        'Super',
        'Very',
        'Extremely',
        'Incredibly',
        'Totally',
        'Mega',
        'Ultra',
        'Ridiculously',
        'Insanely',
        'Absolutely',
        'Really',
    ];
    const fullList2 = [
        'Smart',
        'Gorgeous',
        'Awesome',
        'Cool',
        'Brilliant',
        'Talented',
        'Kind',
        'Funny',
        'Creative',
        'Charming',
    ];

    const fullList3 = [
        'Cat',
        'Dog',
        'Bunny',
        'Fox',
        'Panda',
        'Tiger',
        'Otter',
        'Koala',
        'Dolphin',
        'Penguin',
    ];
    const visibleCount = 7;
    const defaultCenterIndex = 3;

    function shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const [shuffledItems1, setShuffledItems1] = useState(() =>
        shuffleArray(fullList1)
    );
    const [shuffledItems2, setShuffledItems2] = useState(() =>
        shuffleArray(fullList2)
    );
    const [shuffledItems3, setShuffledItems3] = useState(() =>
        shuffleArray(fullList3)
    );
    const [visibleIndex1, setVisibleIndex1] = useState(defaultCenterIndex);
    const [visibleIndex2, setVisibleIndex2] = useState(defaultCenterIndex);
    const [visibleIndex3, setVisibleIndex3] = useState(defaultCenterIndex);

    const handleUp1 = () => {
        setVisibleIndex1((prev) => Math.max(prev - 1, 0));
    };
    const handleUp2 = () => {
        setVisibleIndex2((prev) => Math.max(prev - 1, 0));
    };
    const handleUp3 = () => {
        setVisibleIndex3((prev) => Math.max(prev - 1, 0));
    };

    const handleDown1 = () => {
        setVisibleIndex1((prev) => prev + 1);
    };
    const handleDown2 = () => {
        setVisibleIndex2((prev) => prev + 1);
    };
    const handleDown3 = () => {
        setVisibleIndex3((prev) => prev + 1);
    };

    // Extend list dynamically when scrolling down
    useEffect(() => {
        if (visibleIndex1 >= shuffledItems1.length - defaultCenterIndex - 1) {
            setShuffledItems1((prev) => [...prev, ...shuffleArray(fullList1)]);
        }
        if (visibleIndex2 >= shuffledItems2.length - defaultCenterIndex - 1) {
            setShuffledItems2((prev) => [...prev, ...shuffleArray(fullList2)]);
        }
        if (visibleIndex3 >= shuffledItems3.length - defaultCenterIndex - 1) {
            setShuffledItems3((prev) => [...prev, ...shuffleArray(fullList3)]);
        }
    }, [
        visibleIndex1,
        shuffledItems1.length,
        fullList1,
        visibleIndex2,
        shuffledItems2.length,
        fullList2,
        visibleIndex3,
        shuffledItems3.length,
        fullList3,
    ]);

    // Adjust center index if we're near the top
    const centerOffset1 =
        visibleIndex1 < defaultCenterIndex ? visibleIndex1 : defaultCenterIndex;
    const centerOffset2 =
        visibleIndex2 < defaultCenterIndex ? visibleIndex2 : defaultCenterIndex;
    const centerOffset3 =
        visibleIndex3 < defaultCenterIndex ? visibleIndex3 : defaultCenterIndex;

    const start1 = visibleIndex1 - centerOffset1;
    const start2 = visibleIndex2 - centerOffset2;
    const start3 = visibleIndex3 - centerOffset3;
    const visibleSlice1 = shuffledItems1.slice(start1, start1 + visibleCount);
    const visibleSlice2 = shuffledItems2.slice(start2, start2 + visibleCount);
    const visibleSlice3 = shuffledItems3.slice(start3, start3 + visibleCount);
    const centerItem1 = visibleSlice1[centerOffset1];
    const centerItem2 = visibleSlice2[centerOffset2];
    const centerItem3 = visibleSlice3[centerOffset3];
    const namePlateFinal = `${centerItem1} ${centerItem2} ${centerItem3}`;

    const handleShuffle = () => {
        setShuffledItems1(shuffleArray(fullList1));
        setShuffledItems2(shuffleArray(fullList2));
        setShuffledItems3(shuffleArray(fullList3));
        setVisibleIndex1(defaultCenterIndex);
        setVisibleIndex2(defaultCenterIndex);
        setVisibleIndex3(defaultCenterIndex);
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

    const handleNext = async () => {
        if (page < 3) {
            setPage((p) => p + 1);
            setDirection(1);
        } else {
            try {
                await updateHasLoggedIn(uid);
                await updateNameplate(uid, namePlateFinal);
                console.log('Nameplate Final:', namePlateFinal);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
                //window.location.href = '/';
            } catch (err) {
                console.error('Update failed:', err);
            }
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
                                        <div
                                            className={styles.shuffleContainer}
                                        >
                                            <div className={styles.shuffle}>
                                                <div className={styles.arrow}>
                                                    <button
                                                        className={
                                                            styles.upArrow
                                                        }
                                                        onClick={handleUp1}
                                                    ></button>
                                                </div>
                                                <div
                                                    className={
                                                        styles.shuffleBox
                                                    }
                                                >
                                                    {visibleSlice1.map(
                                                        (item, i) => (
                                                            <li
                                                                key={start1 + i}
                                                                className={
                                                                    styles.shuffleListItems
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? '20px'
                                                                            : '15px',
                                                                    fontWeight:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 'bold'
                                                                            : 'normal',
                                                                    opacity:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 1
                                                                            : 0.6,
                                                                    margin: '0.25rem 0',
                                                                }}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                                <div className={styles.arrow}>
                                                    <button
                                                        onClick={handleDown1}
                                                        className={
                                                            styles.downArrow
                                                        }
                                                    ></button>
                                                </div>
                                            </div>
                                            <div className={styles.shuffle}>
                                                <div className={styles.arrow}>
                                                    <button
                                                        className={
                                                            styles.upArrow
                                                        }
                                                        onClick={handleUp2}
                                                    ></button>
                                                </div>
                                                <div
                                                    className={
                                                        styles.shuffleBox
                                                    }
                                                >
                                                    {visibleSlice2.map(
                                                        (item, i) => (
                                                            <li
                                                                key={start2 + i}
                                                                className={
                                                                    styles.shuffleListItems
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? '20px'
                                                                            : '15px',
                                                                    fontWeight:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 'bold'
                                                                            : 'normal',
                                                                    opacity:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 1
                                                                            : 0.6,
                                                                    margin: '0.25rem 0',
                                                                }}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                                <div className={styles.arrow}>
                                                    <button
                                                        onClick={handleDown2}
                                                        className={
                                                            styles.downArrow
                                                        }
                                                    ></button>
                                                </div>
                                            </div>
                                            <div className={styles.shuffle}>
                                                <div className={styles.arrow}>
                                                    <button
                                                        className={
                                                            styles.upArrow
                                                        }
                                                        onClick={handleUp3}
                                                    ></button>
                                                </div>
                                                <div
                                                    className={
                                                        styles.shuffleBox
                                                    }
                                                >
                                                    {visibleSlice3.map(
                                                        (item, i) => (
                                                            <li
                                                                key={start3 + i}
                                                                className={
                                                                    styles.shuffleListItems
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? '20px'
                                                                            : '15px',
                                                                    fontWeight:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 'bold'
                                                                            : 'normal',
                                                                    opacity:
                                                                        i ===
                                                                        defaultCenterIndex
                                                                            ? 1
                                                                            : 0.6,
                                                                    margin: '0.25rem 0',
                                                                }}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                                <div className={styles.arrow}>
                                                    <button
                                                        onClick={handleDown3}
                                                        className={
                                                            styles.downArrow
                                                        }
                                                    ></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.shuffleOptions}>
                                            <button
                                                className={styles.shuffleButton}
                                                onClick={handleShuffle}
                                            >
                                                Shuffle
                                            </button>
                                            <div className={styles.displayName}>
                                                {`${centerItem1} ${centerItem2} ${centerItem3}`}
                                            </div>
                                        </div>
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
