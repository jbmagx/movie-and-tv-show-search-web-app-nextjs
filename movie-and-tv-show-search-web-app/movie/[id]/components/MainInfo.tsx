import Image from 'next/image';
import UserScore from '@/app/projects/movie-and-tv-show-search-web-app/components/client/UserScore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';
import { convertRuntime } from '@/app/projects/movie-and-tv-show-search-web-app/lib/convertRuntime';

type MainInfoProps = {
    movieDetails: MovieDetails;
};

export default function MainInfo({ movieDetails }: MainInfoProps) {
    return (
        <div
            className="max-w-5xl w-full relative z-[1]"
            style={{
                background: 'linear-gradient(to bottom right, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.84))',
                borderColor: 'var(--primary)',
                backgroundPosition: 'center',
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
                backgroundSize: 'cover',
                backgroundClip: 'padding-box',
                objectFit: 'cover',
            }}
        >
            <div
                className="flex flex-wrap justify-center bg-gradient-to-r"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)',
                }}
            >
                <div className="flex flex-col md:flex-row items-center md:items-start w-full p-6 sm:p-7 md:p-8 gap-y-4 gap-x-8">
                    <div className="relative w-30 h-45 xs:w-36 xs:h-54 sm:w-40 sm:h-60 md:w-66.5 md:h-100">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                            alt={`${movieDetails.title} poster`}
                            fill={true}
                            priority={true}
                            sizes="33vw"
                            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-[calc(100%-17.5rem-1.25rem)] gap-y-4">
                        <div className="flex flex-col w-full">
                            <h1 className="font-semibold text-base sm:text-lg text-white">{movieDetails.title}</h1>

                            <div className="flex flex-wrap items-center gap-1.5 -mt-1">
                                <p className="text-white text-xs">{formatDate(movieDetails.release_date, { year: 'numeric', month: 'long', day: '2-digit' })}</p>

                                <span className="text-white">•</span>

                                <p className="text-white text-xs">
                                    {convertRuntime(movieDetails.runtime).hours}h {convertRuntime(movieDetails.runtime).remainingMinutes}m
                                </p>
                            </div>

                            <div className="flex items-center gap-x-1 overflow-x-scroll no-scrollbar">
                                {movieDetails.genres.map((genre) => (
                                    <span key={genre.id} className="bg-white text-black text-xs px-1.5 rounded-full text-nowrap">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex">
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <button className="cursor-default">
                                            <UserScore value={movieDetails.vote_average} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-black">
                                        <p>User Score</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex flex-col w-full gap-y-2">
                            {movieDetails.tagline && <p className="text-white/80 italic text-xs sm:text-sm">{movieDetails.tagline}</p>}
                            <div className="flex flex-col w-full gap-y-1">
                                <h2 className="font-semibold text-white text-sm md:text-base">Overview</h2>
                                <p className="text-white text-xs sm:text-sm md:line-clamp-[9]">{movieDetails.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
