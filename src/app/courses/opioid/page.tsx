'use client';

import Link from 'next/link';
import Module from '../components/LessonCircle';
import LessonBanner from '../components/LessonBanner';
import { useUserStore } from '@/store/userStore';

export default function OpioidHome() {
    const User = useUserStore((state) => state.user);
    const TOTALLESSONS = 10;
    const lessonNumber = Math.round(
        ((User && 'course_completion' in User
            ? User.course_completion.opioidCourse.courseProgress
            : 0) /
            100) *
            TOTALLESSONS
    );
    console.log(User);
    return (
        <div>
            <h1> Opioid Overdose </h1>
            <LessonBanner
                lessonNumber={lessonNumber}
                lessonProgress={
                    User && 'course_completion' in User
                        ? User.course_completion.opioidCourse.courseProgress
                        : 0
                }
            />
            <Link href="/courses/opioid/module1">
                <Module
                    lessonPath={'module1'}
                    lessonTitle={'Lesson 1'}
                    lessonCourse={'opioid'}
                    lessonProgress={
                        User && 'course_completion' in User
                            ? User.course_completion.opioidCourse.courseProgress
                            : 0
                    }
                />
            </Link>
            {/* 
            <Link href="/courses/opioid/module2">
                <Module
                    moduleTitle={'Module 2'}
                    moduleCourse={'opioid'}
                    modulePath={'module2'}
                    moduleProgress={5}
                />
            </Link> */}
        </div>
    );
}
