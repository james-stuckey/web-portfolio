import { Suspense } from 'react';
import { TopTracksSkeleton } from './components/top-tracks-skeleton';
import { fetchCurrentlyPlaying } from './lib/spotify';
import TopTracks from './components/top-tracks';
import CurrentlyPlaying from './components/currently-playing';
import Loading from './loading';

export default function Home() {
    const numberOfSongs = 5;

    return (
        <>
            <div className="flex flex-row justify-end items-center px-2 py-6 h-screen">
                <div className="w-full">
                    <h2 className="text-center text-6xl text-neutral-300">
                        Hi, I'm James
                    </h2>
                </div>
            </div>
        </>
    );
}
