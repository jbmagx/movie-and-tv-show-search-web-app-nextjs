'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    route: string;
    query: string;
};

export default function PaginationComponent({ currentPage, totalPages, route, query }: PaginationProps) {
    const router = useRouter();

    return (
        <Pagination>
            <PaginationContent>
                {/* First page button */}
                <PaginationItem>
                    <PaginationLink
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={currentPage === 1 ? undefined : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${query}&page=1`}
                        aria-label="Go to first page"
                        aria-disabled={currentPage === 1 ? true : undefined}
                        role={currentPage === 1 ? 'link' : undefined}
                    >
                        <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>

                {/* Previous page button */}
                <PaginationItem>
                    <PaginationLink
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={
                            currentPage === 1
                                ? undefined
                                : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${query}&page=${currentPage - 1}`
                        }
                        aria-label="Go to previous page"
                        aria-disabled={currentPage === 1 ? true : undefined}
                        role={currentPage === 1 ? 'link' : undefined}
                    >
                        <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>

                {/* Page number select */}
                <PaginationItem>
                    <Select
                        aria-label="Select page"
                        value={currentPage.toString()}
                        onValueChange={(value) => router.push(`/projects/movie-and-tv-show-search-web-app/search/${route}?q=${query}&page=${value}`)}
                    >
                        <SelectTrigger id="select-page" className="gap-x-2 w-fit whitespace-nowrap">
                            <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <SelectItem key={page} value={String(page)}>
                                    Page {page}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </PaginationItem>

                {/* Next page button */}
                <PaginationItem>
                    <PaginationLink
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={
                            currentPage === totalPages
                                ? undefined
                                : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${query}&page=${currentPage + 1}`
                        }
                        aria-label="Go to next page"
                        aria-disabled={currentPage === totalPages ? true : undefined}
                        role={currentPage === totalPages ? 'link' : undefined}
                    >
                        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>

                {/* Last page button */}
                <PaginationItem>
                    <PaginationLink
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        href={
                            currentPage === totalPages
                                ? undefined
                                : `/projects/movie-and-tv-show-search-web-app/search/${route}?q=${query}&page=${totalPages}`
                        }
                        aria-label="Go to last page"
                        aria-disabled={currentPage === totalPages ? true : undefined}
                        role={currentPage === totalPages ? 'link' : undefined}
                    >
                        <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
