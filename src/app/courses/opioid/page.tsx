import Link from 'next/link';
import Module from '../components/Lesson';

export default function OpioidHome() {
    return (
        <div>
            <h1> Opioid Overdose </h1>
            <Link href="/courses/opioid/module1">
                <Module
                    moduleTitle={'Module 1'}
                    moduleCourse={'opioid'}
                    modulePath={'module1'}
                    moduleProgress={3}
                />
            </Link>
            <Link href="/courses/opioid/module2">
                <Module
                    moduleTitle={'Module 2'}
                    moduleCourse={'opioid'}
                    modulePath={'module2'}
                    moduleProgress={5}
                />
            </Link>
        </div>
    );
}
