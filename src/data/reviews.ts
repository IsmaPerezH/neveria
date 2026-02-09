export interface Review {
    id: string;
    productId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    image?: string;
    addToGallery: boolean;
    date: string;
    verified: boolean;
}

export const reviews: Review[] = [
    {
        id: 'r1',
        productId: '1',
        userName: 'María García',
        userAvatar: '/avatar-1.png',
        rating: 5,
        comment: '¡El mejor helado de fresa que he probado! Muy cremoso y con trozos de fruta real. Definitivamente regresaré.',
        image: '/strawberry-scoop.png',
        addToGallery: true,
        date: '2024-02-05',
        verified: true,
    },
    {
        id: 'r2',
        productId: '1',
        userName: 'Carlos López',
        rating: 4,
        comment: 'Muy bueno, aunque me hubiera gustado que tuviera más trozos de fresa. El sabor es excelente.',
        addToGallery: false,
        date: '2024-02-03',
        verified: true,
    },
    {
        id: 'r3',
        productId: '2',
        userName: 'Ana Martínez',
        userAvatar: '/avatar-1.png',
        rating: 5,
        comment: 'El chocolate belga es increíble. Intenso y con un sabor auténtico. ¡Lo recomiendo 100%!',
        image: '/chocolate-scoop.png',
        addToGallery: true,
        date: '2024-02-01',
        verified: true,
    },
    {
        id: 'r4',
        productId: '4',
        userName: 'Pedro Sánchez',
        rating: 5,
        comment: 'La menta con chocolate es refrescante y deliciosa. Perfecta para el calor.',
        addToGallery: false,
        date: '2024-01-28',
        verified: false,
    },
    {
        id: 'r5',
        productId: '8',
        userName: 'Laura Hernández',
        rating: 5,
        comment: 'La horchata está buenísima, se nota que es receta casera. Muy refrescante.',
        image: '/agua.jpg',
        addToGallery: true,
        date: '2024-01-25',
        verified: true,
    },
];
