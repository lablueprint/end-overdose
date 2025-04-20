'use client';
import React, { useState, useEffect } from 'react';
import LessonTile from '../components/LessonTile';
import SimplePage from '../components/SimplePage';
import lessons from './lessons';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import styles from './OpioidHome.module.css'; // Import the CSS module
import { updateCourseProgress } from '@/app/api/students/actions';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/500.css';
import '@fontsource/roboto-condensed/600.css';
import '@fontsource/roboto-condensed/700.css';
import { isStudent } from '@/types/Student';

// import { getCourseProgress } from '@/app/api/students/actions';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
            if (isStudent(user)) {
                const response =
                    user.course_completion.opioidCourse.courseProgress;
                if (response !== undefined) {
                    setCourseProgress(response);

                    // Calculate current lesson based on the fetched progress
                    const lessonIndex = Math.round(
                        (response / 100) * totalLessons
                    );
                    setLesson(lessonIndex); // Set currentLesson based on progress
                } else {
                    console.error('Error fetching progress');
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

    const returnToCourses = () => {
        router.push('/courses');
    };
    const handleToggleNavBarDisplay = () => {
        setToggle((prevState) => !prevState);
    };

    const navBarEntries = lessons.map((lesson, index) => (
        <div
            key={index}
            style={{
                fontFamily: 'Roboto Condensed, sans-serif',
            }}
        >
            <LessonTile
                lessonNumber={index}
                lessonTitle={lesson.title}
                lessonPath={'lesson1'}
                lessonCourse={'opioid'}
                onHandleChangeLesson={handleChangeLesson}
                selected={index == currentLesson}
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

            await updateCourseProgress(
                user.student_id,
                'opioidCourse',
                progressPercentage
            );
        }
        //redirect to home page or course selection
        window.location.href = '/courses';
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div
                style={{
                    flex: toggle ? 0 : 2.1,
                    overflowY: 'auto',
                    maxHeight: '100vh',
                    transition: 'flex-grow 0.5s ease-in-out',
                    backgroundColor: toggle ? 'white' : '#0C1321',
                    padding: toggle ? '30px' : '60px',
                    fontFamily: 'Roboto Condensed, sans-serif',
                }}
            >
                {toggle ? (
                    <div
                        style={{
                            position: 'absolute',
                            left: '13.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)', // Center correction
                            width: '30px',
                            height: '49px',
                            flexShrink: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: toggle ? 'black' : 'white',
                        }}
                    >
                        <ArrowForwardIosIcon
                            onClick={handleToggleNavBarDisplay}
                        ></ArrowForwardIosIcon>
                    </div>
                ) : (
                    <div
                        style={{
                            position: 'absolute',
                            left: '37rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '30px',
                            height: '49px',
                            flexShrink: '0',
                            backgroundColor: '#0C1321',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: toggle ? 'black' : 'white',
                        }}
                    >
                        <ArrowBackIosIcon
                            onClick={handleToggleNavBarDisplay}
                        ></ArrowBackIosIcon>
                    </div>
                )}
                {!toggle ? (
                    <div>
                        <h1
                            onClick={returnToCourses}
                            style={{
                                fontWeight: '400',
                                fontSize: '15px',
                                cursor: 'pointer',
                                color: 'white',
                                fontFamily: 'Roboto Condensed, sans-serif',
                                lineHeight: 'normal',
                            }}
                        >
                            <ArrowBackIcon></ArrowBackIcon>
                            Back to Courses
                            <br />
                            <br />
                        </h1>
                        <h1
                            style={{
                                fontWeight: '300',
                                fontSize: '18px',
                                cursor: 'pointer',
                                color: 'white',
                                fontFamily: 'Roboto Condensed, sans-serif',
                            }}
                        >
                            Course Name
                        </h1>
                        <h1
                            style={{
                                fontWeight: '500',
                                fontSize: '18px',
                                cursor: 'pointer',
                                letterSpacing: '0.72px',
                                color: 'white',
                                fontFamily: 'Roboto Condensed, sans-serif',
                            }}
                        >
                            Opioid Course
                        </h1>
                        <br />

                        {navBarEntries}
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div
                style={{
                    flex: toggle ? 10 : 6,
                    height: '100vh', //help
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
