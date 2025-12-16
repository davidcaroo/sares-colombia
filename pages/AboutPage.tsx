import React from 'react';
import { CheckCircle, Footprints, Users, Map } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import HavaianasHeart from '../components/HavaianasHeart';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Title Header with light Red background */}
      <div className="bg-red-50 py-16 border-b border-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-red mb-6 leading-tight">
            Sares: Más que experiencias, estilos de vida
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light italic">
            "Descubre la comodidad y la sostenibilidad en cada paso."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section 1: Sares Content with Logo */}
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 text-justify">
              <p>
                En <strong>Sares Colombia</strong> somos apasionados por el confort, el estilo y la libertad que brindan unas buenas sandalias. Como distribuidor exclusivo de Havaianas en Colombia, llevamos la esencia del verano, la frescura y la autenticidad brasileña a cada rincón del país.
              </p>
              <p>
                Desde nuestros inicios, nos hemos enfocado en ofrecer productos de alta calidad que combinan diseño, durabilidad y tendencia. Havaianas no solo es una marca de sandalias: es un símbolo de expresión personal, de alegría, y de conexión con lo natural.
              </p>
              <p>
                Contamos con una amplia red de distribución y presencia en tiendas físicas, canales digitales y puntos estratégicos, garantizando que los colombianos puedan acceder fácilmente a su par perfecto de Havaianas.
              </p>
            </div>
          </div>

          {/* Logo Section - Professional Visual Representation (uses public/havaianas-logo.svg) */}
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center items-center">
            <div className="w-full max-w-md p-6 border border-gray-100 rounded-2xl shadow-sm bg-white flex flex-col items-center justify-center hover:shadow-md transition-shadow group">
              <img src="/Sares-autorizado.jpeg" alt="Sares distribuidor autorizado" className="w-48 h-48 object-contain" />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Distribuidor autorizado</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Havaianas Brand Details */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center bg-white border border-gray-100 p-8 rounded-xl shadow-sm mb-24">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre Havaianas</h2>
            <p className="text-gray-600 mb-4">
              Creadas en 1962, Havaianas llevó el espíritu brasileño al mundo a través de su legendaria suela de goma y sus diseños alegres y coloridos. Representan confort, felicidad y libertad.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> <span>Líder mundial en sandalias</span></li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> <span>Suela de goma 100% (no plástico)</span></li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-600" /> <span>Durabilidad superior</span></li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/Logo-havaianas.jpeg" alt="Havaianas logo" className="w-48 h-48 object-contain" />
          </div>
        </div>

        {/* Dynamic Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
          <div className="flex flex-col items-center">
            <Footprints size={64} className="text-brand-red mb-4" />
            <span className="text-5xl font-bold text-gray-900 mb-2">
              +<AnimatedCounter end={300000} />
            </span>
            <p className="text-gray-600 text-lg font-medium">Pies vestidos con comodidad y estilo</p>
          </div>
          <div className="flex flex-col items-center">
            <Users size={64} className="text-brand-red mb-4" />
            <span className="text-5xl font-bold text-gray-900 mb-2">
              +<AnimatedCounter end={600000} />
            </span>
            <p className="text-gray-600 text-lg font-medium">Colombianos usan nuestras chanclas</p>
          </div>
          <div className="flex flex-col items-center">
            <Map size={64} className="text-brand-red mb-4" />
            <span className="text-5xl font-bold text-gray-900 mb-2">
              +<AnimatedCounter end={7} /> Dptos
            </span>
            <p className="text-gray-600 text-lg font-medium">En Colombia nos prefieren</p>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-brand-red mb-6">Misión</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Entregamos a las personas experiencias sensoriales con <span className="font-bold text-gray-800">productos sostenibles y de alta calidad</span>, promoviendo el bienestar individual y social.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-brand-red mb-6">Visión</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Para el <span className="font-bold text-gray-800">2028</span> ser la <span className="font-bold text-gray-800">plataforma de negocios líder en distribución de la región</span>, siendo reconocidos como el principal proveedor de nuestros aliados en Colombia a través de nuestro compromiso con la sostenibilidad, el bienestar de la comunidad y el desarrollo económico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;