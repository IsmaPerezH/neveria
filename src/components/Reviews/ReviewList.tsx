"use client";

import styles from './ReviewList.module.css';
import { useReviews } from '@/context/ReviewContext';
import { Star, CheckCircle, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ReviewListProps {
    productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
    const { getProductReviews, getAverageRating } = useReviews();

    const productReviews = getProductReviews(productId);
    const averageRating = getAverageRating(productId);

    if (productReviews.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Este producto aún no tiene reseñas. ¡Sé el primero en opinar!</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Summary */}
            <div className={styles.summary}>
                <div className={styles.avgRating}>
                    <span className={styles.avgNumber}>{averageRating}</span>
                    <div className={styles.avgStars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={20}
                                fill={averageRating >= star ? 'var(--color-secondary)' : 'transparent'}
                                color={averageRating >= star ? 'var(--color-secondary)' : 'var(--color-text-muted)'}
                            />
                        ))}
                    </div>
                    <span className={styles.totalReviews}>({productReviews.length} reseñas)</span>
                </div>
            </div>

            {/* Reviews List */}
            <div className={styles.list}>
                {productReviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.userInfo}>
                                {review.userAvatar ? (
                                    <Image
                                        src={review.userAvatar}
                                        alt={review.userName}
                                        width={45}
                                        height={45}
                                        className={styles.avatar}
                                    />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>
                                        {review.userName.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <span className={styles.userName}>
                                        {review.userName}
                                        {review.verified && (
                                            <CheckCircle size={14} color="var(--color-secondary)" style={{ marginLeft: '0.5rem' }} />
                                        )}
                                    </span>
                                    <span className={styles.date}>{review.date}</span>
                                </div>
                            </div>
                            <div className={styles.reviewStars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={16}
                                        fill={review.rating >= star ? 'var(--color-secondary)' : 'transparent'}
                                        color={review.rating >= star ? 'var(--color-secondary)' : 'var(--color-text-muted)'}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className={styles.comment}>{review.comment}</p>

                        {review.image && (
                            <div className={styles.reviewImage}>
                                <Image
                                    src={review.image}
                                    alt="Foto del cliente"
                                    width={120}
                                    height={120}
                                    className={styles.reviewPhoto}
                                />
                                {review.addToGallery && (
                                    <span className={styles.galleryBadge}>
                                        <ImageIcon size={12} /> En galería
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
