import Image from 'next/image';

export default function ProjectTitle() {
    return (
        <a href={'/projects/movie-and-tv-show-search-web-app'} className="flex flex-wrap sm:flex-nowrap items-center justify-center w-fit gap-x-4">
            <span className="relative w-12 h-8 hidden sm:inline-block">
                <Image
                    src={'/images/svg/tmdb.svg'}
                    alt="TMDB logo"
                    fill={true}
                    priority={true}
                    sizes="33vw"
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </span>
            <span className="font-semibold text-xl text-center -tracking-[0.015625rem] w-full sm:w-fit">Movie and TV Show Search Web App</span>
        </a>
    );
}
