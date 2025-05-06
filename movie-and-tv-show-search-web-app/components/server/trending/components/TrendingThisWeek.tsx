import { Carousel } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/HomeCardsCarousel';
import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import MediaCard from '@/app/projects/movie-and-tv-show-search-web-app/components/server/MediaCard';

export default async function TrendingThisWeek() {
    const trendingThisWeekData: Promise<TMDBResponse> = fetchTMDB('https://api.themoviedb.org/3/trending/all/week', {
        next: { revalidate: 3600 },
    });

    const trendingThisWeek = (await trendingThisWeekData).results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');

    const cards = trendingThisWeek.map((item, index) => <MediaCard item={item} index={index} />);

    return <Carousel items={cards} />;
}
