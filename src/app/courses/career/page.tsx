import React from 'react';
import Link from 'next/link';
import LessonTile from '../components/LessonTile';
import SimplePage from '../components/SimplePage';
import { useRouter, useParams } from 'next/navigation';

export default function CareerHome() {
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: 3, overflowY: 'auto' }}>
                <h1> Career Training </h1>
                <div>
                    <Link href="/courses/career/lesson1">
                        <LessonTile
                            lessonNumber={1}
                            lessonTitle={'Lesson 1 Title'}
                            lessonPath={'lesson1'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
                <div>
                    <Link href="/courses/career/lesson2">
                        <LessonTile
                            lessonNumber={2}
                            lessonTitle={'Lesson 2 Title'}
                            lessonPath={'lesson2'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
                <div>
                    <Link href="/courses/career/lesson3">
                        <LessonTile
                            lessonNumber={3}
                            lessonTitle={'Lesson 3 Title'}
                            lessonPath={'lesson3'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
                <div>
                    <Link href="/courses/career/lesson1">
                        <LessonTile
                            lessonNumber={1}
                            lessonTitle={'Lesson 1 Title'}
                            lessonPath={'lesson1'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
                <div>
                    <Link href="/courses/career/lesson2">
                        <LessonTile
                            lessonNumber={2}
                            lessonTitle={'Lesson 2 Title'}
                            lessonPath={'lesson2'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
                <div>
                    <Link href="/courses/career/lesson3">
                        <LessonTile
                            lessonNumber={3}
                            lessonTitle={'Lesson 3 Title'}
                            lessonPath={'lesson3'}
                            lessonCourse={'career'}
                        ></LessonTile>
                    </Link>
                </div>
            </div>
            <div
                style={{
                    flex: 7,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                }}
            >
                <SimplePage pageTitle="Career Training"></SimplePage>
            </div>
        </div>
    );
}
