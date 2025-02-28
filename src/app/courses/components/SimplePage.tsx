'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';
import VideoPage from './VideoPage';

interface SimplePageProps {
    pageTitle: string;
    handleNext: () => void;
    //handlePrevious: () => void;
}

export default function SimplePage({
    pageTitle,
    lesson,
    //handleNext,
    //handlePrevious,
    handleNext,
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
            <button disabled={!allowNextPage} onClick={handleNext}>
                Next Lesson
            </button>
        </div>
    );
}
