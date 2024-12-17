export type Todo = {
    id: number;
    completed: boolean;
    title: string;
};

export type Track = {
    id: string;
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