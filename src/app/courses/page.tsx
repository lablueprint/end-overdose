import Link from 'next/link';
import CourseModule from './components/CourseModule';

export default function Courses() {
    let opioidProgress = 0;
    let careerProgres = 0;
    return (
        <>
            <h1> Courses </h1>
            <div>
                <Link href="/courses/opioid">
                    <CourseModule
                        courseTitle={'Opioid Overdose'}
                        coursePath={'opioid'}
                        courseProgress={opioidProgress}
                    />
                </Link>
            </div>
            <div>
                <Link href="/courses/career">
                    <CourseModule
                        courseTitle={'Career Training'}
                        coursePath={'career'}
                        courseProgress={careerProgres}
                    />
                </Link>
            </div>
            <Link href="/">HOME</Link>
        </>
    );
}
