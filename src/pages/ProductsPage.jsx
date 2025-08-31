import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Database, Cloud, Shield, BarChart, Code, Server, Cpu, Network, Bot, X } from 'lucide-react';

const ProductsPage = () => {
  const { isDarkMode, colors } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: 'DataCorp Analytics Suite',
      author: 'DataCorp Enterprise',
      year: '2025',
      description: 'Suite completa de análisis de datos con herramientas avanzadas de visualización y procesamiento en tiempo real.',
      icon: BarChart
    },
    {
      id: 2,
      title: 'Cloud Storage Pro',
      author: 'DataCorp Cloud',
      year: '2025',
      description: 'Almacenamiento en la nube empresarial con encriptación de nivel militar y acceso instantáneo.',
      icon: Cloud
    },
    {
      id: 3,
      title: 'DataGuard Security',
      author: 'DataCorp Security',
      year: '2025',
      description: 'Sistema de seguridad integral para la protección de datos empresariales y personales.',
      icon: Shield
    },
    {
      id: 4,
      title: 'Database Manager Elite',
      author: 'DataCorp Solutions',
      year: '2025',
      description: 'Gestor de bases de datos optimizado para alto rendimiento y escalabilidad.',
      icon: Database
    },
    {
      id: 5,
      title: 'API Integration Hub',
      author: 'DataCorp Dev',
      year: '2025',
      description: 'Plataforma centralizada para la gestión y monitoreo de APIs empresariales.',
      icon: Code
    },
    {
      id: 6,
      title: 'Server Management Pro',
      author: 'DataCorp Infrastructure',
      year: '2025',
      description: 'Sistema integral para la administración y monitoreo de servidores empresariales.',
      icon: Server
    },
    {
      id: 7,
      title: 'AI Processing Engine',
      author: 'DataCorp AI',
      year: '2025',
      description: 'Motor de procesamiento de inteligencia artificial para análisis predictivo y automatización.',
      icon: Cpu
    },
    {
      id: 8,
      title: 'Network Monitor Elite',
      author: 'DataCorp Networks',
      year: '2025',
      description: 'Sistema avanzado de monitoreo y optimización de redes empresariales.',
      icon: Network
    },
    {
      id: 9,
      title: 'ChatBot Enterprise',
      author: 'DataCorp AI',
      year: '2025',
      description: 'Solución de chatbot empresarial con IA para atención al cliente y soporte técnico.',
      icon: Bot
    }
  ];

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Nuestros Productos
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <product.icon
                  className={`w-12 h-12 text-${colors.primary}-500`}
                />
                <span className="text-sm text-gray-500">{product.year}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {product.author}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {product.description}
              </p>
              
              <button
                onClick={() => setSelectedProduct(product)}
                className={`mt-4 px-4 py-2 rounded-md bg-${colors.primary}-500 text-white hover:bg-${colors.primary}-600 transition-colors w-full`}
              >
                Ver Detalles
              </button>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-xl max-w-lg w-full`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <selectedProduct.icon
                      className={`w-12 h-12 text-${colors.primary}-500`}
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedProduct.author}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`text-gray-500 hover:text-${colors.primary}-500 transition-colors`}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mt-4">
                  <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                    {selectedProduct.description}
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-500">
                      Lanzamiento: {selectedProduct.year}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-md bg-${colors.primary}-500 text-white hover:bg-${colors.primary}-600 transition-colors`}
                    >
                      Solicitar Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsPage;