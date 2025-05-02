'use client';

import { useState, useEffect } from 'react';
import styles from './onboarding.module.css';

export default function Onboarding() {
    const [page, setPage] = useState(1);

    const bgMap: Record<number, string> = {
        1: '/cactusForeground.svg',
        2: '/moonForeground.png',
        3: '',
    };

    return (
        <div className={styles.onboardingBg}>
            <div className={styles.onboardingContainer}>
                <div className={styles.progressContainer}>
                    <progress
                        id="onboardingProgress"
                        value={page / 0.03}
                        max="100"
                        className={styles.progressBar}
                    ></progress>
                </div>
                <div className={styles.onboardingContent}>
                    <div className={styles.onboardingHeadingContainer}>
                        <div className={styles.onboardingCat}></div>
                        <div className={styles.onboardingHeading}>Text</div>
                    </div>
                    <div>Content</div>
                    <button className={styles.continueButton}>Continue</button>
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
        </div>
    );
}
