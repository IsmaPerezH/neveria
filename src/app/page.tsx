"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { products } from '@/data/products';
import { promos } from '@/data/promos';
import ProductCard from '@/components/ProductCard/ProductCard';
import PromoCard from '@/components/PromoCard/PromoCard';
import Testimonials from '@/components/Testimonials/Testimonials';
import Newsletter from '@/components/Newsletter/Newsletter';
import Reveal from '@/components/Reveal';

type CategoryTab = 'nieves' | 'aguas' | 'paletas';

export default function Home() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('nieves');

  // Filtrar productos por categoría
  const helados = products.filter(p => p.category === 'helado' || p.category === 'sorbete').slice(0, 3);
  const aguas = products.filter(p => p.category === 'agua').slice(0, 3);
  const paletas = products.filter(p => p.category === 'paleta').slice(0, 3);

  // Limitar a los 2 mejores promociones para no saturar
  const activePromos = promos.filter(p => p.isActive).slice(0, 2);

  const getProductsByTab = () => {
    switch (activeTab) {
      case 'nieves': return helados;
      case 'aguas': return aguas;
      case 'paletas': return paletas;
      default: return helados;
    }
  };

  return (
    <>
      <div className={styles.hero}>
        <Image
          src="/ice-cream-hero.png"
          alt="Helado artesanal delicioso"
          fill
          priority
          className={styles.heroImage}
          style={{ objectFit: 'cover' }}
        />
        <Reveal className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Sabor que Enamora</h1>
          <p className={styles.heroSubtitle}>
            Helados 100% artesanales hechos con frutas naturales <br /> y la receta secreta de la abuela.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sabores" className={styles.ctaButton}>
              Ver Menú
            </a>
            <a href="/personalizar" className={styles.ctaButton} style={{ background: 'var(--color-secondary)', color: '#000', boxShadow: '0 10px 30px -10px rgba(0, 229, 255, 0.3)' }}>
              Armar mi Helado ✨
            </a>
          </div>
        </Reveal>
      </div>

      {/* Sección: Ofertas (Limpia - solo 2) */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)', paddingBottom: '3rem' }}>
        <div className="container">
          <Reveal>
            <h2 className="title-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ofertas Imperdibles</h2>
          </Reveal>

          <div className={styles.promoGrid}>
            {activePromos.map((promo, index) => (
              <Reveal key={promo.id} delay={index === 0 ? 'normal' : 'slow'}>
                <PromoCard promo={promo} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sección única: Nuestros Productos con Tabs */}
      <section className="section container">
        <Reveal>
          <h2 className="title-display" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Explora Nuestro Menú</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            Selecciona una categoría para ver nuestros favoritos.
          </p>
        </Reveal>

        {/* Tab Selector */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'nieves' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('nieves')}
          >
            🍦 Nieves
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'aguas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('aguas')}
          >
            🥤 Aguas
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'paletas' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('paletas')}
          >
            🍭 Paletas
          </button>
        </div>

        {/* Grid Único Dinámico */}
        <div className={styles.productGrid}>
          {getProductsByTab().map((product, index) => (
            <Reveal key={product.id + activeTab} delay={index === 0 ? 'normal' : index === 1 ? 'slow' : 'slower'}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a href="/sabores" className="btn-primary" style={{ textDecoration: 'none' }}>
            Ver Catálogo Completo →
          </a>
        </Reveal>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
