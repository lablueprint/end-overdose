'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';
import VideoPage from './VideoPage';

interface SimplePageProps {
    pageTitle: string;
    handleNext: () => void;
    lesson: Lesson;
    //handlePrevious: () => void;
}

interface Lesson {
    title: string;
    content: ContentItem[];
}

type ContentItem = TextContent | VideoContent;

interface TextContent {
    text: string;
    subpoints?: TextContent[];
}

interface VideoContent {
    video: {
        title: string;
        videoPath: string;
        startTime: string;
        endTime: string;
    };
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
    const countTo = 1; //CHANGE THIS TO WHAT YOU WANT IT TO BE

    const RenderSubpoints = (point: TextContent[]) => {
        return (
            <div>
                {point.map((subpoint, subIndex) => (
                    <li className={styles.indent} key={subIndex}>
                       {subpoint.video && OpenVideo(subpoint.video)}
                        {!subpoint.video && subpoint.text && (
                            <div>● {subpoint.text}</div>
                        )}
                        {subpoint.subpoints &&
                            RenderSubpoints(subpoint.subpoints)}
                    </li>
                ))}
            </div>
        );
    };

    const OpenContent = (lesson: Lesson) => {
        const OpenVideo = (video: VideoContent['video']) => {
            return (
                <VideoPage
                    videoPath={video.videoPath}
                    startTime={video.startTime}
                    endTime={video.endTime}
                    pageTitle={video.title}
                />
            );
        };
  
        return (
            <ul>
                {lesson.content.map((item, index) => (
                    <li key={index}>
                        {'video' in item ? (
                            OpenVideo(item.video)
                        ) : (
                            <div>● {item.text}</div>
                        )}
                        {'subpoints' in item && item.subpoints && (
                            <ul>{RenderSubpoints(item.subpoints)}</ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    useEffect(() => {
        setSecondsViewed(0); // Reset the counter when a new lesson loads
        setAllowNextPage(false); // Reset the ability to go to the next page

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
    }, [lesson]); // Re-run effect when the lesson changes

    return (
        <div>
            <br />
            <h1 className={styles.title}>{pageTitle}</h1>
            <br />
            {/* <button onClick={handlePrevious}>Previous</button> */}
            {/* {/* <p>{pageContent}</p> */}
            {lesson && OpenContent(lesson)}
            <div className={styles.buttonContainer}>
                <button
                    disabled={!allowNextPage}
                    onClick={handleNext}
                    className={styles.button}
                >
                    Next Lesson
                </button>
            </div>
        </div>
    );
}
