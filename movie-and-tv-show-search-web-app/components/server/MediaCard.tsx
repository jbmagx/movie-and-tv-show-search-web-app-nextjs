import Image from 'next/image';
import UserScore from '@/app/projects/movie-and-tv-show-search-web-app/components/client/UserScore';
import { Card } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/HomeCardsCarousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';

type MediaCardProps = {
    item: Movie | TVShow;
    index: number;
};

export default function MediaCard({ item, index }: MediaCardProps) {
    const src = item.poster_path === '' ? '/images/png/fallback.png' : `https://image.tmdb.org/t/p/original${item.poster_path}`;

    const title = item.media_type === 'movie' ? item.title : item.media_type === 'tv' ? item.original_name : (item as Movie).title || (item as TVShow).original_name;

    const date = formatDate(
        item.media_type === 'movie' ? item.release_date : item.media_type === 'tv' ? item.first_air_date : (item as Movie).release_date || (item as TVShow).first_air_date,
        {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }
    );

    return (
        <Card
            key={item.id}
            card={{
                src: src,
                title: title,
                date: date,
                content: <CardContent item={item} />,
            }}
            index={index}
        />
    );
}

function CardContent({ item }: { item: Movie | TVShow }) {
    const title = item.media_type === 'movie' ? item.title : item.media_type === 'tv' ? item.original_name : (item as Movie).title || (item as TVShow).original_name;

    const date = formatDate(
        item.media_type === 'movie' ? item.release_date : item.media_type === 'tv' ? item.first_air_date : (item as Movie).release_date || (item as TVShow).first_air_date,
        {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }
    );

    return (
        <div
            className="max-w-4xl rounded-2xl w-full relative z-[1] mt-2.5 mb-10"
            style={{
                background: 'linear-gradient(to bottom right, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.84))',
                borderColor: 'var(--primary)',
                backgroundPosition: 'center',
                backgroundImage: `url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
                backgroundSize: 'cover',
                backgroundClip: 'padding-box',
                objectFit: 'cover',
            }}
        >
            <div
                className="flex flex-wrap justify-center bg-gradient-to-r rounded-2xl"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)',
                }}
            >
                <div className="flex flex-col md:flex-row items-center md:items-start w-full p-6 md:p-8 gap-y-5 md:gap-x-8">
                    <div className="relative w-35 h-52.5 xs:w-40 xs:h-60 sm:w-44 sm:h-66 md:w-56 md:h-80">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                            alt={`${title} poster`}
                            style={{ objectFit: 'cover' }}
                            fill={true}
                            priority={true}
                            sizes="33vw"
                            className="rounded-xl"
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-[calc(100%-14rem-2rem)] gap-y-4">
                        <div className="flex flex-col w-full gap-y-1.5">
                            <h1 className="font-semibold text-white text-sm xs:text-base md:text-lg line-clamp-3">{title}</h1>

                            <div className="flex flex-wrap items-center gap-1.5 -mt-1">
                                <p className="text-white text-xs">{date}</p>
                            </div>
                        </div>

                        <div>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button className="cursor-default">
                                            <UserScore value={item.vote_average} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-black">
                                        <p>User Score</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex flex-col w-full gap-y-1">
                            <h2 className="font-medium text-white text-sm xs:text-base">Overview</h2>
                            <p className="text-white text-xs xs:text-sm line-clamp-6">{item.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
