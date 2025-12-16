import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useContactInfo } from '../hooks/useContactInfo';
import { submitForm } from '../services/strapi';

const ContactPage = () => {
  const { contactInfo, loading, error } = useContactInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('loading');
    setFormError(null);

    try {
      await submitForm('contact', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setFormStatus('error');
      setFormError(err?.message || 'No pudimos enviar tu mensaje. Intenta de nuevo.');
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contáctanos</h1>
            <p className="text-gray-600 mb-8">
              ¿Tienes dudas o quieres realizar un pedido? Completa el formulario y nuestro equipo te responderá en breve.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="contact-name">Nombre Completo</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="contact-phone">Teléfono</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="contact-message">Mensaje</label>
                <textarea
                  rows={4}
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red focus:ring-1 outline-none p-3 border bg-white text-gray-900"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className={`w-full bg-brand-red text-white px-4 py-2 rounded-md font-bold transition ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'}`}
              >
                {formStatus === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {formStatus === 'success' && (
                <p className="text-sm text-green-600 text-center">¡Gracias! Hemos recibido tu mensaje.</p>
              )}
              {formStatus === 'error' && formError && (
                <p className="text-sm text-red-600 text-center">{formError}</p>
              )}
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Información Directa</h3>
              {error && (
                <p className="text-sm text-red-500 mb-4">{error}</p>
              )}
              {loading && !error && (
                <p className="text-sm text-gray-500 mb-4">Cargando datos de contacto...</p>
              )}
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="text-brand-red" />
                  <span>{contactInfo.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-brand-red" />
                  <span>{contactInfo.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-brand-red" />
                  <span>{contactInfo.address}</span>
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