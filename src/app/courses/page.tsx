'use client';
import { useUserStore } from '@/store/userStore';
import styles from './page.module.css';
import AuthWrap from '@/components/AuthWrap';
//import { getCourseProgress } from '../api/students/actions';
import { useState, useEffect } from 'react';
import { isStudent } from '@/types/newStudent';
import LevelIcon from './components/LevelIcon';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto-condensed/700.css';

export default function Courses() {
    const [loading, setLoading] = useState(true);

    // Course progress data
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const opiumLessonNum = 6;
    const [opioidCourseProgress, setOpioidCourseProgress] = useState(
        isStudent(user) ? user.courses.opioidCourse.courseProgress : 0
    );
    const [quizzesCompleted, setQuizzesCompleted] = useState(
        isStudent(user) ? user.courses.opioidCourse.quizzes.length : 0
    );
    const [mapIndex, setMapIndex] = useState(
        Math.round((opioidCourseProgress / 100) * opiumLessonNum) +
            quizzesCompleted
    );

    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            try {
                if (isStudent(user)) {
                    // short-circuit evaluation, only checking role value if it exists
                    // checking that the user is a student by checking against admin attributes
                    setOpioidCourseProgress(
                        user.courses.opioidCourse.courseProgress
                    );
                    setMapIndex(
                        Math.round(
                            (opioidCourseProgress / 100) * opiumLessonNum
                        ) + quizzesCompleted
                    );
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOpioidCourseProgress();
        console.log(
            'lessons completed: ' +
                Math.round((opioidCourseProgress / 100) * opiumLessonNum)
        );
        console.log('quizzes completed ' + quizzesCompleted);
    }, [user, quizzesCompleted]);

    /**   const coursesData = [
        {
            title: 'Opioid Overdose',
            path: 'opioid',
            progress: `${user && 'course_completion' in user ? user.courses.opioidCourse.courseProgress : 0}`,
        },
        {
            title: 'Career Training',
            path: 'career',
            progress: `${user && 'courses' in user ? user.courses.careerCourse.courseProgress : 0}`,
        },
        //hardcoded right now, change later
        { title: 'Mental Health', path: 'mental-health', progress: 25 },
        { title: 'First Aid', path: 'first-aid', progress: 60 },
        // { title: 'Life Skills', path: 'life-skills', progress: 15 },
        // { title: 'Stress Management', path: 'stress', progress: 30 },
    ]; */
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
        { top: '45.2%', left: '32.2%' },
        { top: '52.2%', left: '39.3%' },
        { top: '45%', left: '47.3%' },
        { top: '56%', left: '50.7%' },
        { top: '62%', left: '57.8%' },
        { top: '51%', left: '62%' },
        { top: '36.4%', left: '60.9%' },
        { top: '39.5%', left: '70.2%' },
        { top: '39%', left: '78.9%' },
        { top: '49.8%', left: '84.1%' },
        // Add more as needed...
    ];

    /*  <LevelIcon type="completed" top={'45.2%'} left={'32.2%'} />
    <LevelIcon type="completed" top={'52.2%'} left={'39.3%'} />
    <LevelIcon type="completed" top={'45%'} left={'47.3%'} />
    <LevelIcon type="completed" top={'56%'} left={'50.7%'} />
    <LevelIcon type="completed" top={'62%'} left={'57.8%'} />
    <LevelIcon type="completed" top={'51%'} left={'62%'} />
    <LevelIcon type="completed" top={'36.4%'} left={'60.9%'} />
    <LevelIcon type="completed" top={'39.5%'} left={'70.2%'} />
    <LevelIcon type="completed" top={'39%'} left={'78.9%'} />
    <LevelIcon type="completed" top={'49.8%'} left={'84.1%'} /> */

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
            <div className={styles.header}>
                <div className={styles.headerText}>
                    {' '}
                    <h1 className={styles.titleText}>
                        OPIOID OVERDOSE TRAINING
                    </h1>
                    <p className={styles.bodyText}>
                        This course teaches you how to recognize the key signs
                        of a drug overdose, including changes in breathing, skin
                        color, and consciousness. You'll learn the differences
                        between opioid, stimulant, and alcohol overdoses, and
                        what to do in each situation.
                    </p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        margin: '1rem 0',
                    }}
                ></div>
            </div>
            <div className={styles.mapContainer}>
                {' '}
                <img className={styles.map} src="/planetcourse.svg" alt="Map" />
                {levelPositions.map((pos, index) => {
                    if (index < mapIndex) {
                        return (
                            <LevelIcon
                                key={index}
                                type="completed"
                                top={pos.top}
                                left={pos.left}
                            />
                        );
                    } else if (index === mapIndex) {
                        return (
                            <LevelIcon
                                key={index}
                                type="current"
                                top={pos.top}
                                left={pos.left}
                                href={
                                    index % 2 === 0
                                        ? '/courses/opioid'
                                        : '/quiz'
                                }
                            />
                        );
                    }
                    return null; // Don't render anything for future levels
                })}
            </div>
        </AuthWrap>
    );
}
