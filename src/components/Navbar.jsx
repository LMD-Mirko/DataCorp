import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Home, LayoutDashboard, Users, Kanban, LineChart, Bot } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, colors } = useTheme();

  const navLinks = [
    { to: '/', text: 'Inicio', icon: Home },
    { to: '/sobre-nosotros', text: 'Sobre Nosotros', icon: Users },
    { to: '/servicios', text: 'Servicios', icon: LayoutDashboard },
    { to: '/productos', text: 'Proyectos', icon: Kanban },
    { to: '/graficos', text: 'Gráficos', icon: LineChart },
    { to: '/datacorpbot', text: 'DataCorpBot', icon: Bot },
  ];

  const bgClass = isDarkMode ? 'bg-gray-900/95' : 'bg-white/95';
  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <nav className={`fixed w-full z-50 ${bgClass} backdrop-blur-sm border-b ${borderClass}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className={`text-2xl font-bold ${textColorClass} hover:text-${colors.primary}-600 transition-colors`}
          >
            DataCorp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${textColorClass} hover:text-${colors.primary}-600 transition-colors text-lg font-medium py-2 flex items-center gap-2`}
              >
                <link.icon size={20} />
                {link.text}
              </Link>
            ))}
            <a
              href="https://github.com/LMD-Mirko/DataCorp"
              target="_blank"
              rel="noopener noreferrer"
              className={`${textColorClass} hover:text-${colors.primary}-600 transition-colors ml-6`}
            >
              <Github size={24} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColorClass} p-2 hover:text-${colors.primary}-600 transition-colors`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${bgClass}`}
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block ${textColorClass} hover:text-${colors.primary}-600 transition-colors text-lg font-medium py-2 flex items-center gap-2`}
                >
                  <link.icon size={20} />
                  {link.text}
                </Link>
              ))}
              <a
                href="https://github.com/LMD-Mirko/DataCorp"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${textColorClass} hover:text-${colors.primary}-600 transition-colors py-2 flex items-center gap-2`}
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;