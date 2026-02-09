"use client";

import Image from 'next/image';
import styles from './PromoCard.module.css';
import { Promo } from '@/data/promos';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

interface PromoCardProps {
    promo: Promo;
}

export default function PromoCard({ promo }: PromoCardProps) {
    const { addToCart } = useCart();
    const discount = Math.round(((promo.originalPrice - promo.promoPrice) / promo.originalPrice) * 100);

    const handleAddPromo = () => {
        // Añadir el combo como un producto especial
        addToCart({
            id: promo.id,
            name: promo.name,
            description: promo.description,
            price: promo.promoPrice,
            image: promo.image,
            category: 'especial',
        });
    };

    return (
        <div className={styles.card}>
            {promo.badge && <span className={styles.badge}>{promo.badge}</span>}
            <div className={styles.discountBadge}>-{discount}%</div>

            <div className={styles.imageWrapper}>
                <Image
                    src={promo.image}
                    alt={promo.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{promo.name}</h3>
                <p className={styles.description}>{promo.description}</p>

                <div className={styles.includes}>
                    <span className={styles.includesTitle}>Incluye:</span>
                    <ul className={styles.includesList}>
                        {promo.includes.map((item, index) => (
                            <li key={index}>
                                <Check size={14} color="var(--color-secondary)" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.priceRow}>
                    <div className={styles.prices}>
                        <span className={styles.originalPrice}>${promo.originalPrice}</span>
                        <span className={styles.promoPrice}>${promo.promoPrice}</span>
                    </div>
                    <button className={styles.addButton} onClick={handleAddPromo}>
                        <ShoppingCart size={18} />
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
