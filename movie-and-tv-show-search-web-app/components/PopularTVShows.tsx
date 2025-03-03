import React from 'react';
import { Carousel, Card } from './HomeCardsCarousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';
import UserScore from './UserScore';
import Image from 'next/image';

export default async function PopularTVShows() {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

    if (!token) {
        throw new Error('TMDB_API_READ_ACCESS_TOKEN is not set');
    }

    const data = await fetch(
        'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=1',
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

    const popularTVShows = await data.json();

    const cards = popularTVShows.results.map((tvShow: TVShow, index: number) => (
        <Card
            key={tvShow.id}
            card={{
                src: tvShow.poster_path === '' ? '/images/png/fallback.png' : `https://image.tmdb.org/t/p/original${tvShow.poster_path}`,
                title: tvShow.original_name,
                release_date: formatDate(tvShow.first_air_date, { year: 'numeric', month: 'long', day: '2-digit' }),
                content: (
                    <div className="flex sm:flex-wrap xs:flex-wrap xxs:flex-wrap">
                        <div className="flex sm:hidden xs:hidden xxs:hidden">
                            <a href={`/projects/movie-and-tv-show-search-web-app/tv/${tvShow.id}`}>
                                <Image
                                    src={
                                        tvShow.poster_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${tvShow.poster_path}`
                                    }
                                    alt={`${tvShow.original_name} movie poster`}
                                    width={768}
                                    height={1098}
                                    className="max-w-[266px] max-h-[1098px] rounded-xl rounded-tr-none rounded-br-none"
                                />
                            </a>
                        </div>

                        <div className="hidden sm:flex xs:flex xxs:flex">
                            <a href={`/projects/movie-and-tv-show-search-web-app/tv/${tvShow.id}`}>
                                <Image
                                    src={
                                        tvShow.backdrop_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
                                    }
                                    alt={`${tvShow.original_name} movie poster`}
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
                                                <UserScore value={tvShow.vote_average} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-black">
                                            <p>User Score</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex flex-col w-full">
                                    <a href={`/projects/movie-and-tv-show-search-web-app/tv/${tvShow.id}`}>
                                        <h1 className="text-2xl sm:text-xl xs:text-base xxs:text-base font-semibold line-clamp-1">
                                            {tvShow.original_name}
                                        </h1>
                                    </a>
                                    <p className="text-sm xs:text-xs xxs:text-xs line-clamp-1">
                                        {formatDate(tvShow.first_air_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-y-2">
                                <h2 className="text-lg sm:text-base xs:text-base xxs:text-base font-medium">Overview</h2>
                                <p className="text-sm xl:line-clamp-[14] lg:line-clamp-[14] md:line-clamp-[14]">{tvShow.overview}</p>
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
            <h2 className="mt-5 font-semibold text-xl">Popular TV Shows</h2>
            <Carousel items={cards} />
        </>
    );
}
