// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent  before:via-neutral-700/70 before:to-transparent';

export function TrackSkeleton({ index }: { index: number }) {
    return (
        <li className="flex items-center gap-3 mb-4">
            <span className="text-3xl text-neutral-600 font-bold inline-block w-5">
                {index + 1}
            </span>
            <div className="flex justify-center">
                <div
                    className={`w-[100px] h-[100px] bg-neutral-700/60 relative ${shimmer} overflow-hidden`}
                />
                <div className="ml-3">
                    <p
                        className={`w-24 h-4 bg-neutral-700/60 mb-3 relative ${shimmer} overflow-hidden`}
                    />
                    <p
                        className={`w-32 h-4 bg-neutral-700/60 relative ${shimmer} overflow-hidden`}
                    />
                </div>
            </div>
        </li>
    );
}

export function TopTracksSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex flex-row bg-neutral-900">
            <div className="container w-1/2 mx-auto">
                {
                    //7 because we requested 7 songs, you can create a constant
                    //named "NUMBER_OF_BANGERS" to make it easier to manage
                    Array.from(Array(count).keys()).map((_, index) => (
                        <TrackSkeleton key={index} index={index} />
                    ))
                }
            </div>
        </div>
    );
}
