import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type MovieOrTVSelectProps = {
    value: string;
    onValueChange?: (value: 'movie' | 'tv') => void;
};

export default function MovieOrTVSelect({ value, onValueChange }: MovieOrTVSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="font-medium text-muted-foreground rounded-[0.625rem] rounded-s-none data-[size=default]:h-10 border-2 border-l-0 hover:opacity-70 duration-300 focus:outline-none focus:ring-0 w-23 shadow-none">
                <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" position="popper" className="w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]">
                <SelectItem value="movie" className="font-medium">
                    movie
                </SelectItem>
                <SelectItem value="tv" className="font-medium">
                    tv
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
