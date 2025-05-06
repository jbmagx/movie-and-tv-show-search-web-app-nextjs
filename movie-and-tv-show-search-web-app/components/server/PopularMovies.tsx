import { Carousel } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/HomeCardsCarousel';
import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import MediaCard from '@/app/projects/movie-and-tv-show-search-web-app/components/server/MediaCard';

export default async function PopularMovies() {
    const popularMoviesData: Promise<TMDBResponse> = fetchTMDB(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=1',
        {
            next: { revalidate: 3600 },
        }
    );

    const popularMovies = await popularMoviesData;

    const cards = popularMovies.results.map((item, index) => <MediaCard item={item} index={index} />);

    return (
        <div className="flex flex-col w-full">
            <h2 className="font-semibold text-xl">Popular Movies</h2>
            <Carousel items={cards} />
        </div>
    );
}
