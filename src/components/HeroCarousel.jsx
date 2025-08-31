import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const slides = [
  {
    id: 1,
    title: 'Innovación en Cada Dato',
    description: 'Transformamos la información en oportunidades de negocio. Descubre cómo DataCorp impulsa tu crecimiento.',
    image: 'https://images.unsplash.com/photo-1627931539006-d5c4677e05ea?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Conoce Nuestros Servicios',
    buttonLink: '/servicios'
  },
  {
    id: 2,
    title: 'Soluciones a Medida para Tu Empresa',
    description: 'Desde análisis de mercado hasta optimización de procesos, DataCorp es tu aliado estratégico en el mundo digital.',
    image: 'https://plus.unsplash.com/premium_photo-1661660074116-320af8370765?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Explora Nuestros Productos',
    buttonLink: '/productos'
  },
  {
  id: 3,
  title: 'Decisiones Basadas en Datos',
  description: 'Convierte grandes volúmenes de información en estrategias claras y efectivas para tu negocio.',
  image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0',
  buttonText: 'Ver Casos de Éxito',
  buttonLink: '/casos-exito'
},
{
  id: 4,
  title: 'Tecnología que Impulsa Resultados',
  description: 'Integramos inteligencia artificial y analítica avanzada para llevar tu empresa al siguiente nivel.',
  image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0',
  buttonText: 'Descubre Nuestra Tecnología',
  buttonLink: '/tecnologia'
},
{
  id: 5,
  title: 'Tu Éxito es Nuestro Objetivo',
  description: 'Trabajamos contigo para diseñar soluciones únicas que respondan a las necesidades reales de tu organización.',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0',
  buttonText: 'Contáctanos',
  buttonLink: '/contacto'
}
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { colors } = useTheme();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 md:p-16 text-white">
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-3xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {slides[currentIndex].description}
            </motion.p>
            <motion.a
              href={slides[currentIndex].buttonLink}
              className={`inline-block px-8 py-4 bg-${colors.primary}-600 text-white font-bold rounded-full shadow-lg hover:bg-${colors.primary}-700 transition-all duration-300 w-fit`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              {slides[currentIndex].buttonText}
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-colors duration-300 z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/50 transition-colors duration-300 z-10"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;