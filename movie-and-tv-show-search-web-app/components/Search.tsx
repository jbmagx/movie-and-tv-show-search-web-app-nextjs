'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [route, setRoute] = useState<string>('movie');
    const [searchKeywords, setSearchKeywords] = useState<string>('');

    useEffect(() => {
        const currentUrl = window.location.href;

        if (/\/projects\/movie-and-tv-show-search-web-app\/search\/(movie|tv)\?q=/.test(currentUrl)) {
            const query = searchParams.get('q');
            setSearchKeywords(query as string);
        }
    }, [searchParams]);

    useEffect(() => {
        const tmdbRoute = sessionStorage.getItem('tmdbRoute');
        if (tmdbRoute) {
            setRoute(tmdbRoute);
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(
            searchKeywords === ''
                ? '/projects/movie-and-tv-show-search-web-app'
                : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${searchKeywords}&page=1`
        );
    };

    return (
        <div className="flex rounded-lg shadow-sm shadow-black/5">
            <form onSubmit={handleSubmit} className="w-full">
                <Input
                    className="text-sm border-2 h-10 rounded-lg focus-visible:border-zinc-600 focus-visible:ring-0 rounded-tr-none rounded-br-none"
                    placeholder={`Search for a ${route === 'movie' ? 'movie' : 'tv show'}...`}
                    type="text"
                    value={searchKeywords}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeywords(e.target.value)}
                />
                <button type="submit" className="hidden" />
            </form>

            <div className="relative inline-flex">
                <Select
                    value={route}
                    onValueChange={(value) => {
                        sessionStorage.setItem('tmdbRoute', value);
                        setRoute(value);
                    }}
                >
                    <SelectTrigger className="font-medium text-muted-foreground rounded-tl-none rounded-bl-none h-10 border-2 border-l-0 hover:opacity-70 duration-300 focus:outline-none focus:ring-0 w-[5.75rem]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        position="popper"
                        className="w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]"
                    >
                        <SelectItem value="movie" className="font-medium">
                            movie
                        </SelectItem>
                        <SelectItem value="tv" className="font-medium">
                            tv
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
