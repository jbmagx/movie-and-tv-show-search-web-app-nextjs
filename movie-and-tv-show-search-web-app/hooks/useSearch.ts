import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSessionStorage from '@/hooks/useSessionStorage';

export default function useSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchKeywords, setSearchKeywords] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [route, setRoute] = useSessionStorage<'movie' | 'tv'>('tmdbRoute', 'movie');

    useEffect(() => {
        const query = searchParams.get('q');
        setSearchKeywords(query ?? '');
        setIsSearching(false);
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSearching(true);

        router.push(searchKeywords === '' ? '/projects/movie-and-tv-show-search-web-app' : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${searchKeywords}&page=1`);
    };

    return {
        route,
        setRoute,
        searchKeywords,
        setSearchKeywords,
        handleSubmit,
        isSearching,
    };
}
