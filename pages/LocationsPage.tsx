import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { LOCATIONS } from '../constants';
import { getLocations, getStrapiImageUrl } from '../services/strapi';

const LocationsPage = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLocations() {
      try {
        setLoading(true);
        const data = await getLocations();
        if (!isMounted) return;
        setLocations(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching locations:', err);
        if (isMounted) {
          setError('No se pudieron cargar las ubicaciones.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLocations();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedLocations = useMemo(() => {
    return (locations || [])
      .filter(Boolean)
      .map(location => (location?.attributes ? location : { ...location, attributes: location }))
      .filter(location => location.attributes);
  }, [locations]);

  const fallbackLocations = useMemo(() => LOCATIONS, []);

  const locationsToShow = useMemo(() => {
    if (normalizedLocations.length > 0) {
      return normalizedLocations;
    }

    return fallbackLocations.map(location => ({
      id: location.id,
      attributes: {
        name: location.name,
        type: location.type,
        address: location.address,
        phone: location.phone,
        hours: location.hours,
        map_url: location.mapUrl,
        image: {
          data: [
            {
              attributes: {
                url: location.image,
              },
            },
          ],
        },
      },
    }));
  }, [normalizedLocations, fallbackLocations]);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestras Sedes</h1>
        {error && !loading && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}
        <div className="space-y-12">
          {loading && normalizedLocations.length === 0
            ? Array.from({ length: 2 }).map((_, idx) => (
              <div key={`location-skeleton-${idx}`} className="flex flex-col md:flex-row gap-8 items-center animate-pulse">
                <div className="md:w-1/2 w-full h-[300px] bg-gray-200 rounded-lg" />
                <div className="md:w-1/2 w-full space-y-4">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-48 h-6 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded" />
                    <div className="w-2/3 h-3 bg-gray-200 rounded" />
                    <div className="w-1/2 h-3 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))
            : locationsToShow.map((location, idx) => {
              const attributes = location.attributes || {};
              const mapUrl = attributes.map_url || attributes.mapUrl || '';
              const hasMapEmbed = Boolean(mapUrl);
              const imageSource = attributes.image?.data ?? attributes.image;
              const imageUrl = getStrapiImageUrl(imageSource) || 'https://picsum.photos/seed/location/600/400';
              const typeLabel = attributes.type || attributes.department || 'Ubicación';
              const phoneValue = attributes.phone || 'Sin teléfono';
              const hoursValue = attributes.hours || attributes.opening_hours || 'Horario no disponible';

              return (
                <div
                  key={location.id || idx}
                  className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                >
                  <div className="md:w-1/2 w-full">
                    {hasMapEmbed ? (
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg shadow-md"
                        title={`Mapa ${attributes.name || 'ubicación'}`}
                      ></iframe>
                    ) : (
                      <img
                        src={imageUrl}
                        alt={attributes.name || 'Ubicación'}
                        className="w-full h-[300px] object-cover rounded-lg shadow-md"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 w-full">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold mb-2 uppercase">
                      {typeLabel}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{attributes.name || 'Ubicación en Colombia'}</h3>
                    <div className="space-y-2 text-gray-600">
                      {attributes.address && (
                        <p className="flex items-center gap-2">
                          <MapPin size={18} className="text-brand-red" /> {attributes.address}
                        </p>
                      )}
                      {attributes.city && (
                        <p className="text-sm text-gray-500">{attributes.city}{attributes.department ? `, ${attributes.department}` : ''}</p>
                      )}
                      <p className="flex items-center gap-2">
                        <Phone size={18} className="text-brand-red" /> {phoneValue}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={18} className="text-brand-red" /> {hoursValue}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;