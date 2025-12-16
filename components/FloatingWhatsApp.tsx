import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Número de teléfono actualizado
  const phoneNumber = "573147260433"; 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Codifica el mensaje para la URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abre WhatsApp en una nueva pestaña
    window.open(url, '_blank');
    
    // Limpia el estado (opcional, dependiendo de si quieres que persista o no)
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Ventana de Chat (Solo visible si isOpen es true) */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header del Chat */}
          <div className="bg-green-500 p-4 text-white flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg leading-tight">Hola! 👋</h3>
              <p className="text-xs text-green-50 mt-1">Escribe tu mensaje y te responderemos en WhatsApp.</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cuerpo del Chat */}
          <div className="p-4 bg-gray-50">
            <form onSubmit={handleSend}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hola, estoy interesado en..."
                className="w-full p-3 rounded-lg border-gray-300 border bg-white text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm resize-none mb-3 shadow-sm h-32"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm transform active:scale-95"
              >
                <Send size={16} />
                Enviar a WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botón Flotante (Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-700 rotate-90' : 'bg-green-500 hover:bg-green-600'
        } text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105`}
        title={isOpen ? "Cerrar" : "Hablar con un asesor"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;