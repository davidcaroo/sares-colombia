import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import ClientLogo from '../components/ClientLogo';
import { getBanners, getStrapiImageUrl, getFeaturedProducts, getAllies } from '../services/strapi';
import { REPRESENTATIVES_STATIC } from '../constants';

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [banners, setBanners] = useState<any[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState<string | null>(null);
  const [allies, setAllies] = useState<any[]>([]);
  const [alliesLoading, setAlliesLoading] = useState(true);
  const [alliesError, setAlliesError] = useState<string | null>(null);
  const [representatives, setRepresentatives] = useState<any[]>(REPRESENTATIVES_STATIC);
  const [representativesLoading, setRepresentativesLoading] = useState(false);
  const [representativesError, setRepresentativesError] = useState<string | null>(null);

  // Lógica para auto-scroll en móvil
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      // Solo ejecutar en móvil (cuando el contenido es más ancho que el contenedor)
      if (window.innerWidth < 768 && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        const cardWidth = 280 + 24; // Ancho de la tarjeta + gap
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;

        let nextScroll = currentScroll + cardWidth;

        // Si llegamos al final, volver al inicio
        if (currentScroll >= maxScroll - 10) { // Tolerancia de 10px
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
        }
      }
    };

    const intervalId = setInterval(autoScroll, 3000); // 3 segundos
    return () => clearInterval(intervalId);
  }, []);

  // Cargar banners activos desde Strapi
  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error('Error fetching banners:', err);
        setBannerError('No se pudo cargar el banner dinámico');
      }
    }
    fetchBanners();
  }, []);

  // Productos destacados desde Strapi
  useEffect(() => {
    let isMounted = true;

    async function fetchFeatured() {
      try {
        setFeaturedLoading(true);
        const data = await getFeaturedProducts(4);
        if (!isMounted) return;
        setFeaturedProducts(Array.isArray(data) ? data : []);
        setFeaturedError(null);
      } catch (err: any) {
        console.error('Error fetching featured products:', err);
        if (isMounted) {
          setFeaturedError('No se pudieron cargar los productos destacados');
        }
      } finally {
        if (isMounted) {
          setFeaturedLoading(false);
        }
      }
    }

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  // Aliados desde Strapi
  useEffect(() => {
    let isMounted = true;

    async function fetchAllies() {
      try {
        setAlliesLoading(true);
        const data = await getAllies();
        if (!isMounted) return;
        setAllies(Array.isArray(data) ? data : []);
        setAlliesError(null);
      } catch (err: any) {
        console.error('Error fetching allies:', err);
        if (isMounted) {
          setAlliesError('No se pudieron cargar los aliados');
        }
      } finally {
        if (isMounted) {
          setAlliesLoading(false);
        }
      }
    }

    fetchAllies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Using static representatives for initial launch (from constants)

  const normalizedBanners = useMemo(() => {
    return (banners || [])
      .filter(Boolean)
      .map(banner => (banner?.attributes ? banner : { ...banner, attributes: banner }))
      .filter(banner => banner.attributes);
  }, [banners]);

  const normalizedFeatured = useMemo(() => {
    return (featuredProducts || [])
      .filter(Boolean)
      .map(product => (product?.attributes ? product : { ...product, attributes: product }))
      .filter(product => product.attributes)
      .slice(0, 4);
  }, [featuredProducts]);

  const normalizedAllies = useMemo(() => {
    return (allies || [])
      .filter(Boolean)
      .map(ally => (ally?.attributes ? ally : { ...ally, attributes: ally }))
      .filter(ally => ally.attributes);
  }, [allies]);

  const normalizedRepresentatives = useMemo(() => {
    return (representatives || [])
      .filter(Boolean)
      .map(rep => (rep?.attributes ? rep : { ...rep, attributes: rep }))
      .filter(rep => rep.attributes);
  }, [representatives]);

  const featuredDisplay = useMemo(() => {
    return normalizedFeatured.slice(0, 4);
  }, [normalizedFeatured]);

  const featuredSkeletonCount = useMemo(() => {
    if (featuredLoading) {
      return 4;
    }
    const missing = 4 - featuredDisplay.length;
    return missing > 0 ? missing : 0;
  }, [featuredLoading, featuredDisplay.length]);

  const marqueeAllies = useMemo(() => {
    if (normalizedAllies.length === 0) return [];
    return [...normalizedAllies, ...normalizedAllies];
  }, [normalizedAllies]);

  useEffect(() => {
    if (heroIndex >= normalizedBanners.length && normalizedBanners.length > 0) {
      setHeroIndex(0);
    }
  }, [heroIndex, normalizedBanners.length]);

  useEffect(() => {
    if (normalizedBanners.length < 2) return;
    const slideInterval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % normalizedBanners.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [normalizedBanners.length]);

  const activeBanner = normalizedBanners[heroIndex] || null;
  // Use Strapi banner if available, otherwise fallback to local static banner in public/
  const staticHeroImage = '/banner-sares.webp';
  const heroImage = activeBanner
    ? getStrapiImageUrl(activeBanner.attributes.image?.data ?? activeBanner.attributes.image)
    : staticHeroImage;
  const heroTitle = activeBanner?.attributes?.title || '';
  const heroSubtitle = activeBanner?.attributes?.subtitle || '';
  const heroLink = activeBanner?.attributes?.link || null;
  const showHeroSkeleton = !activeBanner;

  const manualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 280 + 24;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: heroImage ? `url("${heroImage}")` : undefined,
            filter: heroImage ? 'brightness(0.6)' : undefined,
            backgroundColor: heroImage ? undefined : '#111827',
          }}
        ></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          {showHeroSkeleton ? (
            <div className="space-y-6 animate-pulse">
              <div className="w-11/12 mx-auto h-12 bg-white/30 rounded" />
              <div className="w-8/12 mx-auto h-4 bg-white/20 rounded" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <div className="h-12 w-48 bg-white/25 rounded-full" />
                <div className="h-12 w-48 bg-white/10 rounded-full" />
              </div>
            </div>
          ) : (
            <>
              {heroTitle && (
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                  {heroTitle.includes('Havaianas') ? (
                    <>
                      {heroTitle.split('Havaianas')[0]}
                      <span className="text-brand-yellow">Havaianas</span>
                      {heroTitle.split('Havaianas').slice(1).join('Havaianas')}
                    </>
                  ) : (
                    heroTitle
                  )}
                </h1>
              )}

              {heroSubtitle && (
                <p className="text-xl md:text-2xl mb-8 font-light">
                  {heroSubtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {heroLink ? (
                  <a
                    href={heroLink}
                    target={heroLink.startsWith('http') ? '_blank' : undefined}
                    rel={heroLink.startsWith('http') ? 'noreferrer' : undefined}
                    className="bg-brand-red text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    Conocer más <ArrowRight size={20} />
                  </a>
                ) : (
                  <Link to="/reps" className="bg-brand-red text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                    Conocer más <ArrowRight size={20} />
                  </Link>
                )}
              </div>
            </>
          )}

          {bannerError && (
            <p className="mt-4 text-sm text-white/70">{bannerError}</p>
          )}
          {!showHeroSkeleton && normalizedBanners.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {normalizedBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${heroIndex === index ? 'w-10 bg-white' : 'w-6 bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Mostrar banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- REPLACED SECTION: Aliados Estratégicos (Formerly Who We Are) --- */}
      <section className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Aliados que confían en nosotros</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Las grandes superficies y cadenas de retail más importantes del país son nuestros socios estratégicos.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex items-center animate-infinite-scroll w-max">
            {alliesLoading || normalizedAllies.length === 0 ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`ally-skeleton-${index}`}
                  className="flex items-center justify-center w-[200px] h-32 bg-white rounded-xl border border-gray-200 shadow-sm mx-4 animate-pulse"
                >
                  <div className="w-24 h-6 bg-gray-200 rounded" />
                </div>
              ))
            ) : (
              marqueeAllies.map((ally, index) => {
                const attributes = ally.attributes || {};
                const logoData = attributes.logo?.data ?? attributes.logo;
                const logoUrl = getStrapiImageUrl(logoData);
                const website = attributes.website || null;
                const fallbackColor = attributes.color || 'text-gray-900';

                return (
                  <ClientLogo
                    key={`${ally.id ?? 'ally'}-${index}`}
                    name={attributes.name || 'Aliado'}
                    color={fallbackColor}
                    logoUrl={logoUrl}
                    link={website}
                  />
                );
              })
            )}
          </div>
        </div>

        <style>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
        `}</style>
        {!alliesLoading && alliesError && (
          <p className="text-sm text-red-500 text-center mt-6">{alliesError}</p>
        )}
      </section>

      {/* --- KEPT SECTION: Nuestros Asesores por Zona --- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Comerciales por Zona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra a tu representante más cercano y recibe atención personalizada. Contáctanos por teléfono o correo electrónico.
            </p>
          </div>

          <style>{`
            .rep-card{transition: border-color .15s ease, box-shadow .15s ease;}
            .rep-card:hover{border-color: #b91c1c !important; border-width: 0.7px !important; box-shadow: 0 6px 18px rgba(185,28,28,0.08);}
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {representativesLoading || normalizedRepresentatives.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                <div key={`rep-skeleton-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded" />
                      <div className="w-24 h-3 bg-gray-200 rounded" />
                      <div className="w-40 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
              : normalizedRepresentatives.map(rep => {
                const attributes = rep.attributes || rep;
                const rawImage = attributes.image;
                let imageUrl: string | null = null;
                if (rawImage) {
                  if (typeof rawImage === 'string') {
                    imageUrl = rawImage.startsWith('/') || rawImage.startsWith('http') ? rawImage : `/uploads/${rawImage}`;
                  } else {
                    imageUrl = getStrapiImageUrl(rawImage) || null;
                  }
                }
                const finalImage = imageUrl || 'https://picsum.photos/seed/rep/200';
                const whatsappValue = attributes.whatsapp || attributes.phone || '';
                const whatsappNumber = typeof whatsappValue === 'string' ? whatsappValue.replace(/[^0-9]/g, '') : '';

                return (
                  <div key={rep.id} className="rep-card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                    <div className="p-6 flex items-start gap-4">
                      <img src={finalImage} alt={attributes.name || 'Representante'} className="w-16 h-16 rounded-full object-cover border-2 border-brand-red/20" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{attributes.name || 'Representante'}</h3>
                        {attributes.role && <p className="text-brand-red font-medium text-sm">{attributes.role}</p>}
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          {attributes.zone && (
                            <p className="flex items-center gap-1.5 font-semibold text-gray-800">
                              <MapPin size={14} className="text-gray-400" /> {attributes.zone}
                            </p>
                          )}
                          {attributes.phone && (
                            <p className="flex items-center gap-1.5">
                              <Phone size={14} className="text-gray-400" /> {attributes.phone}
                            </p>
                          )}
                          {attributes.email && (
                            <p className="flex items-center gap-1.5">
                              <Mail size={14} className="text-gray-400" /> {attributes.email}
                            </p>
                          )}
                        </div>
                        {whatsappNumber && (
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-white bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition shadow-sm"
                          >
                            <MessageCircle size={16} /> WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {!representativesLoading && representativesError && (
            <p className="text-sm text-red-500 text-center mt-6">{representativesError}</p>
          )}
        </div>
      </section>

      {/* --- NEW SECTION: Featured Products (Slider/Cards) --- */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 px-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Productos de colección</h2>
              <p className="text-gray-600">Descubre los modelos icónicos que definen el estilo havaianas®.</p>
            </div>
            <Link to="/catalog" className="hidden md:flex items-center gap-1 text-brand-red font-bold hover:text-red-700 transition group">
              Ver todo el catálogo <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative group px-2 md:px-0">
            {/* Flechas de Navegación (Solo Móvil) */}
            <button
              onClick={() => manualScroll('left')}
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-brand-red p-2 rounded-full shadow-lg border border-gray-100 hover:bg-white transition-colors focus:outline-none"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => manualScroll('right')}
              className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-brand-red p-2 rounded-full shadow-lg border border-gray-100 hover:bg-white transition-colors focus:outline-none"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredDisplay.map((product, index) => {
                const attributes = product.attributes || {};
                const imageSource = attributes.images?.data ?? attributes.images;
                const imageUrl = getStrapiImageUrl(imageSource) || 'https://picsum.photos/seed/havaianas/500/500';
                const collectionLabel = attributes.collectionLabel || attributes.category?.data?.attributes?.name || 'Colección';
                const categoryLabel = attributes.category?.data?.attributes?.name || 'Unisex';
                const colorsValue = attributes.colors;
                const colorList = Array.isArray(colorsValue)
                  ? colorsValue
                  : typeof colorsValue === 'string'
                    ? colorsValue.split(',').map((color: string) => color.trim()).filter(Boolean)
                    : [];
                const colorCount = colorList.length;
                const productName = attributes.name || 'Producto Havaianas';

                return (
                  <Link
                    key={`${product.id ?? 'featured'}-${index}`}
                    to="/catalog"
                    className="min-w-[280px] md:min-w-0 snap-center group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative overflow-hidden aspect-square bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {collectionLabel}
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{categoryLabel}</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-red transition-colors mb-2">{productName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex -space-x-1">
                          {colorList.slice(0, 3).map((color: string, i: number) => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-300" title={color}></div>
                          ))}
                          {colorCount > 3 && (
                            <div className="w-4 h-4 rounded-full border border-white bg-gray-100 text-[8px] flex items-center justify-center font-bold">
                              +
                            </div>
                          )}
                        </div>
                        <span>{colorCount > 0 ? `${colorCount} Colores` : 'Consulta referencias'}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {featuredSkeletonCount > 0 &&
                Array.from({ length: featuredSkeletonCount }).map((_, index) => (
                  <div
                    key={`featured-skeleton-${index}`}
                    className="min-w-[280px] md:min-w-0 snap-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100 animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="w-20 h-3 bg-gray-200 rounded" />
                      <div className="w-40 h-4 bg-gray-200 rounded" />
                      <div className="w-28 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
            </div>

            {/* CSS para ocultar scrollbar en Webkit (Chrome, Safari, etc) */}
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {!featuredLoading && featuredError && (
            <p className="text-sm text-red-500 mt-6 text-center">
              {featuredError}
            </p>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/catalog" className="inline-flex items-center gap-2 text-brand-red font-bold bg-red-50 px-6 py-3 rounded-full">
              Ver todo el catálogo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-white py-16 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">¿Listo para hacer crecer tu negocio?</h2>
          <p className="text-gray-600 mb-8">
            Únete a nuestra red de distribuidores y ofrece a tus clientes la marca líder mundial en sandalias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wholesale" className="bg-brand-red text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition">
              Ser Distribuidor
            </Link>
            <a href="https://wa.me/573147260433" target="_blank" rel="noreferrer" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;