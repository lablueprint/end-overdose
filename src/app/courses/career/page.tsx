import React from 'react';
import Link from 'next/link';
import Module from '../components/Module';
import { useRouter, useParams } from 'next/navigation';

export default function CareerHome() {
    return (
        <div>
            <h1> Career Training </h1>
            <Link href="/courses/career/module1">
                <Module
                    moduleTitle={'Module 1'}
                    moduleCourse={'career'}
                    modulePath={'module1'}
                    moduleProgress={10}
                />
            </Link>
            <Link href="/courses/career/module2">
                <Module
                    moduleTitle={'Module 2'}
                    moduleCourse={'career'}
                    modulePath={'module2'}
                    moduleProgress={70}
                />
            </Link>
        </div>
    );
}
