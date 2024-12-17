import Image from 'next/image';
import { getCurrentlyPlaying } from '../lib/spotify';
import Link from 'next/link';

export default async function CurrentlyPlaying() {
    const { data, error, type } = await getCurrentlyPlaying();

    const albumCoverSize = 80;

    if (!data) {
        return <></>;
        return (
            <>
                <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 py-4 rounded-lg w-fit">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src={'/spotify.png'}
                            width={50}
                            height={40}
                            alt=""
                        />
                        <h1 className="text-white">
                            I'm not listening at the moment...
                        </h1>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 pt-2 pb-2 rounded-lg w-fit">
            <div className="flex flex-row items-center gap-4">
                {data?.item && (
                    <Image src={'/spotify.png'} width={50} height={40} alt="" />
                )}
                {data?.item && (
                    <div className="text-white">
                        <p className="text-gray-300">Now playing</p>

                        
                        <p>
                            <Link
                                href={data.item.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline hover:text-amber-300"
                            >
                                {data.item.title}
                            </Link>
                        </p>
                        {data.item.artistUrls.map((link, artistIndex) => {
                            return (
                                <span key={`${artistIndex}-${data.item.id}`}>
                                    <Link
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline hover:text-amber-300"
                                    >
                                        {data.item.artist[artistIndex]}
                                    </Link>
                                    {artistIndex <
                                        data.item.artistUrls.length - 1 && ', '}
                                </span>
                            );
                        })}
                        
                    </div>
                )}
            </div>
        </div>
    );
}
