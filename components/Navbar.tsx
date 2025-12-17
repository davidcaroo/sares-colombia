import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Canal Distributivo B2C', path: '/wholesale' },
    { name: 'Representantes', path: '/reps' },
    { name: 'Ubicaciones', path: '/locations' },
    { name: 'Recursos', path: '/resources' },
    { name: 'Contacto', path: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-brand-red text-white py-1 px-4 text-xs md:text-sm text-center font-medium">
        Distribuidor Autorizado havaianas® en Colombia para el canal B2C | Envíos a todo el país
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              {/* Logo Implementation matching the "sares" red text style */}
              <div className="flex flex-col justify-center">
                <span
                  className="text-5xl font-black text-brand-red leading-none tracking-tighter transition-transform group-hover:scale-105"
                  style={{ fontFamily: '"Times New Roman", Times, serif', paddingBottom: '4px' }}
                >
                  sares
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.35em] leading-none ml-1">
                  Colombia
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-red ${location.pathname === link.path ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-700'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-red-50 text-brand-red' : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;