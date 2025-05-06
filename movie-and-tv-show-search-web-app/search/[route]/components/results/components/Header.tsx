type HeaderProps = {
    page: number;
    totalResults: number;
    totalPages: number;
};

export default function Header({ page, totalResults, totalPages }: HeaderProps) {
    return (
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <p>
                Total result{totalResults === 1 ? '' : 's'} {totalResults}
            </p>
            <p>
                Page {page} of {totalPages}
            </p>
        </div>
    );
}
