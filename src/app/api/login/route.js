import querystring from 'querystring';

import { generateRandomString } from '../../utils/spotify';

export async function GET() {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read user-library-read user-read-currently-playing';

    const redirect_uri = 'http://localhost:3000/api/callback'; // Callback endpoint

    const spotifyAuthURL =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            show_dialog: true,
        });

    return Response.redirect(spotifyAuthURL);
}
