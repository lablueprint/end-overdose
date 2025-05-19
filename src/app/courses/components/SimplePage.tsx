'use client';
import { useState, useEffect } from 'react';
import styles from './SimplePage.module.css';
import VideoPage from './VideoPage';
import { updateCourseProgress } from '@/app/api/students/actions';
import '@fontsource/roboto-condensed/700.css';
import '@fontsource/roboto/400.css';
import { useUserStore } from '@/store/userStore';
import { isStudent } from '@/types/newStudent';
import { useRouter } from 'next/navigation';

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
    const user = useUserStore((state) => state.user);
    const router = useRouter();

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
            <div>
                <br></br>
                <VideoPage
                    videoPath={video.videoPath}
                    startTime={video.startTime}
                    endTime={video.endTime}
                    pageTitle={video.title}
                />
                <br></br>
                <h1 className={styles.summaryText}>SUMMARY</h1>
                <br></br>
            </div>
        );
    };

    const RenderSubpoints = (point: TextContent[]) => {
        return (
            <div>
                <ul>
                    {point.map((subpoint, subIndex) => (
                        <li key={subIndex}>
                            {subpoint.video && OpenVideo(subpoint.video)}
                            {!subpoint.video && subpoint.text && (
                                <div className={styles.bodyText}>
                                    ● {boldText(subpoint.text)}
                                </div>
                            )}
                            {subpoint.subpoints &&
                                RenderSubpoints(subpoint.subpoints)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const OpenContent = (lesson: Lesson) => {
        return (
            <div>
                {!lesson.content[0].video && (
                    <h1 className={styles.summaryText}>SUMMARY</h1>
                )}
                <ul>
                    {lesson.content.map((item, index) => (
                        <li key={index}>
                            {item.video ? (
                                OpenVideo(item.video)
                            ) : (
                                <div>
                                    <div className={styles.bodyText}>
                                        ● {boldText((item as TextContent).text)}
                                    </div>
                                </div>
                            )}
                            {'subpoints' in item && item.subpoints && (
                                <div>
                                    <br></br>
                                    <ul>{RenderSubpoints(item.subpoints)}</ul>
                                    <br></br>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
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
        if (!courseCompleted || !isStudent(user)) return; // Prevent calling it if course is not yet finished
        // Ensure to update course completion to 100% once finished
        handleNext();
        await updateCourseProgress(user.student_id, 'opioidCourse', 100);
        router.push('/certificates');
    };

    return (
        <div
            style={{
                fontFamily: 'Roboto Condensed, sans-serif',
                fontWeight: '700',
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
