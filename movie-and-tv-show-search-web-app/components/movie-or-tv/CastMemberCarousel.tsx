import { Carousel, Card } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/CreditsCardsCarousel';

type CastMemberCarouselProps = {
    cast: MovieCastMember[] | TVShowCastMember[];
};

export default function CastMemberCarousel({ cast }: CastMemberCarouselProps) {
    const castCards = cast.map((cast) => (
        <Card
            key={cast.id}
            card={{
                src: cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : '/images/png/fallback.png',
                name: cast.name,
                character: cast.character,
            }}
        />
    ));

    return (
        cast.length > 0 && (
            <div className="flex flex-col w-full">
                <h1 className="text-xl font-semibold">
                    Cast <span className="bg-black dark:bg-white text-white dark:text-black text-lg px-2 py-1 rounded-sm">{cast.length}</span>
                </h1>

                <Carousel items={castCards} />
            </div>
        )
    );
}
