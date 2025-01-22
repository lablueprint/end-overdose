'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';

interface SimplePageProps {
    pageTitle: string;
    //handleNext: () => void;
    //handlePrevious: () => void;
}

export default function SimplePage({
    pageTitle,
    //handleNext,
    //handlePrevious,
}: SimplePageProps) {
    const [secondsViewed, setSecondsViewed] = useState(0);
    const [allowNextPage, setAllowNextPage] = useState(false);
    const countTo = 10;
    useEffect(() => {
        const id = setInterval(() => {
            setSecondsViewed((oldCount) => {
                if (oldCount < countTo) {
                    return oldCount + 1;
                } else {
                    setAllowNextPage(true);
                    clearInterval(id); // Stop the interval when it reaches 10
                    return oldCount; // Prevent further updates
                }
            });
        }, 1000);
        return () => clearInterval(id); // Cleanup on component unmount
    }, []);
    return (
        <div>
            <h1 className={styles.title}>{pageTitle}</h1>
            {/*<button disabled={!allowNextPage} onClick={handleNext}>
                Next
            </button>*/}
            <br />
            {/*<button onClick={handlePrevious}>Previous</button>*/}
            {/* <p>{pageContent}</p> */}
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    );
}
