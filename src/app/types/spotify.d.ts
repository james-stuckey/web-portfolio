type ImageObject = {
    url: string;
    height: number;
    width: number;
};

type SimplifiedArtist = {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
};

type SimplifiedTrack = {
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    restrictions: {
        reason: 'market' | 'product' | 'explicit';
    };
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
};

type Album = {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    restrictions: {
        reason: string;
    };
    type: 'album';
    uri: string;
    artists: SimplifiedArtist[];
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: SimplifiedTrack[];
    };
    copyrights: {
        text: string;
        type: string;
    };
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    // always empty
    genres?: string[]; // deprecated by Spotify API
    label: string;
    popularity: number;
};

type Track = {
    album: Album;
    artists: SimplifiedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
};

type SpotifyTopItemsResponse<T> = {
    href: string; // A link to the Web API endpoint returning the full result of the request.
    items: T[]; // An array of the requested items (artists or tracks).
    limit: number; // The maximum number of items in the response.
    next: string | null; // URL to the next page of items (or null if none).
    offset: number; // The starting index of the items returned.
    previous: string | null; // URL to the previous page of items (or null if none).
    total: number; // The total number of items available to return.
};

type TransformedTrack = {
    id: string;
    album: Album;
    artist: string[];
    artistUrls: string[];
    albumUrl: string;
    songUrl: string;
    title: string;
    albumCover: {
        width: number;
        height: number;
        url: string;
    };
};
