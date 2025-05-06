'use client';

import { Button } from '@/components/custom/Button';
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
            <Button isIconOnly size="sm" radius="sm" onClick={handleGoBack}>
                <ArrowLeft />
            </Button>
            <span className="font-medium text-sm">Back</span>
        </div>
    );
}
