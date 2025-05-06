import { fetchTMDB } from '@/app/projects/movie-and-tv-show-search-web-app/lib/fetchTMDB';
import Header from './components/Header';
import Card from './components/Card';
import PaginationComponent from '@/app/projects/movie-and-tv-show-search-web-app/components/client/PaginationComponent';
import '@/app/projects/movie-and-tv-show-search-web-app/styles/styles.css';

type ResultsProps = {
    route: string;
    q: string;
    page: string;
};

export default async function Results({ route, q, page: searchParamsPage }: ResultsProps) {
    const url = `https://api.themoviedb.org/3/search/${route}?&query=${q}&page=${searchParamsPage}`;
    const searchResultsData: Promise<TMDBResponse> = fetchTMDB(url);
    const { page, total_results, total_pages, results } = await searchResultsData;

    return (
        <div className="flex flex-col w-full">
            <Header page={page} totalResults={total_results} totalPages={total_pages} />

            <div className="flex flex-wrap items-center w-full gap-4 mt-4 mb-8">
                {total_results > 0 ? (
                    results.map((item: Movie | TVShow) => <Card key={item.id} route={route} item={item} />)
                ) : (
                    <p className="w-full my-8 text-center text-muted-foreground">There are no {route === 'movie' ? 'movies' : 'tv shows'} that matched your query.</p>
                )}
            </div>

            <PaginationComponent currentPage={page} totalPages={total_pages} route={route} query={q} />
        </div>
    );
}
