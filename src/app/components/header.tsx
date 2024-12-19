'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavHeader() {
    const pathname = usePathname();
    return (
        <nav className="flex justify-end items-center space-x-3 px-24 gap-4 py-4 text-neutral-500">
            <Link
                href="/"
                className={clsx('hover:text-neutral-50', {
                    'text-neutral-50 underline decoration-neutral-700 underline-offset-4':
                        pathname === '/',
                })}
            >
                Home
            </Link>
            <Link
                href="/about"
                prefetch={true}
                className={clsx('hover:text-neutral-50', {
                    'text-neutral-50 underline decoration-neutral-700 underline-offset-4':
                        pathname === '/about',
                })}
            >
                About
            </Link>
            {/* <Link href="/blog" className="hover:text-neutral-50">
                            Blog
                        </Link> */}
            <Link
                href="/contact"
                className={clsx('hover:text-neutral-50', {
                    'text-neutral-50 underline decoration-neutral-700 underline-offset-4':
                        pathname === '/contact',
                })}
            >
                Contact
            </Link>
        </nav>
    );
}
