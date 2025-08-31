import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, colorOptions } from '../contexts/ThemeContext';
import { Settings, Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { isDarkMode, toggleDarkMode, primaryColor, setPrimaryColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colorNames = Object.keys(colorOptions);

  return (
    <motion.div
      className="fixed top-24 right-4 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.5 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {isOpen && (
        <motion.div
          className="mt-3 p-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
            <span className="text-gray-700 font-medium">Modo {isDarkMode ? 'Oscuro' : 'Claro'}</span>
          </div>

          {/* Color Picker */}
          <div className="flex flex-wrap justify-center gap-2">
            {colorNames.map((colorName) => (
              <motion.button
                key={colorName}
                onClick={() => setPrimaryColor(colorName)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  primaryColor === colorName ? `border-${colorName}-500 ring-2 ring-${colorName}-300` : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: `var(--tw-colors-${colorName}-600)` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThemeSwitcher;