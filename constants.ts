import { Product, Representative, Location, FaqItem, ContactInfo } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Havaianas Brasil Logo',
    reference: '4110850',
    category: 'Unisex',
    collection: 'Clásicos',
    description: 'El modelo más icónico de la marca. Incluye la bandera de Brasil en la tira y 3 colores en la suela.',
    colors: ['Negro', 'Azul Navy', 'Blanco', 'Verde Amazonia'],
    sizes: ['33/34', '35/36', '37/38', '39/40', '41/42', '43/44'],
    image: 'https://picsum.photos/id/103/500/500', // Placeholder
    features: ['Suela de goma 100%', 'Antideslizante', 'Resistente al agua', 'Tiras con diseño greca']
  },
  {
    id: '2',
    name: 'Havaianas Slim',
    reference: '4000030',
    category: 'Mujer',
    collection: 'Slim',
    description: 'Diseño delicado con tiras más finas y suela más ligera. Elegancia y comodidad.',
    colors: ['Rosa Ballet', 'Dorado', 'Plata', 'Negro'],
    sizes: ['33/34', '35/36', '37/38', '39/40'],
    image: 'https://picsum.photos/id/338/500/500',
    features: ['Tiras finas', 'Suela ligera', 'Diseño femenino', 'Confort térmico']
  },
  {
    id: '3',
    name: 'Havaianas Top',
    reference: '4000029',
    category: 'Unisex',
    collection: 'Basics',
    description: 'La esencia de Havaianas. Monocolor, cómoda y duradera. El básico que no puede faltar.',
    colors: ['Azul', 'Rojo', 'Amarillo', 'Negro', 'Blanco'],
    sizes: ['35/36', '37/38', '39/40', '41/42', '43/44'],
    image: 'https://picsum.photos/id/445/500/500',
    features: ['Monocolor', 'Durabilidad extrema', 'Fácil lavado']
  },
  {
    id: '4',
    name: 'Havaianas Kids Fantasy',
    reference: '4103400',
    category: 'Niños',
    collection: 'Kids',
    description: 'Estampados divertidos y coloridos para los más pequeños.',
    colors: ['Multicolor'],
    sizes: ['23/24', '25/26', '27/28', '29/30', '31/32'],
    image: 'https://picsum.photos/id/1060/500/500',
    features: ['Sujeción extra (elástico en tallas pequeñas)', 'Estampados lúdicos']
  },
  {
    id: '5',
    name: 'Havaianas Urban Way',
    reference: '4144550',
    category: 'Hombre',
    collection: 'Urban',
    description: 'Con tiras de tela y diseño más robusto, ideales para un look casual urbano.',
    colors: ['Café', 'Gris', 'Azul Marino'],
    sizes: ['39/40', '41/42', '43/44', '45/46'],
    image: 'https://picsum.photos/id/823/500/500',
    features: ['Tiras de tela', 'Suela anatómica', 'Estilo casual']
  }
];

export const REPRESENTATIVES: Representative[] = [
  {
    id: '1',
    name: 'Juan David Pérez',
    role: 'Asesor Comercial',
    zone: 'Barranquilla y Atlántico',
    address: 'Cra 53 # 82-86, Oficina 301',
    phone: '+57 315 456 7890',
    email: 'juan.p@sarescol.com',
    image: 'https://picsum.photos/id/237/600/600'
  },
  {
    id: '2',
    name: 'Luisa Fernanda Martínez',
    role: 'Representante de Ventas',
    zone: 'Cartagena y Bolívar',
    address: 'Bocagrande, Av. San Martín # 5-23',
    phone: '+57 301 222 3344',
    email: 'luisa.m@sarescol.com',
    image: 'https://picsum.photos/id/342/600/600'
  },
  {
    id: '3',
    name: 'Carlos Andrés Díaz',
    role: 'Ejecutivo de Cuenta',
    zone: 'Montería y Córdoba',
    address: 'Calle 28 # 4-50, Centro',
    phone: '+57 320 987 1122',
    email: 'carlos.d@sarescol.com',
    image: 'https://picsum.photos/id/1005/600/600'
  },
  {
    id: '4',
    name: 'Ana Sofía Vargas',
    role: 'Asesora Senior',
    zone: 'Neiva y Huila',
    address: 'Carrera 5 # 10-35, Edificio Plaza',
    phone: '+57 311 555 6677',
    email: 'ana.v@sarescol.com',
    image: 'https://picsum.photos/id/64/600/600'
  },
  {
    id: '5',
    name: 'Pedro Gómez',
    role: 'Gerente Regional',
    zone: 'Bogotá D.C.',
    address: 'Calle 93B # 15-30',
    phone: '+57 300 123 4567',
    email: 'pedro.g@sarescol.com',
    image: 'https://picsum.photos/id/1074/600/600'
  },
  {
    id: '6',
    name: 'Mariana Torres',
    role: 'Asesora Comercial',
    zone: 'Medellín y Antioquia',
    address: 'El Poblado, Cra 43A # 1-50',
    phone: '+57 310 987 6543',
    email: 'mariana.t@sarescol.com',
    image: 'https://picsum.photos/id/1027/600/600'
  }
];

