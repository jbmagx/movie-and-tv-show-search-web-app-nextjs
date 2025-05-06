import Trending from './components/server/trending/Trending';
import PopularMovies from './components/server/PopularMovies';
import PopularTVShows from './components/server/PopularTVShows';

export default function MovieAndTVShowSearchWebApp() {
    return (
        <>
            <Trending />

            {/* Spacer */}
            <div className="py-2 md:py-2.5" />

            <PopularMovies />

            {/* Spacer */}
            <div className="py-2 md:py-2.5" />

            <PopularTVShows />
        </>
    );
}
