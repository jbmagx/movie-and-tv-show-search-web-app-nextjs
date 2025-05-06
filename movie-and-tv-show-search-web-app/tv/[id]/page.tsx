import type { Metadata } from 'next';
import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import BackButton from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/BackButton';
import MainInfo from './components/MainInfo';
import CastMemberCarousel from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/CastMemberCarousel';
import CrewMemberCarousel from '@/app/projects/movie-and-tv-show-search-web-app/components/movie-or-tv/CrewMemberCarousel';

type TVProps = {
    params: Promise<{
        id: string;
    }>;
};

export async function generateMetadata({ params }: TVProps): Promise<Metadata> {
    const { id } = await params;
    const tvShowDetailsData = fetchTMDB(`https://api.themoviedb.org/3/tv/${id}`);
    const tvShowDetails: TVShowDetails = await tvShowDetailsData;

    return {
        title: `${tvShowDetails.name} - jbmagx | Movie and TV Show Search Web App`,
        description: tvShowDetails.overview,
    };
}

export default async function TV({ params }: TVProps) {
    const { id } = await params;
    const tvShowDetailsData: Promise<TVShowDetails> = fetchTMDB(`https://api.themoviedb.org/3/tv/${id}`);
    const tvShowCreditsData: Promise<TVShowCredits> = fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/credits`);

    const [tvShowDetails, tvShowCredits] = await Promise.all([tvShowDetailsData, tvShowCreditsData]);

    return (
        <div className="flex flex-col w-full">
            <BackButton />

            {/* Spacer */}
            <div className="py-2.5 md:py-3" />

            <MainInfo tvShowDetails={tvShowDetails} />

            {/* Spacer */}
            <div className="py-3 md:py-4" />

            <CastMemberCarousel cast={tvShowCredits.cast} />
            <CrewMemberCarousel crew={tvShowCredits.crew} />
        </div>
    );
}
