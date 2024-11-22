import React from 'react';
import Link from 'next/link';

export default function Courses() {
    return (
        <>
            <h1> Courses </h1>
            <div>
                <Link href="/courses/opiod">Course 1</Link>
            </div>
            <div>
                <button>Course 2</button>
            </div>
            <Link href="/">HOME</Link>
        </>
    );
}
