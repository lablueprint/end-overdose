'use client';
import { useState, useEffect } from 'react';

interface SimplePageProps {
    pageTitle: string;
    handleNext: () => void;
    handlePrevious: () => void;
    // pageContent: string;
    // pagePath: string;
    // pageModule: string;
    // pageCourse: string;
}

export default function SimplePage({
    pageTitle,
    handleNext,
    handlePrevious,
    // pageContent,
    // pagePath,
    // pageModule,
    // pageCourse,
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
            <h1>{pageTitle}</h1>
            <button disabled={!allowNextPage} onClick={handleNext}>
                Next
            </button>
            <br />
            <button onClick={handlePrevious}>Previous</button>
            {/* <p>{pageContent}</p> */}
        </div>
    );
}
