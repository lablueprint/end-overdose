import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function CareerHome() {
    return (
        <div>
            <h1> Career Training </h1>
            <Link href="/courses/career/1">Page 1</Link>
            <Link href="/courses/career/2">Page 2</Link>
        </div>
    );
}
