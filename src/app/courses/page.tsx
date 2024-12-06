import Link from 'next/link';
import Course from './components/Course';
import SimplePage from './components/SimplePage';

export default function Courses() {
    let opioidProgress = 0;
    let careerProgres = 40;
    //useState for progress tracking

    return (
        <>
            <SimplePage pageTitle="Title" />
            <h1> Courses </h1>
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
                        courseProgress={careerProgres}
                    />
                </Link>
            </div>
            <Link href="/">HOME</Link>
        </>
    );
}
