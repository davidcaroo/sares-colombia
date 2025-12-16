import React, { useEffect, useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getRepresentatives, getStrapiImageUrl } from '../services/strapi';

const RepsPage = () => {
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReps() {
      try {
        setLoading(true);
        const data = await getRepresentatives();
        if (!isMounted) return;
        setRepresentatives(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching representatives:', err);
        if (isMounted) {
          setError('No se pudieron cargar los representantes');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReps();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedRepresentatives = useMemo(() => {
    return (representatives || [])
      .filter(Boolean)
      .map(rep => (rep?.attributes ? rep : { ...rep, attributes: rep }))
      .filter(rep => rep.attributes);
  }, [representatives]);

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestros Representantes</h1>
        {error && !loading && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading || normalizedRepresentatives.length === 0
            ? Array.from({ length: 3 }).map((_, index) => (
              <div key={`rep-skeleton-${index}`} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center bg-white animate-pulse">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
                <div className="w-24 h-3 bg-gray-200 rounded mb-4" />
                <div className="w-full h-3 bg-gray-200 rounded mb-2" />
                <div className="w-3/4 h-3 bg-gray-200 rounded" />
              </div>
            ))
            : normalizedRepresentatives.map(rep => {
              const attributes = rep.attributes || {};
              const imageSource = attributes.image?.data ?? attributes.image;
              const imageUrl = getStrapiImageUrl(imageSource) || 'https://picsum.photos/seed/rep/200';
              const whatsappValue = attributes.whatsapp || attributes.phone || '';
              const whatsappNumber = typeof whatsappValue === 'string' ? whatsappValue.replace(/[^0-9]/g, '') : '';

              return (
                <div key={rep.id} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition bg-white">
                  <img src={imageUrl} alt={attributes.name || 'Representante'} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-100" />
                  <h3 className="text-lg font-bold text-gray-900">{attributes.name || 'Representante'}</h3>
                  {attributes.role && <span className="text-brand-red text-sm font-medium mb-4">{attributes.role}</span>}
                  <div className="text-sm text-gray-600 space-y-1 mb-6 w-full">
                    {attributes.zone && (
                      <p className="font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-2">{attributes.zone}</p>
                    )}
                    {attributes.phone && <p>{attributes.phone}</p>}
                    {attributes.email && <p>{attributes.email}</p>}
                  </div>

                  {whatsappNumber && (
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition shadow-sm hover:shadow"
                    >
                      <MessageCircle size={18} />
                      Contactar WhatsApp
                    </a>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RepsPage;