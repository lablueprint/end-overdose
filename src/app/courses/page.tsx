'use client';
import Link from 'next/link';
import Course from './components/Course';
import DailyQuest from './components/DailyQuest';
import { useUserStore } from '@/store/userStore';
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
            progress: opioidCourseProgress.toFixed(2),
        },
        { title: 'Career Training', path: 'career', progress: 40 },
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

    return (
        <div className="flex gap-8">
            <div className="grid grid-cols-2 gap-4">
                {coursesData.map((course) => (
                    <Link key={course.path} href={`/courses/${course.path}`}>
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
    );
}
