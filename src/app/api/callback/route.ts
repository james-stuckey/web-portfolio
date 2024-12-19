import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
        return Response.json({ error: 'Missing code or state' });
    }

    const baseRedirectUrl = 'http://localhost:3000/';

    const queryString = `?code=${code}&state=${state}`;
    const fullBackToAppURL = baseRedirectUrl + queryString;

    // const { access_token, refresh_token } = await getAuthToken(code);

    return Response.redirect(baseRedirectUrl);
}
