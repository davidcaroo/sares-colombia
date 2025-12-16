import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { LOCATIONS } from '../constants';

const LocationsPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestras Sedes</h1>
        <div className="space-y-12">
          {LOCATIONS.map((loc, idx) => (
            <div key={loc.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
              <div className="md:w-1/2 w-full">
                <iframe 
                  src={loc.mapUrl} 
                  width="100%" 
                  height="300" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  className="rounded-lg shadow-md"
                  title={`Mapa ${loc.name}`}
                ></iframe>
              </div>
              <div className="md:w-1/2 w-full">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold mb-2 uppercase">{loc.type}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{loc.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2"><MapPin size={18} className="text-brand-red" /> {loc.address}</p>
                  <p className="flex items-center gap-2"><Phone size={18} className="text-brand-red" /> {loc.phone}</p>
                  <p className="flex items-center gap-2"><div className="w-[18px] text-center font-bold text-brand-red">🕒</div> {loc.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;