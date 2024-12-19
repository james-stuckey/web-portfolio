import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map();
const ONE_SECOND = 1000;

const RATE_LIMIT = 30;
const TIME_WINDOW = ONE_SECOND * 30;

export async function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    let rateLimitData = rateLimitMap.get(ip);

    if (!rateLimitData) {
        // Initialize rate limit data if none exists
        rateLimitData = { count: 1, startTime: now };
        rateLimitMap.set(ip, rateLimitData);
    } else {
        if (now - rateLimitData.startTime > TIME_WINDOW) {
            // Reset the count and startTime after the time window
            rateLimitData.count = 1;
            rateLimitData.startTime = now;
        } else {
            // Increment the count within the time window
            rateLimitData.count += 1;
        }
    }

    if (rateLimitData.count > RATE_LIMIT) {
        // Rate limit exceeded
        return NextResponse.json(
            { message: 'Too many requests, please try again later.' },
            { status: 429 },
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/currently-playing',
};
