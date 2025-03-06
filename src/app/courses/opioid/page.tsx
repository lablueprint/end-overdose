'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import LessonTile from '../components/LessonTile';
import SimplePage from '../components/SimplePage';
import VideoPage from '../components/VideoPage';
import lessons from './lessons';
import { useRouter, useParams } from 'next/navigation';

export default function OpioidHome() {
    const [toggle, setToggle] = useState(false);
    const [currentLesson, setLesson] = useState(0);
    const handleChangeLesson = (lessonNumber) => {
        setLesson(lessonNumber);
    };
    const handleClick = () => {
        setToggle((prevState) => !prevState);
    };
    const tempjson = [
        {
            company: 'GeeksforGeeks',
            contact: '+91-9876543210',
            city: 'Noida',
        },
        {
            company: 'company2',
            contact: '+91-9876543210',
            city: 'sf',
        },
    ];
    // const tempjson = "fiona"

    const navBarEntries = lessons.map((lesson, index) => (
        <div key={index}>
            <LessonTile
                lessonNumber={index}
                lessonTitle={lesson.title}
                lessonPath={'lesson1'}
                lessonCourse={'opioid'}
                onHandleChangeLesson={handleChangeLesson}
            ></LessonTile>
        </div>
    ));
    console.log(lessons[currentLesson]);

    const handleNextLesson = () => {
        setLesson((prevIndex) => prevIndex + 1);
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
                    Opioid Lesson
                </h1>
                {navBarEntries}
            </div>
            <div
                style={{
                    flex: toggle ? 10 : 6,
                    maxHeight: '98vh',
                    overflowY: 'auto',
                    padding: '0 10px',
                }}
            >
                {lessons[currentLesson].isVideo ? (
                    <VideoPage
                        videoPath="https://www.youtube.com/watch?v=o2Tpws5C2Eg"
                        startTime="00:00"
                        endTime="05:00"
                        pageTitle={lessons[currentLesson].title}
                        pageContent={lessons[currentLesson].content}
                        pageModule="lesson1" // module name/number
                        pageCourse="opioid" // course name
                    />
                ) : (
                    <SimplePage
                        pageTitle={lessons[currentLesson].title}
                        lesson={lessons[currentLesson]}
                        handleNext={handleNextLesson}
                    />
                )}
            </div>
        </div>
    );
}
