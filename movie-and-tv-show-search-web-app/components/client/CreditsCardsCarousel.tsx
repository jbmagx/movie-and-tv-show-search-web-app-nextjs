'use client';

import React, { useEffect, useState, createContext } from 'react';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';

interface CarouselProps {
    items: React.JSX.Element[];
    initialScroll?: number;
}

type Card = {
    src: string;
    name: string;
    character: string;
};

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => {},
    currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -196, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 196, behavior: 'smooth' });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = 180; // card width size + cards gap divided by 2 (180px + (gap-4 or 16px divided by 2))
            const gap = 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <div className="relative w-full">
                <div className="flex w-full overflow-x-scroll overscroll-x-auto py-5 scroll-smooth [scrollbar-width:none]" ref={carouselRef} onScroll={checkScrollability}>
                    <div className={cn('absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l')}></div>

                    <div
                        className={cn(
                            'flex flex-row justify-start gap-4',
                            'max-w-7xl mx-auto' // remove max-w-4xl if you want the carousel to span the full width of its container
                        )}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.2 * index,
                                        ease: 'easeOut',
                                        once: true,
                                    },
                                }}
                                key={'card' + index}
                                className="rounded-3xl"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                    >
                        <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                    </button>
                    <button
                        className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                    >
                        <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};

export const Card = ({ card, layout = false }: { card: Card; layout?: boolean }) => {
    return (
        <motion.div
            layoutId={layout ? `card-${card.name}` : undefined}
            className="shadow-sm border rounded-xl bg-gray-100 dark:bg-neutral-900 h-[16.125rem] w-[11.25rem] overflow-hidden flex flex-col items-start justify-start relative z-10"
        >
            <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b to-black/50 via-transparent from-transparent z-30 pointer-events-none" />
            <div className="absolute bottom-0 z-40 p-4">
                <motion.p layoutId={layout ? `name-${card.name}` : undefined} className="text-white text-sm font-semibold max-w-xs text-left [text-wrap:balance] font-sans">
                    {card.name}
                </motion.p>
                <motion.p layoutId={layout ? `category-${card.character}` : undefined} className="text-white text-xs font-medium font-sans text-left">
                    {card.character}
                </motion.p>
            </div>
            <BlurImage src={card.src} alt={card.name} fill className="object-cover absolute z-10 inset-0" />
        </motion.div>
    );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <Image
            className={cn('transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
            onLoad={() => setLoading(false)}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === 'string' ? src : undefined}
            alt={alt ? alt : 'Background of a beautiful view'}
            sizes="(max-width: 224px) 100vw, 50vw"
            {...rest}
        />
    );
};
