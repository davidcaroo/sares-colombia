export interface Product {
  id: string;
  name: string;
  reference: string;
  category: 'Hombre' | 'Mujer' | 'Niños' | 'Unisex' | 'Licencias';
  collection: string;
  description: string;
  colors: string[];
  sizes: string[];
  image: string;
  features: string[];
}

export interface Representative {
  id: string;
  name: string;
  role: string;
  zone: string;
  address: string;
  phone: string;
  email: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'Oficina' | 'Bodega' | 'Showroom';
  address: string;
  phone: string;
  hours: string;
  mapUrl: string; // Used for iframe src
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}