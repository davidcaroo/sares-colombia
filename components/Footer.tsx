import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useContactInfo } from '../hooks/useContactInfo';

const Footer = () => {
  const { contactInfo } = useContactInfo();

  return (
    <footer className="bg-white text-gray-800 pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <span
                className="text-5xl font-black text-brand-red leading-none tracking-tighter block"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                sares
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Distribuidor autorizado de havaianas® con más de 15 años de experiencia llevando confort y estilo a todo el territorio nacional.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/sarescommercial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-red"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/sarescommercial/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-red"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/catalog" className="hover:text-brand-red">Catálogo</Link></li>
              <li><Link to="/wholesale" className="hover:text-brand-red">Ventas al Mayor</Link></li>
              <li><Link to="/reps" className="hover:text-brand-red">Representantes</Link></li>
              <li><Link to="/about" className="hover:text-brand-red">Nosotros</Link></li>
              <li><Link to="/policies" className="hover:text-brand-red">Políticas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Líneas de Producto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/catalog?cat=Mujer" className="hover:text-brand-red">Mujer</Link></li>
              <li><Link to="/catalog?cat=Hombre" className="hover:text-brand-red">Hombre</Link></li>
              <li><Link to="/catalog?cat=Niños" className="hover:text-brand-red">Niños</Link></li>
              <li><Link to="/catalog?cat=Licencias" className="hover:text-brand-red">Licencias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-brand-red" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-red" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-red" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Sares Colombia S.A.S. Todos los derechos reservados.</p>
          <p>
            Desarrollado por <a href="https://davidcaro.vercel.app/" target="_blank" rel="noreferrer" className="text-brand-red hover:underline font-medium">David Caro</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;