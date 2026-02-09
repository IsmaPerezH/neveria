"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { galleryImages, GalleryImage } from '@/data/gallery';
import { useReviews } from '@/context/ReviewContext';
import Reveal from '@/components/Reveal';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

type Category = 'all' | 'local' | 'productos' | 'clientes' | 'eventos';

export default function GalleryPage() {
    const [category, setCategory] = useState<Category>('all');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const { galleryFromReviews } = useReviews();

    // Combinar imágenes de galería estática con las de reseñas de clientes
    const allImages = useMemo(() => {
        return [...galleryImages, ...galleryFromReviews];
    }, [galleryFromReviews]);

    const filteredImages = useMemo(() => {
        if (category === 'all') return allImages;
        return allImages.filter(img => img.category === category);
    }, [category, allImages]);

    const categories = [
        { id: 'all', label: 'Todas' },
        { id: 'productos', label: 'Productos' },
        { id: 'local', label: 'Nuestro Local' },
        { id: 'clientes', label: 'Clientes Felices' },
        { id: 'eventos', label: 'Eventos' },
    ];

    const openLightbox = (image: GalleryImage) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (newIndex < 0) newIndex = filteredImages.length - 1;
        if (newIndex >= filteredImages.length) newIndex = 0;

        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <div className="container">
            <section className="section">
                <Reveal>
                    <div className={styles.header}>
                        <Camera size={48} color="var(--color-secondary)" />
                        <h1 className={styles.title}>Nuestra Galería</h1>
                        <p className={styles.subtitle}>
                            Momentos dulces capturados en imágenes. Conoce nuestro local, productos y clientes felices.
                        </p>
                    </div>
                </Reveal>

                {/* Filtros */}
                <Reveal delay="slow">
                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.filterBtn} ${category === cat.id ? styles.filterActive : ''}`}
                                onClick={() => setCategory(cat.id as Category)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Grid de Imágenes */}
                <div className={styles.grid}>
                    {filteredImages.map((image, index) => (
                        <Reveal key={image.id} delay={index % 3 === 0 ? 'normal' : index % 3 === 1 ? 'slow' : 'slower'}>
                            <div
                                className={`${styles.imageCard} ${image.featured ? styles.featured : ''}`}
                                onClick={() => openLightbox(image)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className={styles.overlay}>
                                    <span className={styles.imageAlt}>{image.alt}</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className={styles.lightbox} onClick={closeLightbox}>
                        <button className={styles.closeBtn} onClick={closeLightbox}>
                            <X size={32} />
                        </button>

                        <button
                            className={`${styles.navBtn} ${styles.prevBtn}`}
                            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className={styles.lightboxImage}
                                sizes="90vw"
                                priority
                            />
                        </div>

                        <button
                            className={`${styles.navBtn} ${styles.nextBtn}`}
                            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                        >
                            <ChevronRight size={40} />
                        </button>

                        <div className={styles.lightboxCaption}>
                            {selectedImage.alt}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
