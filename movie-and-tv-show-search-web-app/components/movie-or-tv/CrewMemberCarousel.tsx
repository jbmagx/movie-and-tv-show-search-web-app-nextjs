import { Carousel, Card } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/CreditsCardsCarousel';

type CrewMemberCarouselProps = {
    crew: MovieCrewMember[] | TVShowCrewMember[];
};

export default function CrewMemberCarousel({ crew }: CrewMemberCarouselProps) {
    const crewCards = crew.map((crew) => {
        const src = crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : '/images/png/fallback.png';

        return (
            <Card
                key={crew.id}
                card={{
                    src: src,
                    name: crew.name,
                    character: crew.job,
                }}
            />
        );
    });

    return (
        crew.length > 0 && (
            <div className="flex flex-col w-full">
                <h1 className="text-xl font-semibold">
                    Crew <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">{crew.length}</span>
                </h1>

                <Carousel items={crewCards} />
            </div>
        )
    );
}
