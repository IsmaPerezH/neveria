"use client";

import { useState, useRef } from 'react';
import styles from './ReviewForm.module.css';
import { useReviews } from '@/context/ReviewContext';
import { Star, Upload, X, CheckCircle, Camera } from 'lucide-react';
import Image from 'next/image';

interface ReviewFormProps {
    productId: string;
    onSuccess?: () => void;
}

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
    const { addReview } = useReviews();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [addToGallery, setAddToGallery] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0 || !userName.trim() || !comment.trim()) {
            alert('Por favor completa todos los campos y selecciona una calificación.');
            return;
        }

        addReview({
            productId,
            userName: userName.trim(),
            rating,
            comment: comment.trim(),
            image: imagePreview || undefined,
            addToGallery: imagePreview ? addToGallery : false,
            verified: false,
        });

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            setUserName('');
            setComment('');
            setImagePreview(null);
            setAddToGallery(false);
            onSuccess?.();
        }, 3000);
    };

    if (submitted) {
        return (
            <div className={styles.successState}>
                <CheckCircle size={48} color="var(--color-secondary)" />
                <h3>¡Gracias por tu reseña!</h3>
                <p>Tu opinión nos ayuda a mejorar cada día.</p>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Deja tu Reseña</h3>

            {/* Rating Stars */}
            <div className={styles.ratingSection}>
                <label>Tu calificación:</label>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={styles.starBtn}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                size={28}
                                fill={(hoverRating || rating) >= star ? 'var(--color-secondary)' : 'transparent'}
                                color={(hoverRating || rating) >= star ? 'var(--color-secondary)' : 'var(--color-text-muted)'}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Name Input */}
            <div className={styles.inputGroup}>
                <label>Tu nombre:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="¿Cómo te llamas?"
                    required
                />
            </div>

            {/* Comment */}
            <div className={styles.inputGroup}>
                <label>Tu opinión:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos qué te pareció el producto..."
                    rows={4}
                    required
                />
            </div>

            {/* Image Upload */}
            <div className={styles.imageUpload}>
                <label>Comparte una foto (opcional):</label>

                {!imagePreview ? (
                    <div
                        className={styles.uploadArea}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera size={32} color="var(--color-text-muted)" />
                        <span>Haz clic para subir una imagen</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />
                    </div>
                ) : (
                    <div className={styles.previewContainer}>
                        <div className={styles.imagePreview}>
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <button
                                type="button"
                                className={styles.removeImage}
                                onClick={removeImage}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <label className={styles.galleryCheckbox}>
                            <input
                                type="checkbox"
                                checked={addToGallery}
                                onChange={(e) => setAddToGallery(e.target.checked)}
                            />
                            <span>Agregar mi foto a la galería de clientes felices</span>
                        </label>
                    </div>
                )}
            </div>

            <button type="submit" className={styles.submitBtn}>
                Publicar Reseña
            </button>
        </form>
    );
}
