import type { Metadata } from 'next';
import { techStack } from './constants/tech-stack';
import Header from '@/components/header/Header';
import ProjectTitle from './components/server/ProjectTitle';
import Search from './components/client/search/Search';
import ProjectCredits from './components/server/ProjectCredits';
import ProjectTechStack from '@/components/ProjectTechStack';
import GitHubProjectRepositoryLink from '@/components/GitHubProjectRepositoryLink';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
    title: 'jbmagx | Movie and TV Show Search Web App',
    icons: {
        icon: '/images/svg/tmdb.svg',
    },
    description: 'Movie and TV Show Search Web App',
};

export default function MovieAndTVShowSearchWebAppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            <div className="flex flex-col w-full min-h-[100svh] sm:min-h-[100dvh] py-10 xs:py-12 sm:py-14 md:py-20 px-6">
                <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                    <ProjectTitle />

                    {/* Spacer */}
                    <div className="py-2.5" />

                    <Search />

                    {/* Spacer */}
                    <div className="py-4 md:py-5" />

                    {children}

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <ProjectCredits />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <ProjectTechStack techStack={techStack} />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <GitHubProjectRepositoryLink link="https://github.com/jbmagx/movie-and-tv-show-search-web-app-nextjs" />
                </div>
            </div>

            <Footer />
        </>
    );
}
