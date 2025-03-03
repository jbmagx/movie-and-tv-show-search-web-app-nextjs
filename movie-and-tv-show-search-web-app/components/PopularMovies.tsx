import React from 'react';
import { Carousel, Card } from './HomeCardsCarousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';
import UserScore from './UserScore';
import Image from 'next/image';

export default async function PopularMovies() {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

    if (!token) {
        throw new Error('TMDB_API_READ_ACCESS_TOKEN is not set');
    }

    const data = await fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=1',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: token,
            },
            next: {
                revalidate: 3600, // invalidate every hour
            },
        }
    );

    const popularMovies = await data.json();

    const cards = popularMovies.results.map((movie: Movie, index: number) => (
        <Card
            key={movie.id}
            card={{
                src: movie.poster_path === '' ? '/images/png/fallback.png' : `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                title: movie.title,
                release_date: formatDate(movie.release_date, { year: 'numeric', month: 'long', day: '2-digit' }),
                content: (
                    <div className="flex sm:flex-wrap xs:flex-wrap xxs:flex-wrap">
                        <div className="flex sm:hidden xs:hidden xxs:hidden">
                            <a href={`/projects/movie-and-tv-show-search-web-app/movie/${movie.id}`}>
                                <Image
                                    src={
                                        movie.poster_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                    }
                                    alt={`${movie.title} movie poster`}
                                    width={768}
                                    height={1098}
                                    className="max-w-[266px] max-h-[1098px] rounded-xl rounded-tr-none rounded-br-none"
                                />
                            </a>
                        </div>

                        <div className="hidden sm:flex xs:flex xxs:flex">
                            <a href={`/projects/movie-and-tv-show-search-web-app/movie/${movie.id}`}>
                                <Image
                                    src={
                                        movie.backdrop_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                                    }
                                    alt={`${movie.title} movie poster`}
                                    width={768}
                                    height={1098}
                                    className="sm:max-h-[25.25rem] xs:max-h-[15.125rem] xxs:max-h-[11.375rem] rounded-lg rounded-bl-none rounded-br-none"
                                />
                            </a>
                        </div>

                        <div className="flex flex-col w-full gap-y-4 xs:gap-y-3 xxs:gap-y-2 px-4 py-4">
                            <div className="flex items-center gap-x-4 xs:gap-x-3 xxs:gap-x-2">
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <button className="cursor-default">
                                                <UserScore value={movie.vote_average} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-black">
                                            <p>User Score</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex flex-col w-full">
                                    <a href={`/projects/movie-and-tv-show-search-web-app/movie/${movie.id}`}>
                                        <h1 className="text-2xl sm:text-xl xs:text-base xxs:text-base font-semibold line-clamp-1">{movie.title}</h1>
                                    </a>
                                    <p className="text-sm xs:text-xs xxs:text-xs line-clamp-1">
                                        {formatDate(movie.release_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-y-2">
                                <h2 className="text-lg sm:text-base xs:text-base xxs:text-base font-medium">Overview</h2>
                                <p className="text-sm xl:line-clamp-[14] lg:line-clamp-[14] md:line-clamp-[14]">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                ),
            }}
            index={index}
        />
    ));

    return (
        <>
            <h2 className="mt-10 font-semibold text-xl">Popular Movies</h2>
            <Carousel items={cards} />
        </>
    );
}
