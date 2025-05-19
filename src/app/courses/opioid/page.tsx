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
import { isStudent } from '@/types/newStudent';

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

    const [currentLesson, setLesson] = useState(0); // Start at the calculated lesson index
    const [highestReachedLesson, setHighestReachedLesson] = useState<number>(0); // setting highest reached lesson to maintain progress
    const [progressLoaded, setProgressLoaded] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const router = useRouter();
    console.log(user);

    // TODO: make the isStudent type guard work
    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            // if (!user || !isStudent(user)) {
            //     setProgressLoaded(true);
            //     return;
            // }

            try {
                if (isStudent(user)) {
                    const response = user.courses.opioidCourse.courseProgress;

                    const lessonIndex = Math.round(
                        (response / 100) * totalLessons
                    );

                    setCourseProgress(response);
                    setLesson(lessonIndex);
                    setHighestReachedLesson(lessonIndex);
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
            } finally {
                setProgressLoaded(true);
            }
        };

        fetchOpioidCourseProgress();
    }, [user]);

    if (!progressLoaded) return <div>Loading course...</div>;

    const handleChangeLesson = (lessonNumber: number) => {
        // if (
        //     lessonNumber > highestReachedLesson &&
        //     user &&
        //     'course_completion' in user
        // ) {
        //     const updatedOpioidCourse = user.course_completion
        //         ?.opioidCourse || { courseProgress: 0 };

        //     useUserStore.getState().setUser({
        //         ...user,
        //         course_completion: {
        //             ...user.course_completion,
        //             opioidCourse: {
        //                 ...updatedOpioidCourse,
        //                 courseProgress: (lessonNumber / totalLessons) * 100,
        //             },
        //         },
        //     });
        // }
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
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyItems: 'center',
                alignItems: 'center',
                paddingBottom: '10px',
                width: '100%',
            }}
        >
            <LessonTile
                lessonNumber={index}
                lessonTitle={lesson.title}
                lessonPath={'lesson1'}
                lessonCourse={'opioid'}
                onHandleChangeLesson={handleChangeLesson}
                selected={index == currentLesson}
                disabled={index > highestReachedLesson}
            />
        </div>
    ));

    const handleNextLesson = async () => {
        if (
            currentLesson < totalLessons &&
            user &&
            'courses' in user &&
            isStudent(user)
        ) {
            const nextIndex = currentLesson + 1;

            if (nextIndex > highestReachedLesson) {
                setHighestReachedLesson(nextIndex);

                const updatedOpioidCourse = user.courses.opioidCourse || {
                    courseProgress: 0,
                    courseScore: 0,
                    quizzes: [],
                };

                const progress = (nextIndex / totalLessons) * 100;

                // Update Zustand store
                useUserStore.getState().setUser({
                    ...user,
                    courses: {
                        ...user.courses,
                        opioidCourse: {
                            ...updatedOpioidCourse,
                            courseProgress: progress,
                        },
                    },
                });

                // Sync with Firebase
                await updateCourseProgress(
                    user.student_id,
                    'opioidCourse',
                    progress
                );
            }

            // update local lesson state
            setLesson(nextIndex);

            window.location.href = '/quiz';
        }
    };

    const lessonData = lessons[currentLesson] as Lesson;

    const handleExitClick = () => {
        setShowExitModal(true);
    };

    // save progress to user state and update firebase upon exit
    const confirmExit = async () => {
        // Ensure the user exists and safely access opioidCourse
        if (
            user &&
            isStudent(user) &&
            user.courses &&
            user.courses.opioidCourse
        ) {
            const updatedOpioidCourse = {
                ...user.courses.opioidCourse,
                courseProgress: (highestReachedLesson / totalLessons) * 100,
            };

            // Update global state (Zustand or similar)
            useUserStore.getState().setUser({
                ...user,
                courses: {
                    ...user.courses,
                    opioidCourse: updatedOpioidCourse,
                },
            });

            // Sync with Firebase (or backend)
            await updateCourseProgress(
                user.student_id,
                'opioidCourse',
                updatedOpioidCourse.courseProgress
            );
        }
        //redirect to home page or course selection
        window.location.href = '/courses';
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div
                style={{
                    width: '18%',
                    overflowY: 'auto',
                    maxHeight: '100vh',
                    transition: 'flex-grow 0.5s ease-in-out',
                    backgroundColor: '#0C1321',
                    padding: '0px',
                    fontFamily: 'Roboto Condensed, sans-serif',
                    borderTopRightRadius: '30px',
                    borderBottomRightRadius: '30px',
                    paddingTop: '30px',
                    fontSize: '24px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '80%',
                        }}
                    >
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
                            <p>Table of Contents</p>
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
                </div>
            </div>
            <div
                style={{
                    flex: 6,
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

// TODO: no delay for continue when revisiting a completed lesson: enable button when timer ends OR if course progress is beyond the index of the current lesson
// - this logic is handled in the simplepage component so pass lessonCompletion as a prop from this page
// TODO: make isStudent type guard work
// TODO: not resetting lesson index after clicking on a previous lesson and (i think fix needed in handleNext after handleChange)
// - i think updateCourseProgress is being called in SimplePage handleNext - that shouldn't be happening i dont think
// - also think something fishy like this is happening because when the course is completed the progress is updated to 100 but theres an error saying that could not update course progress from within UpdateCourseProgress
