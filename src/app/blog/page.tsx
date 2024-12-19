import Link from 'next/link';

export default function BlogPage() {
    return (
        <>
            <p className="text-4xl">Blog Page</p>

            <p>
                <Link href="blog/123" className="hover:text-amber-300">
                    123
                </Link>
            </p>
        </>
    );
}
