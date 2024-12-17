const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")



export default function BlogPage() {
    return <p className="text-4xl">Blog Page</p>;
}
