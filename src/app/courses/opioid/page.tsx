import React from 'react';
import Link from 'next/link';

export default function OpioidHome() {
    return (
        <div>
            <h1> Opioid Overdose </h1>
            <Link href="/courses/opioid/1">Page 1</Link>
            <Link href="/courses/opioid/2">Page 2</Link>
        </div>
    );
}
