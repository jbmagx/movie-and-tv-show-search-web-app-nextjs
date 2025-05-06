import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCredits() {
    return (
        <div className="flex flex-wrap max-w-155.5 xs:max-w-119 md:max-w-155.5 p-5 border-2 border-dotted rounded-sm">
            <div className="w-full mb-3 sm:mb-2.5 font-semibold text-sm sm:text-[0.9rem]">Credits to:</div>
            <div className="flex flex-wrap justify-center w-full md:w-fit mb-3.5 md:mb-0">
                <Link href="https://www.themoviedb.org" target="_blank" className="relative w-16 h-16">
                    <Image src="/images/svg/TMDB-logo.svg" alt="TMDB logo" fill sizes="33vw" />
                </Link>
            </div>
            <div className="w-full md:w-[calc(100%-4rem-1rem)] ml-0 md:ml-4 -tracking-[0.015625rem] text-sm sm:text-[0.9rem] text-justify sm:text-left">
                All data and images are supplied by The Movie Database (TMDB). This project or application uses the TMDB API but is not endorsed or certified by TMDB.
            </div>
        </div>
    );
}
