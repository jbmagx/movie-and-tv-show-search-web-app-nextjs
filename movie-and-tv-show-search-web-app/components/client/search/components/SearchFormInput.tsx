import { ChangeEvent, FormEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon, SearchIcon } from 'lucide-react';

type SearchFormInputProps = {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    route: string;
    inputValue: string;
    onInputValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isSearching: boolean;
};

export default function SearchFormInput({ onSubmit, route, inputValue, onInputValueChange, isSearching }: SearchFormInputProps) {
    return (
        <form onSubmit={onSubmit} className="relative w-full">
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                {isSearching ? <LoaderCircleIcon className="animate-spin" size={17} role="status" aria-label="Loading..." /> : <SearchIcon size={17} aria-hidden="true" />}
            </div>

            <Input
                id="movie-and-tv-show-search-web-app-input"
                className="ps-9 text-sm border-2 h-10 rounded-[0.625rem] focus-visible:border-zinc-600 focus-visible:ring-0 hover:border-zinc-400 transition-all duration-200 rounded-e-none shadow-none"
                placeholder={`Search for a ${route === 'movie' ? 'movie' : 'tv show'}...`}
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={inputValue}
                onChange={onInputValueChange}
            />
            <button type="submit" className="hidden" />
        </form>
    );
}
