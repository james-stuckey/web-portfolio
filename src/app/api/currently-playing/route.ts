import { getCurrentlyPlaying } from '@/app/lib/spotify';

export async function GET() {
    try {
        const { data } = await getCurrentlyPlaying();

        return new Response(
            JSON.stringify({
                currentlyPlaying: true,
                data,
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
