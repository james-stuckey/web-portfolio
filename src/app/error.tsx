'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="bg-white">
            <p>Something went wrong!</p>
            <p>{error.message}</p>

            <button
                style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '6px 10px',
                }}
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
