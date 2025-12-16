import React, { useState } from 'react';
import { Download, Users, Globe, Store, FileText, ClipboardCheck, Handshake } from 'lucide-react';
import { submitForm } from '../services/strapi';

const WholesalePage = () => {
  const initialFormState = {
    contactName: '',
    businessName: '',
    email: '',
    phone: '',
    location: '',
    businessType: '',
    details: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('loading');
    setFormError(null);

    try {
      await submitForm('wholesale', formData);
      setFormStatus('success');
      setFormData(initialFormState);
    } catch (err: any) {
      setFormStatus('error');
      setFormError(err?.message || 'No logramos enviar tu solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ventas al Por Mayor</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beneficios exclusivos para distribuidores autorizados. Haz crecer tu negocio con Havaianas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 bg-red-50 rounded-xl text-center border border-red-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Catálogos Digitales</h3>
            <p className="text-gray-600">Acceso prioritario a nuevas colecciones y material de marketing.</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl text-center border border-red-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Asesoría Personalizada</h3>
            <p className="text-gray-600">Un ejecutivo de cuenta dedicado te guiará en la selección de tu inventario.</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl text-center border border-red-100 hover:shadow-md transition">
            <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Cobertura Nacional</h3>
            <p className="text-gray-600">Logística eficiente para entregas en cualquier municipio de Colombia.</p>
          </div>
        </div>

        {/* Partnership Request Form Section */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 rounded-full mb-4">
              <Store size={32} className="text-brand-red" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Solicitud de Convenio</h2>
            <p className="text-gray-600 text-lg">
              ¿Quieres vender Havaianas en tu negocio? Completa el siguiente formulario para evaluar tu perfil.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="contactName">Nombre de Contacto</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="businessName">Nombre del Negocio / Razón Social</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                  placeholder="Ej. Boutique El Sol"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="wholesale-email">Correo Electrónico</label>
                <input
                  type="email"
                  id="wholesale-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                  placeholder="correo@negocio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="wholesale-phone">Teléfono / Celular</label>
                <input
                  type="tel"
                  id="wholesale-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                  placeholder="+57 300 000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="wholesale-location">Ubicación (Ciudad y Depto)</label>
                <input
                  type="text"
                  id="wholesale-location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                  placeholder="Ej. Cartagena, Bolívar"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="businessType">Tipo de Negocio</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                >
                  <option value="">Seleccione una opción...</option>
                  <option value="boutique">Boutique / Tienda de Moda</option>
                  <option value="zapateria">Zapatería Especializada</option>
                  <option value="supermercado">Supermercado / Minimarket</option>
                  <option value="ecommerce">Tienda Online / E-commerce</option>
                  <option value="hotel">Hotel / Resort</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="wholesale-details">Detalles Adicionales</label>
              <textarea
                rows={3}
                id="wholesale-details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-3 border bg-white text-gray-900"
                placeholder="Cuéntanos un poco más sobre tu negocio, años en el mercado, ubicación del local, etc."
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className={`w-full md:w-1/2 bg-brand-red text-white text-lg font-bold px-8 py-4 rounded-lg transition shadow-lg transform hover:-translate-y-0.5 ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'}`}
              >
                {formStatus === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
            {formStatus === 'success' && (
              <p className="text-sm text-green-600 text-center">Gracias, recibimos tu solicitud y te contactaremos pronto.</p>
            )}
            {formStatus === 'error' && formError && (
              <p className="text-sm text-red-600 text-center">{formError}</p>
            )}

            <p className="text-xs text-center text-gray-500 mt-4">
              Al enviar este formulario, aceptas que nuestro equipo comercial te contacte para validar la información.
            </p>
          </form>
        </div>

        {/* --- Process Steps Section --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Tu camino para ser Distribuidor</h2>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-200 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white p-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-red-50 shadow-sm">
                  <FileText className="text-brand-red w-10 h-10" />
                </div>
                <span className="text-brand-red font-black text-4xl mb-2 opacity-20">01</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Solicitud</h3>
                <p className="text-gray-600 leading-relaxed">
                  Contacta con el representante de tu zona o déjanos tus datos llenando el formulario anterior.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-white p-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-red-50 shadow-sm">
                  <ClipboardCheck className="text-brand-red w-10 h-10" />
                </div>
                <span className="text-brand-red font-black text-4xl mb-2 opacity-20">02</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Evaluación</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro equipo evaluará tu perfil comercial y nos contactaremos contigo brevemente.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white p-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-red-50 shadow-sm">
                  <Handshake className="text-brand-red w-10 h-10" />
                </div>
                <span className="text-brand-red font-black text-4xl mb-2 opacity-20">03</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Alianza Havaianas</h3>
                <p className="text-gray-600 leading-relaxed">
                  ¡Listo! Empiezas a ser un aliado oficial y accedes a nuestro catálogo exclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WholesalePage;