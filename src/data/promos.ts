export interface Promo {
    id: string;
    name: string;
    description: string;
    originalPrice: number;
    promoPrice: number;
    image: string;
    includes: string[];
    badge?: string;
    isActive: boolean;
}

export const promos: Promo[] = [
    {
        id: 'promo-1',
        name: 'Combo Familiar',
        description: 'Perfecto para compartir en familia. 4 nieves del sabor que elijas + 1 agua de horchata gratis.',
        originalPrice: 215,
        promoPrice: 160,
        image: '/strawberry-scoop.png',
        includes: ['4 Nieves a elegir', '1 Agua de Horchata (1L)', 'Servilletas extra'],
        badge: 'Más Popular',
        isActive: true,
    },
    {
        id: 'promo-2',
        name: 'Duo Refrescante',
        description: 'Para esos días calurosos. 2 paletas + 1 agua fresca de tu elección.',
        originalPrice: 100,
        promoPrice: 75,
        image: '/paleta.jpg',
        includes: ['2 Paletas a elegir', '1 Agua fresca (500ml)'],
        badge: 'Nuevo',
        isActive: true,
    },
    {
        id: 'promo-3',
        name: 'Antojo Individual',
        description: 'Tu capricho personal. 1 nieve doble + topping premium gratis.',
        originalPrice: 70,
        promoPrice: 55,
        image: '/chocolate-scoop.png',
        includes: ['1 Nieve doble', '1 Topping premium', 'Cono o vaso'],
        isActive: true,
    },
    {
        id: 'promo-4',
        name: 'Fiesta Helada',
        description: 'Ideal para reuniones. 10 nieves variadas + 2 litros de agua + servilletas.',
        originalPrice: 520,
        promoPrice: 399,
        image: '/vanilla-scoop.png',
        includes: ['10 Nieves variadas', '2L de agua a elegir', 'Cucharas y servilletas', 'Bolsa térmica'],
        badge: 'Ahorro Máximo',
        isActive: true,
    },
];
