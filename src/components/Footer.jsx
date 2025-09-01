import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Sección 1: Logo y Descripción */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <LineChart className="w-7 h-7" style={{ color: 'var(--color-primary-400)' }} />
              DataCorp
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu aliado confiable en soluciones minoristas, donde la innovación y la eficiencia se unen para impulsar tu crecimiento.
            </p>
          </div>

          {/* Sección 2: Navegación */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>Inicio</Link></li>
              <li><Link to="/sobre-nosotros" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>Sobre Nosotros</Link></li>
              <li><Link to="/servicios" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>Servicios</Link></li>
              <li><Link to="/productos" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>Proyectos</Link></li>
              <li><Link to="/graficos" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>Gráficos</Link></li>
              <li><Link to="/datacorpbot" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>DataCorpBot</Link></li>
            </ul>
          </div>

          {/* Sección 3: Contacto Rápido */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li><a href="mailto:info@bookworm.com" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>info@datacorp.com</a></li>
              <li><a href="tel:+15551234567" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>(+51) 906 936 891</a></li>
              <li><span className="text-gray-400">Ca. Sta. Mercedes 251, Lima 15103, Perú</span></li>
            </ul>
          </div>

          {/* Sección 4: Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:transition-colors duration-200" style={{ ':hover': { color: 'var(--color-primary-400)' } }}>
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DataCorp. Todos los derechos reservados.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;