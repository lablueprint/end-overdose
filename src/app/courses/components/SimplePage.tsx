'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';
import VideoPage from './VideoPage';
import { updateCourseProgress } from '@/app/api/students/actions';
import '@fontsource/roboto-condensed';

interface SimplePageProps {
    pageTitle: string;
    handleNext: () => void;
    lesson: Lesson;
    courseCompleted: boolean;
}

interface Lesson {
    title: string;
    content: ContentItem[];
}

type ContentItem = TextContent | VideoContent;

interface TextContent {
    text: string;
    subpoints?: TextContent[];
    video?: VideoType;
}

interface VideoContent {
    video: {
        title: string;
        videoPath: string;
        startTime: string;
        endTime: string;
    };
}

interface VideoType {
    title: string;
    videoPath: string;
    startTime: string;
    endTime: string;
}

export default function SimplePage({
    pageTitle,
    lesson,
    handleNext,
    courseCompleted,
}: SimplePageProps) {
    const [secondsViewed, setSecondsViewed] = useState(0);
    const [allowNextPage, setAllowNextPage] = useState(false);
    const countTo = 1; //CHANGE THIS TO WHAT YOU WANT IT TO BE

    const boldText = (text: string) => {
        if (!text) return null;
        // Replace **bolded phrases** with <strong>bolded phrases</strong>
        const parts = text.split(/(\*\*.*?\*\*)/g); // Splits by **text** while keeping separators

        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

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

    const RenderSubpoints = (point: TextContent[]) => {
        return (
            <ul>
                {point.map((subpoint, subIndex) => (
                    <li className={styles.indent} key={subIndex}>
                        {subpoint.video && OpenVideo(subpoint.video)}
                        {!subpoint.video && subpoint.text && (
                            <div>● {boldText(subpoint.text)}</div>
                        )}
                        {subpoint.subpoints &&
                            RenderSubpoints(subpoint.subpoints)}
                    </li>
                ))}
            </ul>
        );
    };

    const OpenContent = (lesson: Lesson) => {
        return (
            <ul>
                {lesson.content.map((item, index) => (
                    <li key={index}>
                        {item.video ? (
                            OpenVideo(item.video)
                        ) : (
                            <div>● {boldText((item as TextContent).text)}</div>
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

    const handleFinishCourse = async () => {
        if (!courseCompleted) return; // Prevent calling it if course is not yet finished

        // Ensure to update course completion to 100% once finished
        handleNext();
        await updateCourseProgress('opioidCourse', 100);
    };

    return (
        <div
            style={{
                fontFamily: 'Roboto Condensed, sans-serif',
            }}
        >
            <br />
            <h1 className={styles.title}>{pageTitle}</h1>
            <br />
            {/* <button onClick={handlePrevious}>Previous</button> */}
            {/* {/* <p>{pageContent}</p> */}
            <h1 className={styles.about}>About</h1>
            <div className={styles.hrContainer}>
                <hr className={styles.blackLine} />
                <hr className={styles.greyLine} />
            </div>
            <br></br>

            {lesson && OpenContent(lesson)}
            <div className={styles.buttonContainer}>
                <button
                    disabled={!allowNextPage}
                    onClick={courseCompleted ? handleFinishCourse : handleNext}
                    className={`${styles.button} 
        ${courseCompleted ? styles.completeButton : ''} 
        ${allowNextPage ? styles.activeButton : ''}`}
                >
                    {courseCompleted ? 'Complete Course' : 'Continue'}
                </button>
            </div>
        </div>
    );
}
