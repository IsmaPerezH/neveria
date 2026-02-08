import Link from 'next/link';
import styles from './Footer.module.css';
import { Facebook, Instagram, Twitter, Music2, IceCream } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>

                {/* Brand */}
                <div style={{ textAlign: 'center' }}>
                    <Link href="/" className={styles.brand}>
                        <IceCream size={24} color="var(--color-primary)" />
                        Nevería <span>Artesanal</span>
                    </Link>
                    <p className={styles.tagline}>
                        Creando momentos dulces con ingredientes naturales y mucho amor desde 1995.
                    </p>
                    <div className={styles.socials} style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="TikTok"><Music2 size={20} /></a>
                        <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className={styles.heading}>Explorar</h3>
                    <ul className={styles.ul}>
                        <li className={styles.li}><Link href="/" className={styles.link}>Inicio</Link></li>
                        <li className={styles.li}><Link href="/sabores" className={styles.link}>Sabores</Link></li>
                        <li className={styles.li}><Link href="/contacto" className={styles.link}>Contacto</Link></li>
                        <li className={styles.li}><Link href="/carrito" className={styles.link}>Carrito</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className={styles.heading}>Información</h3>
                    <ul className={styles.ul}>
                        <li className={styles.li}><Link href="#" className={styles.link}>Aviso de Privacidad</Link></li>
                        <li className={styles.li}><Link href="#" className={styles.link}>Términos y Condiciones</Link></li>
                        <li className={styles.li}><Link href="#" className={styles.link}>Preguntas Frecuentes</Link></li>
                        <li className={styles.li}><Link href="#" className={styles.link}>Trabaja con Nosotros</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Nevería Artesanal. Todos los derechos reservados.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>Diseñado con precisión gourmet para amantes del helado.</p>
            </div>
        </footer>
    );
}
