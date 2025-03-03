import { Suspense } from 'react';
import { formatDate } from '@/lib/utils';
import searchTMDB from '../../lib/searchTMDB';
import Link from 'next/link';
import Image from 'next/image';
import Loading from './loading';
import PaginationComponent from '../../components/PaginationComponent';
import '../../styles/styles.css';

type MovieSearchPageProps = {
    params: Promise<{
        route: string;
    }>;
    searchParams: Promise<{
        q: string;
        page: string;
    }>;
};

export default async function MovieSearchPage({ params, searchParams }: MovieSearchPageProps) {
    const { route } = await params;
    const { q, page } = await searchParams;

    const url = `https://api.themoviedb.org/3/search/${route}?&query=${q}&page=${page}`;

    const searchResults = searchTMDB(url);

    const data = await searchResults;

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col w-full mt-8">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <p>
                        Total result{data.total_results === 1 ? '' : 's'} {data.total_results}
                    </p>
                    <p>
                        Page {data.page} of {data.total_pages}
                    </p>
                </div>

                <div className="flex flex-wrap items-center w-full gap-4 mt-4 mb-8">
                    {data.total_results === 0 && (
                        <p className="w-full my-8 text-center text-muted-foreground">
                            There are no {route === 'movie' ? 'movies' : 'tv shows'} that matched your query.
                        </p>
                    )}

                    {data.total_results > 0 &&
                        data.results.map((item: MovieOrTVShow) => (
                            <Link
                                key={item.id}
                                href={`/projects/movie-and-tv-show-search-web-app/${route}/${item.id}`}
                                style={{
                                    width: `calc((100% - ((var(--tmdbSearchColumns) - 1) * 16px)) / var(--tmdbSearchColumns))`,
                                    height: 'auto',
                                    aspectRatio: 224 / 320,
                                }}
                                className="duration-300 hover:opacity-80 rounded-xl bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative z-10"
                            >
                                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

                                <div className="relative z-40 py-4 px-6">
                                    <h1 className="line-clamp-1 text-white text-lg font-semibold max-w-xs text-left [text-wrap:balance] font-sans">
                                        {route === 'movie' ? item.title : item.name}
                                    </h1>
                                    {route === 'movie' && item.release_date && (
                                        <p className="line-clamp-1 text-white text-xs font-medium font-sans text-left">
                                            {formatDate(item.release_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                        </p>
                                    )}
                                    {route === 'tv' && item.first_air_date && (
                                        <p className="line-clamp-1 text-white text-xs font-medium font-sans text-left">
                                            {formatDate(item.first_air_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                        </p>
                                    )}
                                </div>

                                <Image
                                    src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/images/png/fallback.png'}
                                    alt={`${item.original_name} ${route === 'movie' ? 'movie' : 'tv show'} poster`}
                                    width={463}
                                    height={662}
                                    style={{ width: 'auto', height: 'auto', aspectRatio: 224 / 320 }}
                                    className="object-cover absolute z-10 inset-0"
                                />
                            </Link>
                        ))}
                </div>

                <PaginationComponent currentPage={data.page} totalPages={data.total_pages} route={route} query={q} />
            </div>
        </Suspense>
    );
}
