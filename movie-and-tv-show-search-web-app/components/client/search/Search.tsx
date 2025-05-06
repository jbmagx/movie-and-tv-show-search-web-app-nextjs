'use client';

import SearchFormInput from './components/SearchFormInput';
import MovieOrTVSelect from './components/MovieOrTVSelect';
import useSearch from '@/app/projects/movie-and-tv-show-search-web-app/hooks/useSearch';
import { Skeleton } from '@/components/ui/skeleton';

export default function Search() {
    const { route, setRoute, searchKeywords, setSearchKeywords, handleSubmit, isSearching } = useSearch();

    if (!route) return <Skeleton className="h-10 w-full rounded-lg" />;

    return (
        <div className="flex w-full rounded-lg">
            <SearchFormInput
                onSubmit={handleSubmit}
                route={route}
                inputValue={searchKeywords}
                onInputValueChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeywords(e.target.value)}
                isSearching={isSearching}
            />

            <div className="relative inline-flex">
                <MovieOrTVSelect value={route} onValueChange={(value: 'movie' | 'tv') => setRoute(value)} />
            </div>
        </div>
    );
}
