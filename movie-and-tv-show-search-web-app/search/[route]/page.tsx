import { Suspense } from 'react';
import Results from './components/results/Results';
import Loading from '@/components/Loading';

type SearchResultsPageProps = {
    params: Promise<{
        route: string;
    }>;
    searchParams: Promise<{
        q: string;
        page: string;
    }>;
};

export default async function SearchResultsPage({ params, searchParams }: SearchResultsPageProps) {
    const { route } = await params;
    const { q, page } = await searchParams;

    return (
        <Suspense key={q} fallback={<Loading />}>
            <Results route={route} q={q} page={page} />
        </Suspense>
    );
}
