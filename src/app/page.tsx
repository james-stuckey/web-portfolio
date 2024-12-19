'use client';

import { useRouter } from 'next/navigation';
import Button from './components/Button';

export default function Home() {
    const numberOfSongs = 5;
    const router = useRouter();
    
    return (
        <>
            <div className="flex flex-row justify-end items-center px-2 py-6 h-screen">
                <div className="w-full">
                    <h2 className="text-center text-6xl text-neutral-300">
                        Hi, I'm James
                    </h2>
                </div>
                <Button
                    // type="button"
                    handleClick={() => {
                        console.log('hi');
                        router.prefetch('/about');
                    }}
                >
                    Dashboard
                </Button>
            </div>
        </>
    );
}
