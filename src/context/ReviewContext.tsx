"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Review, reviews as initialReviews } from '@/data/reviews';
import { GalleryImage, galleryImages } from '@/data/gallery';

interface ReviewContextType {
    reviews: Review[];
    galleryFromReviews: GalleryImage[];
    addReview: (review: Omit<Review, 'id' | 'date'>) => void;
    getProductReviews: (productId: string) => Review[];
    getAverageRating: (productId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [galleryFromReviews, setGalleryFromReviews] = useState<GalleryImage[]>([]);

    // Generar imágenes de galería desde reseñas
    useEffect(() => {
        const reviewImages: GalleryImage[] = reviews
            .filter(r => r.addToGallery && r.image)
            .map(r => ({
                id: `review-${r.id}`,
                src: r.image!,
                alt: `Foto de ${r.userName}`,
                category: 'clientes' as const,
                featured: false,
            }));
        setGalleryFromReviews(reviewImages);
    }, [reviews]);

    const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
        const newReview: Review = {
            ...reviewData,
            id: `r${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
        };
        setReviews(prev => [newReview, ...prev]);
    };

    const getProductReviews = (productId: string) => {
        return reviews.filter(r => r.productId === productId);
    };

    const getAverageRating = (productId: string) => {
        const productReviews = getProductReviews(productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return Math.round((sum / productReviews.length) * 10) / 10;
    };

    return (
        <ReviewContext.Provider value={{ reviews, galleryFromReviews, addReview, getProductReviews, getAverageRating }}>
            {children}
        </ReviewContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviews must be used within a ReviewProvider');
    }
    return context;
}
