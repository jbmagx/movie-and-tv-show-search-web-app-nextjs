import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Search from './components/Search';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
    title: 'jbmagx | Movie and TV Show Search Web App',
    icons: {
        icon: '/images/svg/jbmagx-icon.svg',
    },
    description: 'Movie and TV Show Search Web App',
};

export default function MovieAndTVShowSearchWebAppLayout({ children }: { children: React.ReactNode }) {
    const techStack = [
        { name: 'Next.js', link: 'https://nextjs.org/', color: 'bg-black text-white' },
        { name: 'React', link: 'https://react.dev/', color: 'bg-primary text-white' },
        { name: 'TMDB API', link: 'https://developer.themoviedb.org/reference/intro/getting-started', color: 'bg-[#01b4e4] text-white' },
        { name: 'AceternityUI', link: 'https://ui.aceternity.com/', color: 'bg-purple-600 text-white' },
        { name: 'ShadcnUI', link: 'https://ui.shadcn.com/', color: 'bg-black text-white' },
        { name: 'Tailwind CSS', link: 'https://tailwindcss.com/', color: 'bg-green-600 text-white' },
    ];

    return (
        <>
            <Header />

            <div className="flex flex-col w-full min-h-[100dvh] xs:min-h-[100svh] xxs:min-h-[100svh] px-6">
                <div className="flex flex-col w-full max-w-5xl mx-auto py-16">
                    <a href={'/projects/movie-and-tv-show-search-web-app'} className="flex xs:flex-wrap xxs:flex-wrap items-center justify-center gap-x-4 mb-5 w-full">
                        <span className="relative w-12 h-8 xs:hidden xxs:hidden">
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
                        <span className="font-semibold text-xl text-center tracking-[-0.25px] xs:w-full xxs:w-full">Movie and TV Show Search Web App</span>
                    </a>

                    <Search />

                    {children}

                    <div className="flex w-full justify-center my-10">
                        <div className="flex flex-wrap max-w-[622px] sm:max-w-[476px] xs:max-w-[476px] p-5 border-2 border-dotted rounded-small sm:mb-14 xs:mb-12 xxs:mb-10">
                            <div className="w-full mb-2.5 xs:mb-3 text-[0.9rem] xs:text-small xxs:text-small font-semibold">Credits to:</div>
                            <div className="flex flex-wrap justify-center sm:w-full xs:w-full xxs:w-full sm:mb-3.5 xs:mb-3.5 xxs:mb-3.5">
                                <Link href="https://www.themoviedb.org" target="_blank" className="w-16 h-16 aspect-[32/23]">
                                    <Image src="/images/svg/TMDB-logo.svg" alt="TMDB logo" width={64} height={64} />
                                </Link>
                            </div>
                            <div className="w-[calc(100%-64px-16px)] sm:w-full xs:w-full xxs:w-full ml-4 sm:ml-0 xs:ml-0 xxs:ml-0 tracking-[-0.25px] text-[0.9rem] xs:text-small xs:text-justify xxs:text-small xxs:text-justify">
                                All data and images are supplied by The Movie Database (TMDB). This project or application uses the TMDB API but is not endorsed or certified by
                                TMDB.
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap align-center justify-center gap-2 xs:max-w-[276px] mb-10 mx-auto">
                        <div className="self-center font-semibold uppercase text-sm tracking-tight">Tech Stack:</div>
                        <div className="flex flex-wrap align-center justify-center gap-2">
                            {techStack.map((tech, index) => (
                                <Link
                                    key={index}
                                    href={tech.link}
                                    target="_blank"
                                    className={`${tech.color} flex items-center justify-center font-semibold text-xs rounded-sm px-1.5`}
                                >
                                    {tech.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center">
                        <Link
                            href="https://github.com/jbmagx/movie-and-tv-show-search-web-app-nextjs"
                            target="_blank"
                            className="flex items-center justify-center gap-x-2 px-8 h-12 rounded-full bg-[#0A7EA4]"
                        >
                            <span className="text-white text-sm font-semibold uppercase">Project Repository</span>
                            <Image src="/images/svg/github.svg" alt="GitHub logo" width={32} height={32} className="invert" />
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
