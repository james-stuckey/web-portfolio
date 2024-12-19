'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CurrentlyPlaying() {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const iconSize = 60;

    useEffect(() => {
        async function fetchCurrentlyPlayingSong() {
            try {
                const response = await fetch('/api/currently-playing');
                const { data, error, currentlyPlaying } = await response.json();

                if (error) {
                    throw Error(error);
                }

                setData(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentlyPlayingSong();

        const ONE_SECOND = 1000;
        const interval = setInterval(
            fetchCurrentlyPlayingSong,
            ONE_SECOND * 30,
        ); // Poll every x seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 py-4 rounded-lg w-fit">
                <div className="flex flex-row items-center gap-4">
                    <Image
                        src={'/spotify.png'}
                        width={iconSize}
                        height={iconSize}
                        alt=""
                    />
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        // return <></>;
        return (
            <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 py-4 rounded-lg w-fit">
                <div className="flex flex-row items-center gap-4">
                    <Image
                        src={'/spotify.png'}
                        width={iconSize}
                        height={iconSize}
                        alt=""
                    />
                    <h1 className="">Nothing is currently playing</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 py-2 rounded-lg w-fit">
            <div className="flex flex-row items-center gap-6">
                {data?.item && (
                    <Image
                        src={'/spotify.png'}
                        width={iconSize}
                        height={iconSize}
                        alt=""
                    />
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
                                <span key={`${artistIndex}-${link.id}`}>
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
