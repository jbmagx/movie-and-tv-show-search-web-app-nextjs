import { Carousel } from '@/app/projects/movie-and-tv-show-search-web-app/components/client/HomeCardsCarousel';
import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import MediaCard from '@/app/projects/movie-and-tv-show-search-web-app/components/server/MediaCard';

export default async function TrendingToday() {
    const trendingTodayData: Promise<TMDBResponse> = fetchTMDB('https://api.themoviedb.org/3/trending/all/day', {
        next: { revalidate: 3600 },
    });

    const trendingToday = (await trendingTodayData).results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');

    const cards = trendingToday.map((item, index) => <MediaCard item={item} index={index} />);

    return <Carousel items={cards} />;
}
