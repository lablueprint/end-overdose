'use client';
import { useUserStore } from '@/store/userStore';
import styles from './page.module.css';
import AuthWrap from '@/components/AuthWrap';
import { useState, useEffect } from 'react';
import { isStudent } from '@/types/Student';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';

export default function Home() {
    const [opioidCourseProgress, setOpioidCourseProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    // Course progress data
    const user = useUserStore((state) => state.user);
    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            try {
                if (isStudent(user)) {
                    // short-circuit evaluation, only checking role value if it exists
                    // checking that the user is a student by checking against admin attributes
                    setOpioidCourseProgress(
                        user.courses.opioidCourse.courseProgress
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

    const renderCourseCard = () => {
        return (
            <div className={styles.courseCard}>
                <img className={styles.cardImage} src="/course1.svg"></img>
                <div className={styles.cardTextContainer}>
                    <h2 className={styles.cardSubtitle}>Recognizing Signs</h2>
                    <p className={styles.cardBodyText}>
                        This course teaches you how to recognize the signs of an
                        overdose and how to help save a life.
                    </p>
                    <p className={styles.cardLabel}>
                        Due <span className={styles.red}>February 12</span>
                    </p>
                </div>
                <div className={styles.cardInfoContainer}>
                    <div className={styles.tagInProgress}>
                        <div
                            className={
                                opioidCourseProgress === 100
                                    ? styles.tagCompleted
                                    : opioidCourseProgress === 0
                                        ? styles.tagNotStarted
                                        : styles.tagInProgress
                            }
                        >
                            <div
                                className={
                                    opioidCourseProgress === 100
                                        ? styles.tagCompletedIndicator
                                        : opioidCourseProgress === 0
                                            ? styles.tagNotStartedIndicator
                                            : styles.tagInProgressIndicator
                                }
                            ></div>
                            <p>
                                {opioidCourseProgress === 100
                                    ? 'Completed'
                                    : opioidCourseProgress === 0
                                        ? 'Not Started'
                                        : 'In Progress'}
                            </p>
                        </div>
                    </div>
                    <a href="/courses" className={styles.button}>
                        <p>Start</p>
                    </a>
                </div>
            </div>
            /* <div className={styles.courseCard}>
                <img
                    className={styles.cardImage}
                    src="/course2.svg"
                ></img>
                <div className={styles.cardTextContainer}>
                    <h2 className={styles.cardSubtitle}>
                        Symptoms of an Overdose
                    </h2>
                    <p className={styles.cardBodyText}>
                        This course teaches you how to
                        recognize the signs of an overdose
                        and how to help save a life.
                    </p>
                    <p className={styles.cardLabel}>
                        Due{' '}
                        <span className={styles.red}>
                            February 20
                        </span>
                    </p>
                </div>
                <div className={styles.cardInfoContainer}>
                    <div className={styles.tagCompleted}>
                        <div
                            className={
                                styles.tagCompletedIndicator
                            }
                        ></div>
                        <p>Completed</p>
                    </div>
                    <div className={styles.button}>
                        <p>Review</p>
                    </div>
                </div>
            </div> */
        );
    };

    return (
        <AuthWrap roles={['school_admin', 'eo_admin', 'student']}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="flex items-center gap-2">
                        <span>
                            Welcome back,&nbsp;
                            {isStudent(user) && user.profile?.nameplate ? user.profile.nameplate : "User"}
                        </span>
                        <span className="inline-block transform rotate-15">
                            <Image src="/welcomeFish.svg" alt="Welcome Fish" width={40} height={40} className="object-contain" />
                        </span>
                    </h1>
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
                        <h2 className={styles.subtitle}>My Courses</h2>
                        <Tabs>
                            <TabList
                                className={styles.tabList}
                                activeTabClassName="selected"
                            >
                                <Tab>All Courses</Tab>
                                <Tab>Incomplete</Tab>
                                <Tab>Complete</Tab>
                            </TabList>

                            {/* All Courses */}
                            <TabPanel>{renderCourseCard()}</TabPanel>

                            {/* Incomplete */}
                            <TabPanel>
                                {opioidCourseProgress < 100 &&
                                    renderCourseCard()}
                            </TabPanel>

                            {/* Complete */}
                            <TabPanel>
                                {opioidCourseProgress === 100 &&
                                    renderCourseCard()}
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className={styles.flexRight}>
                        <div className={styles.sideCard}>
                            <div className={styles.sideCardHeading}>
                                <p className={styles.sideCardHeadingText}>
                                    About Us
                                </p>
                            </div>
                            <p className={styles.sideCardBodyText}>
                                We are a non-profit organization working to end
                                drug-related overdose deaths through education,
                                medical intervention, and public awareness.
                            </p>
                            <a
                                href="https://endoverdose.net/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.cardLink}
                            >
                                Visit our site
                            </a>
                        </div>
                        <div className={styles.sideCard}>
                            <div className={styles.sideCardHeading}>
                                <p className={styles.sideCardHeadingText}>
                                    Resources
                                </p>
                            </div>
                            <p className={styles.sideCardBodyText}>
                                If you or someone you know is struggling,
                                support is available. Call SAMHSA’s free,
                                confidential helpline anytime for help with
                                mental health or substance use.
                            </p>
                            <div className={styles.cardLink}>
                                <a
                                    href="https://www.samhsa.gov/find-help/helplines/national-helpline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.cardLink}
                                >
                                    Get Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrap>
    );
}
