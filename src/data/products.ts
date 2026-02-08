export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'helado' | 'sorbete' | 'especial';
    isPopular?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Fresa Silvestre',
        description: 'Fresas recién cortadas mezcladas con nuestra base cremosa secreta.',
        price: 45,
        image: '/strawberry-scoop.png',
        category: 'helado',
        isPopular: true,
    },
    {
        id: '2',
        name: 'Chocolate Belga',
        description: 'Intenso chocolate oscuro con trozos de cacao real premium.',
        price: 50,
        image: '/chocolate-scoop.png',
        category: 'helado',
        isPopular: true,
    },
    {
        id: '3',
        name: 'Vainilla de Papantla',
        description: 'Vainas de vainilla auténtica de Papantla. Suave y aromático.',
        price: 45,
        image: '/vanilla-scoop.png',
        category: 'helado',
    },
    {
        id: '4',
        name: 'Menta Granizada',
        description: 'Refrescante menta natural con lluvia de chocolate crujiente.',
        price: 48,
        image: '/mint-scoop.png',
        category: 'helado',
        isPopular: true,
    },
    {
        id: '5',
        name: 'Limón de Sicilia',
        description: 'Sorbete cítrico ultra refrescante con ralladura de limón siciliano.',
        price: 40,
        image: '/lemon-scoop.jpg',
        category: 'sorbete',
    },
    {
        id: '6',
        name: 'Mango-Maracuyá',
        description: 'Explosión tropical de pulpa natural de mango y maracuyá ácido.',
        price: 45,
        image: '/mango-scoop.jpg',
        category: 'sorbete',
    },
    {
        id: '7',
        name: 'Torre Gourmet',
        description: 'Tres sabores premium con toppings de pistacho y jarabe de maple.',
        price: 85,
        image: '/special-ice-cream.jpg',
        category: 'especial',
        isPopular: true,
    }
];
