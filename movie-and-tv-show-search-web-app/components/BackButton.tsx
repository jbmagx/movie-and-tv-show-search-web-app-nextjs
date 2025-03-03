'use client';

import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back(); // Go back to the previous page
        } else {
            window.location.href = '/projects/movie-and-tv-show-search-web-app'; // Fallback to the home page or any other default route
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <button
                onClick={handleGoBack}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black h-8 w-8 rounded-md"
            >
                <ArrowLeft />
            </button>
            <span className="text-sm">Back</span>
        </div>
    );
}
