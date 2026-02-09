export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: 'local' | 'productos' | 'clientes' | 'eventos';
    featured?: boolean;
}

export const galleryImages: GalleryImage[] = [
    {
        id: 'g1',
        src: '/ice-cream-hero.png',
        alt: 'Nuestro helado artesanal estrella',
        category: 'productos',
        featured: true,
    },
    {
        id: 'g2',
        src: '/strawberry-scoop.png',
        alt: 'Helado de fresa silvestre',
        category: 'productos',
    },
    {
        id: 'g3',
        src: '/chocolate-scoop.png',
        alt: 'Helado de chocolate belga',
        category: 'productos',
    },
    {
        id: 'g4',
        src: '/vanilla-scoop.png',
        alt: 'Helado de vainilla de Papantla',
        category: 'productos',
    },
    {
        id: 'g5',
        src: '/mint-scoop.png',
        alt: 'Helado de menta con chocolate',
        category: 'productos',
    },
    {
        id: 'g6',
        src: '/agua.jpg',
        alt: 'Aguas frescas naturales',
        category: 'productos',
        featured: true,
    },
    {
        id: 'g7',
        src: '/paleta.jpg',
        alt: 'Paletas artesanales de fruta',
        category: 'productos',
    },
    {
        id: 'g8',
        src: '/contact-hero.png',
        alt: 'Nuestro equipo preparando helados',
        category: 'local',
        featured: true,
    },
];
