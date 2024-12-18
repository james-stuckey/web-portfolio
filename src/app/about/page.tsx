import { Suspense } from 'react';
import TopTracks from '../components/top-tracks';
import { TopTracksSkeleton } from '../components/top-tracks-skeleton';
import CurrentlyPlaying from '../components/currently-playing';

export default function AboutPage() {
    const trackCount = 10;

    return (
        <div className="">
            <Suspense fallback={<TopTracksSkeleton count={trackCount} />}>
                <div className="flex flex-row bg-neutral-900 py-8 px-24">
                    <div className="container w-3/4 mx-auto">
                        <h1 className="text-3xl text-neutral-100 text-center">
                            Tracks I Love Right Now
                        </h1>
                        <TopTracks trackCount={trackCount} />
                        <div className="flex justify-center">
                            <CurrentlyPlaying />
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
