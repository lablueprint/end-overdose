'use client';
import React, { useState, useEffect } from 'react';
import LessonTile from '../components/LessonTile';
import SimplePage from '../components/SimplePage';
import lessons from './lessons';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import styles from './OpioidHome.module.css'; // Import the CSS module
import { updateCourseProgress } from '@/app/api/students/actions';
import { getCourseProgress } from '@/app/api/students/actions';

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

export default function OpioidHome() {
    const [toggle, setToggle] = useState(false);
    const user = useUserStore((state) => state.user);
    const [courseProgress, setCourseProgress] = useState(0);

    const totalLessons = lessons.length;
    // Calculate currentLesson as the integer index of the lesson based on courseProgress
    const initialLesson = Math.round((courseProgress * totalLessons) / 100);

    const [currentLesson, setLesson] = useState(initialLesson); // Start at the calculated lesson index
    const [showExitModal, setShowExitModal] = useState(false);
    const router = useRouter();

    const fetchOpioidCourseProgress = async () => {
        try {
            if (user) {
                const response = await getCourseProgress('opioidCourse');
                if (response.progress !== undefined) {
                    setCourseProgress(response.progress);

                    // Calculate current lesson based on the fetched progress
                    const lessonIndex = Math.round(
                        (response.progress / 100) * totalLessons
                    );
                    setLesson(lessonIndex); // Set currentLesson based on progress
                } else {
                    console.error('Error fetching progress:', response.error);
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchOpioidCourseProgress();
    }, []);

    const handleChangeLesson = (lessonNumber: number) => {
        if (user && 'course_completion' in user) {
            const updatedOpioidCourse = user.course_completion
                ?.opioidCourse || { courseProgress: 0 };

            useUserStore.getState().setUser({
                ...user,
                course_completion: {
                    ...user.course_completion,
                    opioidCourse: {
                        ...updatedOpioidCourse,
                        courseProgress: (lessonNumber / totalLessons) * 100,
                    },
                },
            });
        }
        setLesson(lessonNumber); // Update the local lesson state
    };

    const handleClick = () => {
        setToggle((prevState) => !prevState);
    };

    const navBarEntries = lessons.map((lesson, index) => (
        <div key={index}>
            <LessonTile
                lessonNumber={index}
                lessonTitle={lesson.title}
                lessonPath={'lesson1'}
                lessonCourse={'opioid'}
                onHandleChangeLesson={handleChangeLesson}
            />
        </div>
    ));

    const handleNextLesson = () => {
        if (
            currentLesson < totalLessons &&
            user &&
            'course_completion' in user
        ) {
            setLesson((prevIndex) => {
                const nextIndex = prevIndex + 1;
                const updatedOpioidCourse = user.course_completion
                    .opioidCourse || {
                    courseProgress: 0,
                };

                // Update global state with new course progress
                useUserStore.getState().setUser({
                    ...user,
                    course_completion: {
                        ...user.course_completion,
                        opioidCourse: {
                            ...updatedOpioidCourse,
                            courseProgress: (nextIndex / totalLessons) * 100,
                        },
                    },
                });

                return nextIndex;
            });
        }
    };
    const lessonData = lessons[currentLesson] as Lesson;

    const handleExitClick = () => {
        setShowExitModal(true);
    };

    // Confirm Exit - Save progress and update global state
    const confirmExit = async () => {
        // Save progress to database (Replace later with actual API call)
        console.log('Saving progress:', currentLesson);

        // Ensure the user exists and safely access opioidCourse
        if (user && 'course_completion' in user) {
            const updatedOpioidCourse = user.course_completion.opioidCourse || {
                courseProgress: 0,
            };
            const progressPercentage = (currentLesson / totalLessons) * 100;
            // Update the global user state with the current progress
            useUserStore.getState().setUser({
                ...user,
                course_completion: {
                    ...user.course_completion,
                    opioidCourse: {
                        ...updatedOpioidCourse,
                        courseProgress: progressPercentage,
                    },
                },
            });

            await updateCourseProgress('opioidCourse', progressPercentage);
        }
        //redirect to home page or course selection
        window.location.href = '/courses';
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <h1
                onClick={handleClick}
                style={{
                    position: 'absolute',
                    left: '32.5rem',
                    top: '0.5rem',
                    fontSize: '30px',
                    cursor: 'pointer',
                    rotate: toggle ? '180deg' : '0deg',
                    transform: `translateX(${toggle ? '21rem' : '0'})`,
                }}
            >
                &larr;
            </h1>
            <div
                style={{
                    flex: toggle ? 0 : 2.8,
                    overflowY: 'auto',
                    maxHeight: '98vh',
                    transition: 'flex-grow 0.5s ease-in-out',
                }}
            >
                <h1
                    onClick={handleClick}
                    style={{
                        fontWeight: '700',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                >
                    Opioid Course
                </h1>
                {navBarEntries}
            </div>
            <div
                style={{
                    flex: toggle ? 10 : 6,
                    maxHeight: '98vh',
                    overflowY: 'auto',
                    padding: '0 10px',
                }}
            >
                <div className={styles.courseContent}>
                    <button
                        onClick={handleExitClick}
                        className={styles.exitButton}
                    >
                        Exit Course
                    </button>
                    {/* Confirmation Modal */}
                    {showExitModal && (
                        <div className={styles.modalBackground}>
                            <div className={styles.modalContent}>
                                <h2>Are you sure you want to exit?</h2>
                                <p>Your progress will be saved.</p>
                                <button
                                    onClick={confirmExit}
                                    className={
                                        styles.modalButton +
                                        ' ' +
                                        styles.confirmButton
                                    }
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setShowExitModal(false)}
                                    className={
                                        styles.modalButton +
                                        ' ' +
                                        styles.cancelButton
                                    }
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                    {currentLesson == totalLessons ? (
                        <div className={styles.courseCompleted}>
                            <h1>Good Job!</h1>
                            <p>
                                You have successfully completed the{' '}
                                <strong>Opioid</strong> course!
                            </p>
                            <button
                                onClick={() => router.push('/courses')}
                                className={styles.goToCoursesButton}
                            >
                                Go to Courses
                            </button>
                        </div>
                    ) : (
                        <SimplePage
                            pageTitle={lessons[currentLesson].title}
                            lesson={lessonData}
                            handleNext={handleNextLesson}
                            courseCompleted={currentLesson === totalLessons - 1}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
