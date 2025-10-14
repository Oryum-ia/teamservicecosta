// Product data for Team Service Costa
export interface Product {
  id: string;
  name: string;
  model: string;
  price: string;
  image: string;
  available: boolean;
  category: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 'hidrolavadora-k2',
    name: 'Hidrolavadora K2',
    model: 'K2 Basic',
    price: '549.900',
    image: '/images/products/image.png',
    available: true,
    category: 'Hogar',
    description: 'Equipo compacto ideal para uso doméstico ligero. Perfecta para limpiar patios, bicicletas, muebles de jardín y vehículos. Presión de 110 bar.'
  },
  {
    id: 'hidrolavadora-k3',
    name: 'Hidrolavadora K3',
    model: 'K3 Full Control',
    price: '899.900',
    image: '/images/products/image2.png',
    available: true,
    category: 'Hogar',
    description: 'Mayor potencia de 120 bar para tareas de limpieza más exigentes. Control de presión ajustable y pistola con sistema Full Control.'
  },
  {
    id: 'hidrolavadora-k4',
    name: 'Hidrolavadora K4',
    model: 'K4 Premium Full Control Home',
    price: '1.449.900',
    image: '/images/products/image3.png',
    available: true,
    category: 'Semi-profesional',
    description: 'Control total de presión de 130 bar. Sistema Home Kit completo. Para uso frecuente en hogar y trabajos ligeros comerciales.'
  },
  {
    id: 'hidrolavadora-k5',
    name: 'Hidrolavadora K5',
    model: 'K5 Premium Full Control Plus',
    price: '2.199.900',
    image: '/images/products/image.png',
    available: true,
    category: 'Semi-profesional',
    description: 'La más potente de la línea doméstica con 145 bar. Motor refrigerado por agua para mayor durabilidad. Incluye Home & Car Kit.'
  },
  {
    id: 'hidrolavadora-k7',
    name: 'Hidrolavadora K7',
    model: 'K7 Premium Smart Control',
    price: '3.899.900',
    image: '/images/products/image2.png',
    available: true,
    category: 'Profesional',
    description: 'Máxima potencia de 180 bar y durabilidad profesional. Display inteligente y control total. Para uso profesional intensivo diario.'
  },
  {
    id: 'aspiradora-wd3',
    name: 'Aspiradora WD3',
    model: 'WD3 Premium',
    price: '729.900',
    image: '/images/products/image3.png',
    available: true,
    category: 'Aspiradoras',
    description: 'Aspiradora multiusos para seco y húmedo. Capacidad de 17 litros y potencia de 1000W. Función de soplado incluida.'
  },
  {
    id: 'limpiadora-fc5',
    name: 'Limpiadora de Pisos FC5',
    model: 'FC5 Cordless',
    price: '1.199.900',
    image: '/images/products/image.png',
    available: true,
    category: 'Limpieza',
    description: 'Limpieza de pisos duros sin cables. Tecnología de rodillos húmedos para limpieza profunda. Autonomía de 20 minutos.'
  },
  {
    id: 'limpiavidrios-wv2',
    name: 'Limpiavidrios WV2',
    model: 'WV2 Premium',
    price: '349.900',
    image: '/images/products/image2.png',
    available: true,
    category: 'Limpieza',
    description: 'Limpieza de ventanas sin rayas ni goteo. Batería de larga duración para hasta 100 m². Incluye botella pulverizadora.'
  },
  {
    id: 'aspiradora-wd6',
    name: 'Aspiradora WD6',
    model: 'WD6 Premium',
    price: '1.099.900',
    image: '/images/products/image3.png',
    available: true,
    category: 'Aspiradoras',
    description: 'Aspiradora profesional multiusos de 30 litros. Potencia de 1300W con filtro plano. Sistema de limpieza semi-automático.'
  },
  {
    id: 'lavadora-br30',
    name: 'Lavadora-Secadora BR30/4',
    model: 'BR30/4 C',
    price: '8.499.900',
    image: '/images/products/image.png',
    available: true,
    category: 'Profesional',
    description: 'Máquina compacta lavadora-secadora de pisos. Ancho de trabajo de 30 cm. Ideal para comercios, oficinas y espacios reducidos.'
  }
];

export const categories = [
  'Todos',
  'Hogar',
  'Semi-profesional',
  'Profesional',
  'Aspiradoras',
  'Limpieza'
];
