import Link from 'next/link';
import Course from './components/Course';
import DailyQuest from './components/DailyQuest';

export default function Courses() {
    const opioidProgress = 0;
    const careerProgress = 40;

    // Example data for DailyQuest
    const dailyQuestData = {
        questPath: 'daily-quest-1',
        questTitle: 'Complete Your Profile',
        questDescription:
            'Fill in your profile information to help us tailor recommendations for you.',
        totalTasks: 3,
        completedTasks: 1,
    };

    return (
        <>
            <div>
                <Link href="/courses/opioid">
                    <Course
                        courseTitle={'Opioid Overdose'}
                        coursePath={'opioid'}
                        courseProgress={opioidProgress}
                    />
                </Link>
            </div>
            <div>
                <Link href="/courses/career">
                    <Course
                        courseTitle={'Career Training'}
                        coursePath={'career'}
                        courseProgress={careerProgress}
                    />
                </Link>
            </div>
            <div>
                <DailyQuest
                    questPath={dailyQuestData.questPath}
                    questTitle={dailyQuestData.questTitle}
                    questDescription={dailyQuestData.questDescription}
                    totalTasks={dailyQuestData.totalTasks}
                    completedTasks={dailyQuestData.completedTasks}
                />
            </div>
        </>
    );
}
