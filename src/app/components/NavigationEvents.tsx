'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function NavigationEvents() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname === '/blog' && !searchParams?.get('id')) {
            router.push('/');
        }
    }, [pathname, router, searchParams]);
    
    return <></>;
}
