import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode, colors } = useTheme();

  const bgColorClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-800';
  const textColorClass = isDarkMode ? 'text-gray-300' : 'text-white';
  const iconColorClass = `text-${colors.primary}-400`;

  return (
    <motion.footer
      className={`${bgColorClass} ${textColorClass} py-10 mt-12`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <Mail className={`w-5 h-5 ${iconColorClass}`} />
            <span>info@datacorp.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className={`w-5 h-5 ${iconColorClass}`} />
            <span>(+51) 906 936 891</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`w-5 h-5 ${iconColorClass}`} />
            <span>Cal. Sta. Mercedes 251, Lima-Perú</span>
          </div>
        </motion.div>

        <motion.p
          className="text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          &copy; {new Date().getFullYear()} DataCorp. Todos los derechos reservados.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;