import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

type CardProps = {
    route: string;
    item: Movie | TVShow;
};

export default function Card({ route, item }: CardProps) {
    const title = route === 'movie' ? (item as Movie).title : (item as TVShow).name;
    const date = route === 'movie' ? (item as Movie).release_date : (item as TVShow).first_air_date;

    return (
        <Link
            key={item.id}
            href={`/projects/movie-and-tv-show-search-web-app/${route}/${item.id}`}
            style={{
                width: `calc((100% - ((var(--tmdbSearchColumns) - 1) * 16px)) / var(--tmdbSearchColumns))`,
                height: 'auto',
                aspectRatio: 224 / 320,
            }}
            className="duration-300 hover:opacity-80 rounded-xl bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative z-10"
        >
            <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/70 via-transparent to-transparent z-30 pointer-events-none" />

            <div className="relative z-40 py-4 px-6 xs:py-3 xs:px-4 sm:py-3.5 sm:px-4.5 lg:py-4 lg:px-6">
                <h1 className="line-clamp-2 xs:line-clamp-3 font-semibold text-base xs:text-sm xs:leading-[1.15rem] text-white max-w-xs text-left [text-wrap:balance] font-sans">
                    {title}
                </h1>
                {date && <p className="line-clamp-1 font-medium text-xs text-white font-sans text-left">{formatDate(date, { year: 'numeric', month: 'long', day: '2-digit' })}</p>}
            </div>

            <div className="absolute z-10 inset-0">
                <div className="relative w-full aspect-[224/320]">
                    <Image
                        src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/images/png/fallback.png'}
                        alt={`${title} ${route === 'movie' ? 'movie' : 'tv show'} poster`}
                        fill={true}
                        priority={true}
                        sizes="33vw"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </Link>
    );
}
