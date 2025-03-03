import Trending from './components/Trending';
import PopularMovies from './components/PopularMovies';
import PopularTVShows from './components/PopularTVShows';

export default function MovieAndTVShowSearchWebApp() {
    return (
        <>
            <Trending />
            <PopularMovies />
            <PopularTVShows />
        </>
    );
}
