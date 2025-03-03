import { Carousel, Card } from './HomeCardsCarousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';
import UserScore from './UserScore';
import Image from 'next/image';

export default async function TrendingToday() {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

    if (!token) {
        throw new Error('TMDB_API_READ_ACCESS_TOKEN is not set');
    }

    const data = await fetch('https://api.themoviedb.org/3/trending/all/day', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: token,
        },
        next: {
            revalidate: 3600, // invalidate every hour
        },
    });

    const dataJson = await data.json();

    const trendingToday = dataJson.results.filter((item: TrendingMovieOrTVShow) => item.media_type === 'movie' || item.media_type === 'tv');

    const cards = trendingToday.map((item: TrendingMovieOrTVShow, index: number) => (
        <Card
            key={item.id}
            card={{
                src: item.poster_path === '' ? '/images/png/fallback.png' : `https://image.tmdb.org/t/p/original${item.poster_path}`,
                title: item.media_type === 'movie' ? (item.title as string) : (item.name as string),
                release_date: formatDate(item.media_type === 'movie' ? (item.release_date as string) : (item.first_air_date as string), {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                }),
                content: (
                    <div className="flex sm:flex-wrap xs:flex-wrap xxs:flex-wrap">
                        <div className="flex sm:hidden xs:hidden xxs:hidden">
                            <a href={`/projects/movie-and-tv-show-search-web-app/${item.media_type}/${item.id}`}>
                                <Image
                                    src={
                                        item.poster_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${item.poster_path}`
                                    }
                                    alt={`${item.media_type === 'movie' ? item.title : item.name} ${
                                        item.media_type === 'movie' ? 'movie' : 'tv show'
                                    } poster`}
                                    width={768}
                                    height={1098}
                                    className="max-w-[266px] max-h-[1098px] rounded-xl rounded-tr-none rounded-br-none"
                                />
                            </a>
                        </div>

                        <div className="hidden sm:flex xs:flex xxs:flex">
                            <a href={`/projects/movie-and-tv-show-search-web-app/${item.media_type}/${item.id}`}>
                                <Image
                                    src={
                                        item.backdrop_path === ''
                                            ? '/images/png/fallback.png'
                                            : `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                                    }
                                    alt={`${item.media_type === 'movie' ? item.title : item.name} ${
                                        item.media_type === 'movie' ? 'movie' : 'tv show'
                                    } poster`}
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
                                                <UserScore value={item.vote_average} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="bg-black">
                                            <p>User Score</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex flex-col w-full">
                                    <a href={`/projects/movie-and-tv-show-search-web-app/${item.media_type}/${item.id}`}>
                                        <h1 className="text-2xl sm:text-xl xs:text-base xxs:text-base font-semibold line-clamp-1">
                                            {item.media_type === 'movie' ? item.title : item.name}
                                        </h1>
                                    </a>
                                    <p className="text-sm xs:text-xs xxs:text-xs line-clamp-1">
                                        {formatDate(item.media_type === 'movie' ? (item.release_date as string) : (item.first_air_date as string), {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full gap-y-2">
                                <h2 className="text-lg sm:text-base xs:text-base xxs:text-base font-medium">Overview</h2>
                                <p className="text-sm xl:line-clamp-[14] lg:line-clamp-[14] md:line-clamp-[14]">{item.overview}</p>
                            </div>
                        </div>
                    </div>
                ),
            }}
            index={index}
        />
    ));

    return <Carousel items={cards} />;
}
