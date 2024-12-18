import querystring from 'querystring';
import { Track } from '../types';
import { SPOTIFY_REDIRECT_URI } from '../utils/spotify';
import { error } from 'console';

export const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
export const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
export const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(
    `${spotify_client_id}:${spotify_client_secret}`,
).toString('base64');

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const exchangeCodeForToken = async (
    code: string,
): Promise<SpotifyAuthResponse> => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            redirect_uri: SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code',
            code: code,
        }),
    });

    return response.json();
};

export const getAccessToken = async (): Promise<SpotifyAuthResponse> => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};

export const fetchTopTracks = async (number: number) => {
    const { access_token } = await getAccessToken();
    const type = 'tracks';

    const response = await fetch(
        `${SPOTIFY_API_BASE_URL}/me/top/${type}?time_range=medium_term&limit` +
            '=' +
            number,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch top tracks: ${response.statusText}`);
    }

    return response.json();
};

export async function getTopTracks(number: number) {
    // unstable_noStore();
    try {
        //get your most listened-to tracks
        const { items } = await fetchTopTracks(number);

        //format the JSON with map()
        const tracks = items?.map((track: Track, index: number) => {
            return {
                id: track.id,
                artist: track.artists.map((_artist) => _artist.name),
                artistUrls: track.artists.map(
                    (_artist) => _artist.external_urls.spotify,
                ),
                songUrl: track.external_urls.spotify,
                title: track.name,
                key: index + 1,
                albumCover: track.album.images[0],
                albumUrl: track.album.external_urls.spotify,
            };
        });

        return tracks;
    } catch (e) {
        console.error(e);
    }
}

const CURRENT_USER_PROFILE_ENDPOINT = `${SPOTIFY_API_BASE_URL}/me`;
export const fetchCurrentUserProfile = async () => {
    const { access_token } = await getAccessToken();
    const response = await fetch(CURRENT_USER_PROFILE_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error(
            'Failed to load current user profile: ' + response.statusText,
        );
    }

    return response.json();
};

export const fetchUsersSavedTracks = async () => {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${SPOTIFY_API_BASE_URL}/me/tracks`, {
        headers: {
            Authorization: `Bearer ${access_token}!`,
        },
    });

    if (!response.ok) {
        throw new Error(
            "Failed to load user's saved tracks " + response.statusText,
        );
    }

    const { items, total } = await response.json();
    const data = items.map((track) => ({
        addedAt: track.added_at,
        track: track,
    }));

    return data;
};

export const fetchCurrentlyPlaying = async () => {
    const { access_token } = await getAccessToken();

    const currentlyPlayingResponse = await fetch(
        `${SPOTIFY_API_BASE_URL}/me/player/currently-playing`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    );

    try {
        const data = await currentlyPlayingResponse.json();
        return { data, type: 'SUCCESS', error: null };
    } catch (e) {
        return {
            data: null,
            type: 'EMPTY_RESPONSE',
            error: 'No currently playing track or empty response',
        };
    }
};

export const getCurrentlyPlaying = async () => {
    const { data, type, error } = await fetchCurrentlyPlaying();

    if (error) {
        return {
            data,
            type,
            error,
        };
    }
    const {
        item: track,
        timestamp,
        context,
        is_playing,
        currently_playing_type,
    } = data;

    return {
        data: {
            timestamp: timestamp,
            context,
            item: {
                id: track.id,
                artist: track.artists.map((_artist) => _artist.name),
                artistUrls: track.artists.map(
                    (_artist) => _artist.external_urls.spotify,
                ),
                songUrl: track.external_urls.spotify,
                title: track.name,
                albumCover: track.album.images[0],
                albumUrl: track.album.external_urls.spotify,
            },
            is_playing,
            currently_playing_type,
        },
        error,
        type,
    };
};
