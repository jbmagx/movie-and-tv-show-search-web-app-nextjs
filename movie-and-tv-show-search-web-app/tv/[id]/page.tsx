import searchTMDB from '../../lib/searchTMDB';
import Image from 'next/image';
import UserScore from '../../components/UserScore';
import BackButton from '../../components/BackButton';
import { formatDate } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, Card } from '../../components/CreditsCardsCarousel';

import type { Metadata } from 'next';

type TVProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: TVProps): Promise<Metadata> {
    const { id } = await params;

    const tvShowDetailsData = searchTMDB(`https://api.themoviedb.org/3/tv/${id}`);

    const tvShowDetails: TVShowDetails = await tvShowDetailsData;

    return {
        title: `${tvShowDetails.name} - jbmagx | Movie and TV Show Search Web App`,
        description: tvShowDetails.overview,
    };
}

export default async function TV({ params }: TVProps) {
    const { id } = await params;

    const tvShowDetailsData = searchTMDB(`https://api.themoviedb.org/3/tv/${id}`);
    const tvShowCreditsData = searchTMDB(`https://api.themoviedb.org/3/tv/${id}/credits`);

    const [tvShowDetails, tvShowCredits]: [TVShowDetails, TVShowCredits] = await Promise.all([tvShowDetailsData, tvShowCreditsData]);

    const castCards = tvShowCredits.cast.map((cast: TVShowCastMember) => (
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

    const crewCards = tvShowCredits.crew.map((crew: TVShowCrewMember) => (
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
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path}')`,
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
                            src={`https://image.tmdb.org/t/p/original${tvShowDetails.poster_path}`}
                            alt={`${tvShowDetails.name} poster`}
                            width={300}
                            height={450}
                            style={{ width: '300px', height: '450px' }}
                            className="object-cover rounded-xl"
                        />

                        <div className="flex flex-col w-full gap-y-4">
                            <div className="flex flex-col w-full">
                                <h1 className="text-white text-lg font-semibold">{tvShowDetails.name}</h1>

                                <div className="flex flex-wrap items-center gap-1.5 -mt-1">
                                    <p className="text-white text-xs">
                                        {formatDate(tvShowDetails.first_air_date, { year: 'numeric', month: 'long', day: '2-digit' })}
                                    </p>

                                    <span className="text-white">•</span>

                                    <p className="text-white text-xs">
                                        {tvShowDetails.seasons.length} season{tvShowDetails.seasons.length === 1 ? '' : 's'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-1">
                                    {tvShowDetails.genres.map((genre) => (
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
                                                <UserScore value={tvShowDetails.vote_average} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-black">
                                            <p>User Score</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <div className="flex flex-col w-full gap-y-2">
                                {tvShowDetails.tagline && <p className="text-white/80 italic text-sm">{tvShowDetails.tagline}</p>}
                                <div className="flex flex-col w-full gap-y-1">
                                    <h2 className="text-white font-medium">Overview</h2>
                                    <p className="text-white text-sm">{tvShowDetails.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {tvShowCredits.cast.length > 0 && (
                <div className="flex flex-col w-full">
                    <h1 className="text-xl font-semibold">
                        Cast{' '}
                        <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">
                            {tvShowCredits.cast.length}
                        </span>
                    </h1>
                    <Carousel items={castCards} />
                </div>
            )}

            {tvShowCredits.crew.length > 0 && (
                <div className="flex flex-col w-full">
                    <h1 className="text-xl font-semibold">
                        Crew{' '}
                        <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">
                            {tvShowCredits.crew.length}
                        </span>
                    </h1>
                    <Carousel items={crewCards} />
                </div>
            )}
        </div>
    );
}
