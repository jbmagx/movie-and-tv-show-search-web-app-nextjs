import searchTMDB from '../../lib/searchTMDB';
import Image from 'next/image';
import UserScore from '../../components/UserScore';
import BackButton from '../../components/BackButton';
import { formatDate } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { convertRuntime } from '../../lib/convertRuntime';
import { Carousel, Card } from '../../components/CreditsCardsCarousel';

import type { Metadata } from 'next';

type MovieProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: MovieProps): Promise<Metadata> {
    const { id } = await params;

    const movieDetailsData = searchTMDB(`https://api.themoviedb.org/3/movie/${id}`);

    const movieDetails: MovieDetails = await movieDetailsData;

    return {
        title: `${movieDetails.title} - jbmagx | Movie and TV Show Search Web App`,
        description: movieDetails.overview,
    };
}

export default async function Movie({ params }: MovieProps) {
    const { id } = await params;

    const movieDetailsData = searchTMDB(`https://api.themoviedb.org/3/movie/${id}`);
    const movieCreditsData = searchTMDB(`https://api.themoviedb.org/3/movie/${id}/credits`);

    const [movieDetails, movieCredits]: [MovieDetails, MovieCredits] = await Promise.all([movieDetailsData, movieCreditsData]);

    const castCards = movieCredits.cast.map((cast: MovieCastMember) => (
        <Card
            key={cast.id}
            card={{
                src: cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : '/images/png/fallback.png',
                name: cast.name,
                character: cast.character,
                content: <></>,
            }}
        />
    ));

    const crewCards = movieCredits.crew.map((crew: MovieCrewMember) => (
        <Card
            key={crew.id}
            card={{
                src: crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : '/images/png/fallback.png',
                name: crew.name,
                character: crew.job,
                content: <></>,
            }}
        />
    ));

    return (
        <div className="flex flex-col w-full mt-8 gap-y-4">
            <BackButton />

            <div
                className="max-w-5xl w-full relative z-[1] mt-2.5 mb-10"
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
                    <div className="flex w-full p-8 gap-x-8">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                            alt={`${movieDetails.title} poster`}
                            width={300}
                            height={450}
                            style={{ width: '300px', height: '450px' }}
                            className="object-cover rounded-xl"
                        />

                        <div className="flex flex-col w-full gap-y-4">
                            <div className="flex flex-col w-full">
                                <h1 className="text-white text-lg font-semibold">{movieDetails.title}</h1>

                                <div className="flex flex-wrap items-center gap-1.5 -mt-1">
                                    <p className="text-white text-xs">
                                        {formatDate(movieDetails.release_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                    </p>

                                    <span className="text-white">•</span>

                                    <p className="text-white text-xs">
                                        {convertRuntime(movieDetails.runtime).hours}h {convertRuntime(movieDetails.runtime).remainingMinutes}m
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-1">
                                    {movieDetails.genres.map((genre) => (
                                        <span key={genre.id} className="bg-white text-black text-xs px-1 rounded-sm">
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
                                {movieDetails.tagline && <p className="text-white/80 italic text-sm">{movieDetails.tagline}</p>}
                                <div className="flex flex-col w-full gap-y-1">
                                    <h2 className="text-white font-medium">Overview</h2>
                                    <p className="text-white text-sm">{movieDetails.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {movieCredits.cast.length > 0 && (
                <div className="flex flex-col w-full">
                    <h1 className="text-xl font-semibold">
                        Cast{' '}
                        <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">
                            {movieCredits.cast.length}
                        </span>
                    </h1>
                    <Carousel items={castCards} />
                </div>
            )}

            {movieCredits.crew.length > 0 && (
                <div className="flex flex-col w-full">
                    <h1 className="text-xl font-semibold">
                        Crew{' '}
                        <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">
                            {movieCredits.crew.length}
                        </span>
                    </h1>
                    <Carousel items={crewCards} />
                </div>
            )}
        </div>
    );
}
