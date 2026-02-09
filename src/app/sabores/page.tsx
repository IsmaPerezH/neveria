"use client"

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';
import Reveal from '@/components/Reveal';
import { Search, Filter, ChevronRight } from 'lucide-react';

export default function SaboresPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState<'all' | 'helado' | 'sorbete' | 'especial' | 'agua' | 'paleta'>('all');

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || p.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, category]);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'helado', label: 'Cremosos' },
        { id: 'sorbete', label: 'Sorbete (Agua)' },
        { id: 'agua', label: 'Aguas Frescas' },
        { id: 'paleta', label: 'Paletas de Hielo' },
        { id: 'especial', label: 'Especiales' },
    ];

    return (
        <div className="container">
            <section className="section">
                <Reveal>
                    <h1 className={styles.heading}>Nuestros Sabores</h1>
                    <p className={styles.subtitle}>Artesanía & Tradición en cada Scoop</p>
                </Reveal>

                {/* Search and Filter UI */}
                <Reveal className={styles.controlsContainer}>
                    <div className={styles.searchWrapper}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Buscar sabor..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={styles.filterWrapper}>
                        <Filter className={styles.filterIcon} size={18} />
                        <div className={styles.categoryTabs}>
                            {categories.map((c) => (
                                <button
                                    key={c.id}
                                    className={`${styles.tabBtn} ${category === c.id ? styles.tabActive : ''}`}
                                    onClick={() => setCategory(c.id as any)}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {filteredProducts.length > 0 ? (
                    <div className={styles.gridContainer}>
                        {category === 'all' && !searchTerm ? (
                            categories.filter(c => c.id !== 'all').map(cat => {
                                const catProducts = filteredProducts.filter(p => p.category === cat.id);
                                if (catProducts.length === 0) return null;
                                return (
                                    <div key={cat.id} className={styles.shelfSection}>
                                        <Reveal>
                                            <div className={styles.shelfHeader}>
                                                <h2 className={styles.shelfTitle}>{cat.label}</h2>
                                                <span className={styles.itemCount}>{catProducts.length} sabores</span>
                                            </div>
                                        </Reveal>
                                        <div className={styles.sliderContainer}>
                                            <div className={styles.sliderTrack}>
                                                {catProducts.map((product, index) => (
                                                    <div key={product.id} className={styles.sliderItem}>
                                                        <Reveal delay={index % 3 === 0 ? 'normal' : index % 3 === 1 ? 'slow' : 'slower'}>
                                                            <ProductCard product={product} />
                                                        </Reveal>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.grid}>
                                {filteredProducts.map((product, index) => (
                                    <Reveal key={product.id} delay={index % 3 === 0 ? 'normal' : index % 3 === 1 ? 'slow' : 'slower'}>
                                        <ProductCard product={product} />
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Reveal className={styles.noResults}>
                        <p>No encontramos ningún sabor que coincida con tu búsqueda. 🍦</p>
                        <button className="btn-primary" onClick={() => { setSearchTerm(''); setCategory('all'); }} style={{ marginTop: '1.5rem' }}>
                            Ver todos los sabores
                        </button>
                    </Reveal>
                )}
            </section>
        </div>
    );
}
