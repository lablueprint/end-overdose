import Link from 'next/link';

export default function Module1() {
    return (
        <div>
            <h1> Module 1 Title </h1>
            <Link href="/courses/career/module1/1">Page 1</Link>
            <Link href="/courses/career/module1/2">Page 2</Link>
            <Link href="/courses/career/module1/3">Page 3</Link>
        </div>
    );
}
