"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import Reveal from '@/components/Reveal';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, ShieldCheck, Leaf, FlaskConical, MessageSquare } from 'lucide-react';
import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import ReviewList from '@/components/Reviews/ReviewList';
import ReviewForm from '@/components/Reviews/ReviewForm';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const product = useMemo(() => products.find((p) => p.id === id), [id]);

    if (!product) {
        return (
            <div className="container section text-center">
                <Reveal>
                    <h1 className="title-display">Sabor no encontrado</h1>
                    <p style={{ marginTop: '2rem', color: 'var(--color-text-muted)' }}>
                        Lo sentimos, este sabor no está disponible por ahora.
                    </p>
                    <Link href="/sabores" className="btn-primary" style={{ marginTop: '2rem' }}>
                        Volver al Menú
                    </Link>
                </Reveal>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="container">
            <div className="section">
                <Reveal>
                    <button onClick={() => router.back()} className={styles.backBtn}>
                        <ArrowLeft size={18} />
                        <span>Volver</span>
                    </button>
                </Reveal>

                <div className={styles.mainGrid}>
                    {/* Image Section */}
                    <Reveal className={styles.imageSection}>
                        <div className={styles.imageContainer}>
                            {product.isPopular && <span className={styles.popularTag}>Más Solicitado</span>}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                priority
                                className={styles.mainImage}
                                sizes="(max-width: 900px) 100vw, 50vw"
                            />
                        </div>
                    </Reveal>

                    {/* Info Section */}
                    <Reveal className={styles.infoSection} delay="slow">
                        <div className={styles.categoryTag}>{product.category}</div>
                        <h1 className={styles.productName}>{product.name}</h1>
                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />
                                ))}
                            </div>
                            <span className={styles.reviews}>4.9 (120+ reseñas)</span>
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.features}>
                            <div className={styles.featureItem}>
                                <ShieldCheck size={20} color="var(--color-secondary)" />
                                <span>100% Orgánico</span>
                            </div>
                            <div className={styles.featureItem}>
                                <Leaf size={20} color="var(--color-secondary)" />
                                <span>Sin Conservantes</span>
                            </div>
                            <div className={styles.featureItem}>
                                <FlaskConical size={20} color="var(--color-secondary)" />
                                <span>Hecho a Mano</span>
                            </div>
                        </div>

                        <div className={styles.priceRow}>
                            <span className={styles.price}>${product.price}</span>
                            <span className={styles.currency}>MXN</span>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.quantityPicker}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className={styles.qtyBtn}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className={styles.qtyBtn}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <button className={styles.addBtn} onClick={handleAddToCart}>
                                <ShoppingCart size={20} />
                                <span>Añadir al Carrito</span>
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Nutrition/Details Tabs (Simplified) */}
                <Reveal style={{ marginTop: '5rem' }}>
                    <div className={styles.detailsBox}>
                        <h3 className={styles.detailsHeading}>Características del Helado</h3>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Calorías</span>
                                <span className={styles.detailValue}>180 kcal</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Base</span>
                                <span className={styles.detailValue}>{product.category === 'helado' ? 'Leche entera orgánica' : 'Agua de manantial'}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Textura</span>
                                <span className={styles.detailValue}>Ultra Sedosa</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section style={{ marginTop: '8rem' }}>
                        <Reveal>
                            <h2 className={styles.sectionTitle}>Te Recomendamos</h2>
                            <p className={styles.sectionSubtitle}>Sabores similares que podrían gustarte</p>
                        </Reveal>

                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((rp, index) => (
                                <Reveal key={rp.id} delay={index === 0 ? 'normal' : index === 1 ? 'slow' : 'slower'}>
                                    <ProductCard product={rp} />
                                </Reveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <section style={{ marginTop: '8rem' }}>
                    <Reveal>
                        <div className={styles.reviewsHeader}>
                            <MessageSquare size={32} color="var(--color-secondary)" />
                            <h2 className={styles.sectionTitle}>Opiniones de Clientes</h2>
                        </div>
                    </Reveal>

                    <div className={styles.reviewsGrid}>
                        <Reveal delay="normal">
                            <ReviewList productId={id as string} />
                        </Reveal>
                        <Reveal delay="slow">
                            <ReviewForm productId={id as string} />
                        </Reveal>
                    </div>
                </section>
            </div>
        </div>
    );
}
