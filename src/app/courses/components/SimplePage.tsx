'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';
import VideoPage from './VideoPage';

interface SimplePageProps {
    pageTitle: string;
    //handleNext: () => void;
    //handlePrevious: () => void;
}

export default function SimplePage({
    pageTitle,
    lesson,
    //handleNext,
    //handlePrevious,
}: SimplePageProps) {
    const [secondsViewed, setSecondsViewed] = useState(0);
    const [allowNextPage, setAllowNextPage] = useState(false);
    const countTo = 10;
    // const OpenContent = ({ content }) => {
    //     return <p>{content}</p>;
    // };
    console.log('simple page lesson content: ', lesson.content);
    const OpenContent = (lesson) => {
        console.log('lesson.content: ', lesson.content);
        return (
            <ul>
                {lesson.content.map((index, item) => (
                    <li key={index}>{item.text}</li>
                    // {/* {item.subpoints && (
                    //     <ul>
                    //         {item.subpoints.map((subpoint, subIndex) => (
                    //             <li key={subIndex}>○ {subpoint.text} </li>
                    //         ))}
                    //     </ul>
                    // )} */}
                ))}
            </ul>
        );
    };
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
            <br />
            <h1 className={styles.title}>{pageTitle}</h1>
            {/*<button disabled={!allowNextPage} onClick={handleNext}>
                Next
            </button>*/}
            <br />
            {/*<button onClick={handlePrevious}>Previous</button>*/}
            {/* <p>{pageContent}</p> */}
            {lesson && OpenContent(lesson)}
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <VideoPage
                videoPath="https://www.youtube.com/watch?v=o2Tpws5C2Eg"
                startTime="00:00"
                endTime="05:00"
                pageTitle={'hi'}
                pageContent={'pageContent'}
                pageModule="lesson1" // module name/number
                pageCourse="opioid" // course name
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
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
