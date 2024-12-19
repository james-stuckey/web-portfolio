import { getCurrentlyPlaying } from '@/app/lib/spotify';

export async function GET() {
    try {
        const { data, type, error } = await getCurrentlyPlaying();

        return new Response(
            JSON.stringify({
                currentlyPlaying: true,
                data,
                type,
                error,
            }),
            {
                status: 200,
            },
        );
    } catch (err) {
        return new Response(
            JSON.stringify({
                currentlyPlaying: false,
                data: null,
            }),
            { status: 200 },
        );
    }
}
