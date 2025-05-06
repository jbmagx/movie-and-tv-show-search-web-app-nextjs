import type { Metadata } from 'next';
import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import BackButton from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/BackButton';
import MainInfo from './components/MainInfo';
import CastMemberCarousel from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/CastMemberCarousel';
import CrewMemberCarousel from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/CrewMemberCarousel';

type MovieProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: MovieProps): Promise<Metadata> {
    const { id } = await params;
    const movieDetailsData: Promise<MovieDetails> = fetchTMDB(`https://api.themoviedb.org/3/movie/${id}`);
    const movieDetails = await movieDetailsData;

    return {
        title: `${movieDetails.title} - jbmagx | Movie and TV Show Search Web App`,
        description: movieDetails.overview,
    };
}

export default async function Movie({ params }: MovieProps) {
    const { id } = await params;
    const movieDetailsData: Promise<MovieDetails> = fetchTMDB(`https://api.themoviedb.org/3/movie/${id}`);
    const movieCreditsData: Promise<MovieCredits> = fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/credits`);

    const [movieDetails, movieCredits] = await Promise.all([movieDetailsData, movieCreditsData]);

    return (
        <div className="flex flex-col w-full">
            <BackButton />

            {/* Spacer */}
            <div className="py-2.5 md:py-3" />

            <MainInfo movieDetails={movieDetails} />

            {/* Spacer */}
            <div className="py-3 md:py-4" />

            <CastMemberCarousel cast={movieCredits.cast} />
            <CrewMemberCarousel crew={movieCredits.crew} />
        </div>
    );
}
