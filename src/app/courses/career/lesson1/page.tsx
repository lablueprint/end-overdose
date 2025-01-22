import Link from 'next/link';

export default function Lesson1() {
    return (
        <div>
            <h1> Lesson 1 Title </h1>
            <Link href="/courses/career/lesson1/1">Page 1</Link>
            <Link href="/courses/career/lesson1/2">Page 2</Link>
            <Link href="/courses/career/lesson/3">Page 3</Link>
        </div>
    );
}
