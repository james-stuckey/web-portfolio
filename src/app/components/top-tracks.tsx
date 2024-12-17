import Link from 'next/link';
import { getTopTracks } from '../lib/spotify';
import { Track } from '../types';
import Image from 'next/image';

export default async function TopTracks({
    trackCount,
}: {
    trackCount: number;
}) {
    const tracks: Track[] = await getTopTracks(trackCount);

    const albumCoverSize = 120;

    return (
        <div>
            {tracks
                ? tracks?.map((track: Track, index: number) => (
                      <li
                          key={track.songUrl}
                          className="flex items-center gap-12 mb-4 p-4 rounded-md text-gray-300"
                      >
                          <span className="text-3xl text-gray-300 font-bold inline-block w-5">
                              {index + 1}
                          </span>
                          <Link
                              href={track.albumUrl}
                              className="w-fit"
                              target="_blank"
                              rel="noopener noreferrer"
                          >
                              <Image
                                  src={track.albumCover.url}
                                  alt=""
                                  width={albumCoverSize}
                                  height={albumCoverSize}
                              ></Image>
                          </Link>
                          <div className="flex justify-center">
                              <div className="ml-3 -mt-1">
                                  <p>
                                      {track.artistUrls.map(
                                          (link, artistIndex) => {
                                              return (
                                                  <span
                                                      key={`${artistIndex}-${track.id}`}
                                                  >
                                                      <Link
                                                          href={link}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="hover:underline hover:text-amber-300"
                                                      >
                                                          {
                                                              track.artist[
                                                                  artistIndex
                                                              ]
                                                          }
                                                      </Link>
                                                      {artistIndex <
                                                          track.artistUrls
                                                              .length -
                                                              1 && ', '}
                                                  </span>
                                              );
                                          },
                                      )}
                                  </p>

                                  <p>
                                      <Link
                                          href={track.songUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="link-transition hover:underline hover:text-amber-300"
                                      >
                                          {track.title}
                                      </Link>
                                  </p>
                              </div>
                          </div>
                      </li>
                  ))
                : 'Something went wrong'}
        </div>
    );
}
