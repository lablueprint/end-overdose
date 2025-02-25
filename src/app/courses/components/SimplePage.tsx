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

    console.log('simple page lesson content: ', lesson.content);

    const RenderSubpoints = (point) => {
        return (
            <div>
                {point.map((subpoint, subIndex) => (
                    <li className={styles.indent} key={subIndex}>
                        {' '}
                        ● {subpoint.text}{' '}
                        {subpoint.subpoints &&
                            RenderSubpoints(subpoint.subpoints)}
                    </li>
                ))}
            </div>
        );
    };

    const OpenContent = (lesson) => {
        const OpenVideo = (video) => {
            return (
                <VideoPage
                    videoPath={video.videoPath}
                    startTime={video.startTime}
                    endTime={video.endTime}
                    pageTitle={video.pageTitle}
                    pageContent={video.pageContent}
                    pageModule={video.pageModule}
                    pageCourse={video.pageCourse}
                />
            );
        };

        return (
            <ul>
                {lesson.content.map((item, index) => {
                    return (
                        <li key={index}>
                            {item.video && OpenVideo(item.video)}
                            {!item.video && <div>● {item.text}</div>}
                            {item.subpoints && (
                                <ul>
                                    {item.subpoints &&
                                        RenderSubpoints(item.subpoints)}
                                </ul>
                            )}
                        </li>
                    );
                })}
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
            {/* <VideoPage
                videoPath="https://www.youtube.com/watch?v=o2Tpws5C2Eg"
                startTime="00:00"
                endTime="05:00"
                pageTitle={'hi'}
                pageContent={'pageContent'}
                pageModule="lesson1" // module name/number
                pageCourse="opioid" // course name
            /> */}
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
