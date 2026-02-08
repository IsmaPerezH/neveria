"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className={styles.card}>
            <Link href={`/sabores/${product.id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    {product.isPopular && <span className={styles.tag}>Más Vendido</span>}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>
            <div className={styles.content}>
                <Link href={`/sabores/${product.id}`} className={styles.nameLink}>
                    <h3 className={styles.name}>{product.name}</h3>
                </Link>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price}</span>
                    <button className={styles.addButton} onClick={handleAddToCart} aria-label="Agregar al carrito">
                        <Plus size={18} />
                        <span>Añadir</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
