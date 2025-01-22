import Link from 'next/link';

export default function Lesson2() {
    return (
        <div>
            <h1> Lesson 2 Title </h1>
            <Link href="/courses/career/lesson2/1">Page 1</Link>
            <Link href="/courses/career/lesson2/2">Page 2</Link>
            <Link href="/courses/career/lesson2/3">Page 3</Link>
        </div>
    );
}