// Additional static representatives provided for initial launch (images expected in public/uploads/)
export const REPRESENTATIVES_STATIC: Representative[] = [
  {
    id: 'r1',
    name: 'Uverney Peña',
    role: 'Líder Comercial',
    zone: '',
    address: '',
    phone: '+57 3137001289',
    email: 'sares.alianzas@gmail.com',
    image: '/uverney-comercial.jpeg'
  },
  {
    id: 'r2',
    name: 'Urbano Rojas',
    role: 'Representante de Ventas',
    zone: 'Atlántico',
    address: '',
    phone: '+57 3243382470',
    email: 'sares.atlantico.comercial@gmail.com',
    image: '/urbano-rojas.jpeg'
  },
  {
    id: 'r3',
    name: 'Robinson Castaño',
    role: 'Representante de Ventas',
    zone: 'Sucre, Córdoba',
    address: '',
    phone: '+57 3147268406',
    email: 'sares.cordoba.comercial@gmail.com',
    image: '/robinson-comercial.svg'
  },
  {
    id: 'r4',
    name: 'Sandra Bocanegra',
    role: 'Representante de Ventas',
    zone: 'Magdalena',
    address: '',
    phone: '+57 3156429409',
    email: 'sares.magdalena.comercial@gmail.com',
    image: '/sandra-comercial.jpeg'
  },
  {
    id: 'r5',
    name: 'Wulfran Jimeno',
    role: 'Representante Comercial',
    zone: 'Bolívar',
    address: '',
    phone: '+57 3125779148',
    email: 'comercial@sarescol.com',
    image: '/wulfram-comercial.jpeg'
  }
];

export const LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Oficina Principal y Showroom',
    type: 'Oficina',
    address: 'Centro Comercial e Industrial Ternera 1, Bodega 52, Outlet Sares',
    phone: '314 7260 433',
    hours: 'Lun - Vie: 8:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.366827083074!2d-75.4855!3d10.391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e70d6c0a0d%3A0x6e7c7e6e6e6e6e6e!2sTernera%2C%20Cartagena%2C%20Bolivar!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco',
    image: 'https://picsum.photos/id/180/600/400'
  },
  {
    id: '2',
    name: 'Centro de Distribución (CEDI)',
    type: 'Bodega',
    address: 'Centro Comercial e Industrial Ternera 1, Cartagena, Bolívar',
    phone: '(601) 823 4567',
    hours: 'Lun - Vie: 7:00 AM - 5:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.366827083074!2d-75.4855!3d10.391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e70d6c0a0d%3A0x6e7c7e6e6e6e6e6e!2sTernera%2C%20Cartagena%2C%20Bolivar!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco',
    image: 'https://picsum.photos/id/1076/600/400'
  }
];

export const CONTACT_INFO_DEFAULT: ContactInfo = {
  phone: '314 7260 433',
  email: 'administracion@sarescol.com',
  address: 'Centro Comercial e Industrial Ternera 1, Bodega 52, Outlet Sares',
};

export const FAQS: FaqItem[] = [
  {
    question: '¿Cuál es el pedido mínimo para mayoristas?',
    answer: 'El pedido mínimo inicial es de 24 pares surtidos. Para distribuidores regionales, manejamos condiciones especiales.',
    category: 'Ventas Mayoristas'
  },
  {
    question: '¿Los productos son originales?',
    answer: 'Sí, somos distribuidores autorizados directos de Havaianas en Colombia. Todos nuestros productos cuentan con garantía de autenticidad.',
    category: 'Producto'
  },
  {
    question: '¿Hacen envíos a todo el país?',
    answer: 'Sí, cubrimos el 100% del territorio nacional a través de nuestras alianzas logísticas.',
    category: 'Envíos'
  },
  {
    question: '¿Cómo puedo solicitar el catálogo con precios?',
    answer: 'Debes registrarte como cliente mayorista o contactar a un asesor comercial para recibir la lista de precios actualizada.',
    category: 'Ventas Mayoristas'
  }
];