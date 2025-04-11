'use client';
import Link from 'next/link';
import Course from './components/Course';
import DailyQuest from './components/DailyQuest';
import { useUserStore } from '@/store/userStore';
import StoreItem from './components/StoreItem';
import styles from './page.module.css';
import AuthWrap from '@/components/AuthWrap';
import { getCourseProgress } from '../api/students/actions';
import { useState, useEffect } from 'react';

export default function Courses() {
    const [opioidCourseProgress, setOpioidCourseProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    // Course progress data
    const user = useUserStore((state) => state.user);
    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            try {
                if (user) {
                    // Call the API function to get the course progress
                    const response = await getCourseProgress('opioidCourse');
                    if (response.progress) {
                        setOpioidCourseProgress(response.progress);
                    } else {
                        console.error(
                            'Error fetching progress:',
                            response.error
                        );
                    }
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

    return (
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
    );
}
