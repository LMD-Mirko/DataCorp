import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const GraphicsPage = () => {
  const { isDarkMode, colors } = useTheme();

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12 container mx-auto px-4"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className={`text-4xl font-bold text-center ${textColorClass} mb-8`}
      >
        Gráficos
      </motion.h1>
      <motion.p
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className={`text-lg text-center ${subtextColorClass} mb-8`}
      >
        Esta sección está en desarrollo. Próximamente podrás visualizar gráficos interactivos.
      </motion.p>
    </motion.div>
  );
};

export default GraphicsPage;