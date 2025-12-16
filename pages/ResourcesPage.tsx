import React, { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp, Send, MessageSquare, HelpCircle } from 'lucide-react';
import { submitForm } from '../services/strapi';

const ResourcesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [suggestionForm, setSuggestionForm] = useState({
    name: '',
    email: '',
    inquiryType: 'Sugerencia General',
    message: '',
  });
  const [suggestionStatus, setSuggestionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSuggestionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSuggestionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuggestionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuggestionStatus('loading');
    setSuggestionError(null);

    try {
      await submitForm('suggestion', suggestionForm);
      setSuggestionStatus('success');
      setSuggestionForm({ name: '', email: '', inquiryType: 'Sugerencia General', message: '' });
    } catch (err: any) {
      setSuggestionStatus('error');
      setSuggestionError(err?.message || 'No logramos enviar tu mensaje. Intenta nuevamente.');
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Recursos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las dudas más comunes o escríbenos directamente si tienes una sugerencia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Columna Izquierda: FAQs Acordeón (Ocupa 2/3 del ancho en pantallas grandes) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="text-brand-red" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
            </div>

            {FAQS.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${openIndex === index ? 'border-brand-red ring-1 ring-brand-red/10' : 'border-gray-200 hover:border-brand-red/50'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <div>
                    <span className="text-xs font-bold text-brand-red uppercase mb-1 block tracking-wider">
                      {faq.category}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`ml-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-red' : ''}`}>
                    <ChevronDown size={24} />
                  </div>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="pt-2 border-t border-gray-100 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Columna Derecha: Buzón de Sugerencias (Ocupa 1/3 del ancho) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <MessageSquare className="text-brand-red" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Buzón de Sugerencias</h2>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                ¿No encontraste lo que buscabas o tienes alguna idea para mejorar nuestro servicio? ¡Queremos escucharte!
              </p>

              <form className="space-y-4" onSubmit={handleSuggestionSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suggestion-name">Nombre</label>
                  <input
                    type="text"
                    id="suggestion-name"
                    name="name"
                    value={suggestionForm.name}
                    onChange={handleSuggestionChange}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-2.5 border bg-white text-gray-900 text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suggestion-email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="suggestion-email"
                    name="email"
                    value={suggestionForm.email}
                    onChange={handleSuggestionChange}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-2.5 border bg-white text-gray-900 text-sm"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suggestion-type">Tipo de Consulta</label>
                  <select
                    id="suggestion-type"
                    name="inquiryType"
                    value={suggestionForm.inquiryType}
                    onChange={handleSuggestionChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-2.5 border bg-white text-gray-900 text-sm"
                  >
                    <option value="Sugerencia General">Sugerencia General</option>
                    <option value="Duda sobre Producto">Duda sobre Producto</option>
                    <option value="Problema con un Pedido">Problema con un Pedido</option>
                    <option value="Felicitación">Felicitación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suggestion-message">Mensaje</label>
                  <textarea
                    rows={4}
                    id="suggestion-message"
                    name="message"
                    value={suggestionForm.message}
                    onChange={handleSuggestionChange}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red p-2.5 border bg-white text-gray-900 text-sm"
                    placeholder="Cuéntanos..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={suggestionStatus === 'loading'}
                  className={`w-full bg-brand-red text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${suggestionStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                  <Send size={18} />
                  {suggestionStatus === 'loading' ? 'Enviando...' : 'Enviar Sugerencia'}
                </button>
                {suggestionStatus === 'success' && (
                  <p className="text-xs text-green-600 text-center">¡Gracias por tu mensaje! Lo revisaremos pronto.</p>
                )}
                {suggestionStatus === 'error' && suggestionError && (
                  <p className="text-xs text-red-600 text-center">{suggestionError}</p>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;