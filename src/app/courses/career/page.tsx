'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import LessonTile from '../components/LessonTile';
import SimplePage from '../components/SimplePage';
import { useRouter, useParams } from 'next/navigation';

export default function CareerHome() {
    const [toggle, setToggle] = useState(true);
    const handleClick = () => {
        setToggle((prevState) => !prevState);
    };
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <h1
                onClick={handleClick}
                style={{
                    position: 'absolute',
                    left: '32.5rem',
                    top: '0.5rem',
                    fontSize: '30px',
                    cursor: 'pointer',
                    rotate: toggle ? '180deg' : '0deg',
                    transform: `translateX(${toggle ? '21rem' : '0'})`,
                }}
            >
                &larr;
            </h1>
            <div
                style={{
                    flex: toggle ? 0 : 2.8,
                    overflowY: 'auto',
                    maxHeight: '98vh',
                    transition: 'flex-grow 0.5s ease-in-out',
                }}
            >
                <h1
                    onClick={handleClick}
                    style={{
                        fontWeight: '700',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                >
                    Course Name
                </h1>
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
                    flex: toggle ? 10 : 6,
                    maxHeight: '98vh',
                    overflowY: 'auto',
                    padding: '0 10px',
                }}
            >
                <SimplePage pageTitle="Career Training"></SimplePage>
            </div>
        </div>
    );
}
