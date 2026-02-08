"use client"

import Image from 'next/image';
import styles from './Testimonials.module.css';
import Reveal from '../Reveal';

const testimonials = [
    {
        id: 1,
        name: 'Ana García',
        role: 'Cliente Frecuente',
        quote: '¡El mejor helado de fresa que he probado en mi vida! Es como morder una fresa de verdad. El lugar es hermoso y la atención increíble.',
        avatar: '/avatar-1.png',
    },
    {
        id: 2,
        name: 'Carlos Mendoza',
        role: 'Crítico Gastronómico',
        quote: 'La textura del helado de chocolate belga es simplemente perfecta. Cremoso, intenso y con el dulzor justo. Una verdadera joya artesanal.',
        initials: 'CM',
    },
    {
        id: 3,
        name: 'Sofía Torres',
        role: 'Mamá Feliz',
        quote: 'A mis hijos les encanta el helado de "Pitufo". A mí me gusta que usen ingredientes naturales. ¡Todos salimos felices siempre!',
        initials: 'ST',
    },
];

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className="container">
                <Reveal>
                    <h2 className={styles.heading}>Lo Que Dicen Nuestros Clientes</h2>
                </Reveal>

                <div className={styles.grid}>
                    {testimonials.map((t, index) => (
                        <Reveal key={t.id} delay={index === 0 ? 'normal' : index === 1 ? 'slow' : 'slower'}>
                            <div className={styles.card}>
                                <div className={styles.avatarWrapper} style={{ backgroundColor: t.id === 3 ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                                    {t.avatar ? (
                                        <Image src={t.avatar} alt={t.name} width={70} height={70} style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <span>{t.initials}</span>
                                    )}
                                </div>
                                <div className={styles.stars}>★★★★★</div>
                                <p className={styles.quote}>"{t.quote}"</p>
                                <h3 className={styles.author}>{t.name}</h3>
                                <span className={styles.role}>{t.role}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
