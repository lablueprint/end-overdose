'use client';
import { useState, useEffect } from 'react';

interface SimplePageProps {
    pageTitle: string;
    // pageContent: string;
    // pagePath: string;
    // pageModule: string;
    // pageCourse: string;
}

export default function SimplePage({
    pageTitle,
    // pageContent,
    // pagePath,
    // pageModule,
    // pageCourse,
}: SimplePageProps) {
    const [secondsViewed, setSecondsViewed] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setSecondsViewed((oldCount) => {
                if (oldCount < 10) {
                    return oldCount + 1;
                } else {
                    console.log('Reached 10 Seconds');
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
            {/* <p>{pageContent}</p> */}
        </div>
    );
}
