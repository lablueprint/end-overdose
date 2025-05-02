'use client';
import { useUserStore } from '@/store/userStore';
import styles from './page.module.css';
import AuthWrap from '@/components/AuthWrap';
//import { getCourseProgress } from '../api/students/actions';
import { useState, useEffect } from 'react';
import { isStudent } from '@/types/Student';
import LevelIcon from './components/LevelIcon';

export default function Courses() {
    const [loading, setLoading] = useState(true);

    // Course progress data
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    const opiumLessonNum = 6;
    const [opioidCourseProgress, setOpioidCourseProgress] = useState(
        isStudent(user) ? user.course_completion.opioidCourse.courseProgress : 0
    );
    const [quizCompletion, setQuizCompletion] = useState(0);
    const [mapIndex, setMapIndex] = useState(
        Math.max(
            0,
            2 * Math.round((opioidCourseProgress / 100) * opiumLessonNum) - 1
        ) + quizCompletion
    );

    /* NTC Lesson 1 (0): 0    
NTC Quiz 1 (1): 1
NTC Lesson 2(1 + Quiz Completion): 2
NTC Quiz 2(2): 3
NTC Lesson 3(2 + Quiz Completion): 4
NTC Quiz 3 (3): 5
NTC Lesson 4 (3 + Quiz Completion): 6
NTC Quiz 4 (4): 7
NTC Lesson 5(4 + Quiz Completion): 8
NTC Quiz 5(5): 9
NTC Lesson 6 (5 + quiz Completion): 10
NTC Quiz 6(6): 11 /** */

    useEffect(() => {
        const fetchOpioidCourseProgress = async () => {
            try {
                if (isStudent(user)) {
                    // short-circuit evaluation, only checking role value if it exists
                    // checking that the user is a student by checking against admin attributes
                    setOpioidCourseProgress(
                        user.course_completion.opioidCourse.courseProgress
                    );
                    setMapIndex(
                        Math.max(
                            0,
                            2 *
                                Math.round(
                                    (opioidCourseProgress / 100) *
                                        opiumLessonNum
                                ) -
                                1
                        ) + quizCompletion
                    );
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOpioidCourseProgress();
    }, [user, quizCompletion]);

    console.log('Map Index:' + mapIndex);

    console.log('Student: ' + user);
    console.log('isStudent: ' + isStudent(user));
    if (isStudent(user)) {
        console.log(
            'User: ' + user.course_completion.opioidCourse.courseProgress
        );
    }

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
                <h1>OVERDOSE PREVENTION: KNOWING SIGNS</h1>
                <p>
                    Lorem ipsum dolor sit ameet, consecttur adipiscing elit.
                    Lorem ipsur dolor sit amet, consectetur adipiscing elit.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        margin: '1rem 0',
                    }}
                >
                    <button
                        onClick={() =>
                            setQuizCompletion((prev) => Math.max(prev - 1, 0))
                        }
                    >
                        Remove Quiz Completion
                    </button>
                    <button
                        onClick={() => setQuizCompletion((prev) => prev + 1)}
                    >
                        Add Quiz Completion
                    </button>
                </div>
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
            <div className={styles.footer}>
                <div className={styles.footerText}>
                    <p>
                        {' '}
                        If this content brings up tough emotions,{' '}
                        <a className={styles.helpLink}>
                            {' '}
                            you are not alone, get support here.{' '}
                        </a>
                    </p>{' '}
                </div>
            </div>
        </AuthWrap>
    );
}
