'use client';

import Link from 'next/link';
import Course from './components/Course';
import DailyQuest from './components/DailyQuest';
import { useUserStore } from '@/store/userStore';
import StoreItem from './components/StoreItem';
import styles from './page.module.css';

export default function Courses() {
    // Course progress data

    const User = useUserStore((state) => state.user);
    //check if User is null
    const coursesData = [
        {
            title: 'Opioid Overdose',
            path: 'opioid',
            progress: `${User && 'course_completion' in User ? User.course_completion.opioidCourse.courseProgress : 0}`,
        },
        {
            title: 'Career Training',
            path: 'career',
            progress: `${User && 'course_completion' in User ? User.course_completion.careerCourse.courseProgress : 0}`,
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
            {User && 'kibble_count' in User && (
                <div>
                    <h1>{User.kibble_count}</h1>
                </div>
            )}
            <div className={styles.store}>
                {products.map((product) => (
                    <StoreItem
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
}
