import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contáctanos</h1>
            <p className="text-gray-600 mb-8">
              ¿Tienes dudas o quieres realizar un pedido? Completa el formulario y nuestro equipo te responderá en breve.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input 
                  type="tel" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea 
                  rows={4} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-red text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition">
                Enviar Mensaje
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-8">
             <div className="bg-gray-50 p-8 rounded-xl">
               <h3 className="text-xl font-bold mb-4">Información Directa</h3>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3">
                   <Phone className="text-brand-red" />
                   <span>314 7260 433</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <Mail className="text-brand-red" />
                   <span>administracion@sarescol.com</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <MapPin className="text-brand-red" />
                   <span>Centro Comercial e Industrial Ternera 1, Bodega 52, Outlet Sares</span>
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;