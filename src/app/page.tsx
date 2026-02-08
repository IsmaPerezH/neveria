import Image from 'next/image';
import styles from './page.module.css';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard/ProductCard';
import Testimonials from '@/components/Testimonials/Testimonials';
import Newsletter from '@/components/Newsletter/Newsletter';
import Reveal from '@/components/Reveal';

export default function Home() {
  const popularFlavors = products.filter(p => p.isPopular).slice(0, 3);

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

      {/* Featured Flavors */}
      <section className="section container text-center">
        <Reveal>
          <h2 className="title-display">Sabores de Temporada</h2>
          <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            ¡Prueba nuestras creaciones más populares!
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          {popularFlavors.map((product, index) => (
            <Reveal key={product.id} delay={index === 0 ? 'normal' : index === 1 ? 'slow' : 'slower'}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: '3rem' }}>
          <a href="/sabores" className="btn-primary" style={{ textDecoration: 'none' }}>Ver Todos los Sabores →</a>
        </Reveal>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
