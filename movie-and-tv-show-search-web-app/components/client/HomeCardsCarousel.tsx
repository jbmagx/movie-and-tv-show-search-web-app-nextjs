'use client';

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import Image, { ImageProps } from 'next/image';

interface CarouselProps {
    items: React.JSX.Element[];
    initialScroll?: number;
}

type Card = {
    src: string;
    title: string;
    date: string;
    content: React.ReactNode;
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
            carouselRef.current.scrollBy({ left: -240, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = 232; // card width size + cards gap divided by 2 (224px + (gap-4 or 16px divided by 2))
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

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose } = useContext(CarouselContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = useCallback(() => {
        setOpen(false);
        onCardClose(index);
    }, [index, onCardClose]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, handleClose]);

    useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => handleClose());

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 h-screen z-50 overflow-auto px-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${card.title}` : undefined}
                            className="max-w-4xl mx-auto bg-transparent h-fit z-[60] my-28 rounded-2xl font-sans relative"
                        >
                            <button
                                className="absolute top-4 right-4 z-50 h-8 w-8 ml-auto bg-black dark:bg-white hover:opacity-80 hover:[&>svg]:opacity-80 duration-300 rounded-full flex items-center justify-center"
                                onClick={handleClose}
                            >
                                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                            </button>
                            <>{card.content}</>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.button
                layoutId={layout ? `card-${card.title}` : undefined}
                onClick={handleOpen}
                className="rounded-xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 overflow-hidden flex flex-col items-start justify-start relative z-10"
            >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                <div className="relative z-40 py-4 px-6">
                    <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className="line-clamp-1 text-white text-lg font-semibold max-w-xs text-left [text-wrap:balance] font-sans"
                    >
                        {card.title}
                    </motion.p>
                    <motion.p layoutId={layout ? `category-${card.date}` : undefined} className="line-clamp-1 text-white text-xs font-medium font-sans text-left">
                        {card.date}
                    </motion.p>
                </div>
                <BlurImage src={card.src} alt={card.title} fill className="object-cover absolute z-10 inset-0" />
            </motion.button>
        </>
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
            priority={true}
            // loading="lazy"
            decoding="async"
            blurDataURL={typeof src === 'string' ? src : undefined}
            alt={alt ? alt : 'Background of a beautiful view'}
            sizes="(max-width: 224px) 100vw, 50vw"
            {...rest}
        />
    );
};
