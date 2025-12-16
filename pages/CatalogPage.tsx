import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts, getStrapiImageUrl } from '../services/strapi';

const CatalogPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('cat');

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts(categoryFilter || undefined);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar productos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryFilter]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <p className="text-gray-600 mt-2">Asegúrate de que Strapi esté corriendo en http://localhost:1337</p>
        </div>
      </div>
    );
  }

  const normalizedProducts = (products || [])
    .filter(Boolean)
    .map(product => (product?.attributes ? product : { ...product, attributes: product }))
    .filter(product => product?.attributes);

  const hasProducts = normalizedProducts.length > 0;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {categoryFilter ? `Catálogo: ${categoryFilter}` : 'Catálogo Completo'}
        </h1>

        {!hasProducts ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {normalizedProducts.map(product => {
              const attributes = product.attributes || product || {};
              const imagesData = attributes.images?.data ?? attributes.images;
              const imageUrl = getStrapiImageUrl(imagesData);
              const categoryData = attributes.category?.data?.attributes || attributes.category;
              const categoryName = categoryData?.name || 'Sin categoría';
              const priceValue = attributes.price ?? attributes.Price;

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={attributes.name || 'Producto'} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wide">{categoryName}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{attributes.name || 'Producto sin nombre'}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{attributes.description || 'Sin descripción'}</p>
                    {priceValue !== undefined && priceValue !== null && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-lg font-bold text-brand-red">${priceValue}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;