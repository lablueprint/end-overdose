'use client';
import { useUserStore } from '@/store/userStore';
import styles from './page.module.css';
import AuthWrap from '@/components/AuthWrap';
//import { getCourseProgress } from '../api/students/actions';
import { useState, useEffect } from 'react';
import { isStudent } from '@/types/Student';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LevelIcon from './components/LevelIcon';

export default function Courses() {
    const [opioidCourseProgress, setOpioidCourseProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentLevel, setCurrentLevel] = useState(2);
    // Course progress data
    const user = useUserStore((state) => state.user);
    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            try {
                if (isStudent(user)) {
                    // short-circuit evaluation, only checking role value if it exists
                    // checking that the user is a student by checking against admin attributes
                    setOpioidCourseProgress(
                        user.course_completion.opioidCourse.courseProgress
                    );
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOpioidCourseProgress();
    }, [user]);

    const coursesData = [
        {
            title: 'Opioid Overdose',
            path: 'opioid',
            progress: `${user && 'course_completion' in user ? user.course_completion.opioidCourse.courseProgress : 0}`,
        },
        {
            title: 'Career Training',
            path: 'career',
            progress: `${user && 'course_completion' in user ? user.course_completion.careerCourse.courseProgress : 0}`,
        },
        //hardcoded right now, change later
        { title: 'Mental Health', path: 'mental-health', progress: 25 },
        { title: 'First Aid', path: 'first-aid', progress: 60 },
        // { title: 'Life Skills', path: 'life-skills', progress: 15 },
        // { title: 'Stress Management', path: 'stress', progress: 30 },
    ];
    // Daily quest data
    const dailyQuestData = {
        questPath: 'daily-quest-1',
        questTitle: 'Complete Your Profile',
        questDescription:
            'Fill in your profile information to help us tailor recommendations for you.',
        totalTasks: 3,
        completedTasks: 1,
    };

    const products = [
        {
            name: 'Basketball',
            price: 57,
            image: 'normal.jpg',
        },
        {
            name: 'Football',
            price: 30,
            image: 'logo.png',
        },
    ];

    const levelPositions = [
        { top: '38.9%', left: '12.1%' },
        { top: '41.6%', left: '18.1%' },
        { top: '55.5%', left: '18.5%' },
        { top: '53.6%', left: '26.1%' },
        // Add more as needed...
    ];

    /* return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div className="flex gap-8">
                <div className="grid grid-cols-2 gap-4">
                    {coursesData.map((course) => (
                        <Link
                            key={course.path}
                            href={`/courses/${course.path}`}
                        >
                            <Course
                                courseTitle={course.title}
                                coursePath={course.path}
                                courseProgress={course.progress}
                            />
                        </Link>
                    ))}
                </div>
                <div className="flex-shrink-0">
                    <DailyQuest
                        questPath={dailyQuestData.questPath}
                        questTitle={dailyQuestData.questTitle}
                        questDescription={dailyQuestData.questDescription}
                        totalTasks={dailyQuestData.totalTasks}
                        completedTasks={dailyQuestData.completedTasks}
                    />
                </div>
            </div>
            {user && 'kibble_count' in user && (
                <div>
                    <h1>{user.kibble_count}</h1>
                </div>
            )}
            <div className={styles.store}>
                {products.map((product) => (
                    <>
                        <StoreItem
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    </>
                ))}
            </div>
        </AuthWrap>
    ); */

    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Welcome back, Mackenzie!</h1>
                </div>
                <div className={styles.hero}>
                    <img className={styles.banner} src="/banner.svg" />
                    <img className={styles.narcat} src="/narcat.svg" />
                    <div className={styles.text}>
                        <h2 className={styles.heading}>Narcat enters space!</h2>
                        <p className={styles.body}>
                            Follow Narcat through space and learn to recognize
                            the signs of an overdose—one planet at a time!
                        </p>
                    </div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.flexLeft}>
                        <Tabs>
                            <TabList>
                                <Tab>Title 1</Tab>
                                <Tab>Title 2</Tab>
                            </TabList>

                            <TabPanel>
                                <h2>Any content 1</h2>
                            </TabPanel>
                            <TabPanel>
                                <h2>Any content 2</h2>
                            </TabPanel>
                        </Tabs>
                        <div className={styles.card}>
                            <img src="/course1.svg"></img>
                            <div className={styles.cardTextContainer}>
                                <h2 className={styles.cardTitle}>
                                    Recognizing Signs
                                </h2>
                                <p className={styles.cardBodyText}>
                                    This course teaches you how to recognize the
                                    signs of an overdose and how to help save a
                                    lifefdfadf.
                                </p>
                            </div>

                            <div>
                                <p>Due February 12</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flexRight}>
                        <div className={styles.card}>
                            <div className={styles.cardHeading}>
                                <p className={styles.cardHeadingText}>
                                    About Us
                                </p>
                            </div>
                            <p className={styles.cardBodyText}>
                                We are a non-profit organization working to end
                                drug-related overdose deaths through education,
                                medical intervention, and public awareness.
                            </p>
                            <div className={styles.cardLink}>
                                <img src="/external-link.svg"></img>
                                <p>Visit our site</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeading}>
                                <p className={styles.cardHeadingText}>
                                    Resources
                                </p>
                            </div>
                            <p className={styles.cardBodyText}>
                                We are a non-profit organization working to end
                                drug-related overdose deaths through education,
                                medical intervention, and public awareness.
                            </p>
                            <div className={styles.cardLink}>
                                <img src="/external-link.svg"></img>
                                <p>Visit our site</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrap>
    );
}
