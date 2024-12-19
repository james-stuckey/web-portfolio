'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePersistedState } from '../hooks/useLocalStorage';

export default function CurrentlyPlaying({
    refreshInterval = 30,
    showLastPlayed = false,
    displayWidgetWithNoData = true,
    hidden = false,
}: {
    refreshInterval: number;
    displayWidgetWithNoData?: boolean;
    showLastPlayed?: boolean;
    hidden?: boolean;
}) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [persistedLastPlayed, setPersistedLastPlayed] = usePersistedState(
        'last-played',
        '',
    );

    const iconSize = 60;

    useEffect(() => {
        async function fetchCurrentlyPlayingSong() {
            try {
                const response = await fetch('/api/currently-playing');
                const { data, error } = await response.json();
                if (data?.item) {
                    setPersistedLastPlayed(data.item);
                }

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

        const interval = setInterval(
            fetchCurrentlyPlayingSong,
            refreshInterval * 1000,
        ); // Poll every x seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [refreshInterval]);

    if (hidden) {
        return null;
    }

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

    if (!data && persistedLastPlayed && showLastPlayed) {
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
                    <p>Last played: {persistedLastPlayed.title}</p>
                </div>
            </div>
        );
    }
    if (!data && (!persistedLastPlayed || !showLastPlayed)) {
        if (!displayWidgetWithNoData) return <></>;

        return (
            <div className="flex flex-col border-3 border-neutral-800 bg-neutral-600 px-6 py-4 rounded-lg w-fit">
                <div className="flex flex-row items-center gap-4">
                    <Image
                        src={'/spotify.png'}
                        width={iconSize}
                        height={iconSize}
                        alt=""
                    />
                    <p>No current track data</p>
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
                        <p className="text-gray-300">
                            {data.is_playing
                                ? "I'm currently playing:"
                                : 'Paused for dramatic effect:'}
                        </p>

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
