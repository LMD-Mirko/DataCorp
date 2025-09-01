import React from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '../components/HeroCarousel';
import { useTheme } from '../contexts/ThemeContext';
import { Star, Users, Award, TrendingUp, ArrowRight, Brain, Cpu, Headphones, BarChart3, Shield } from 'lucide-react';

const HomePage = () => {
  const { isDarkMode, colors } = useTheme();

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgClass = isDarkMode ? 'bg-gray-800/80' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const buttonBgClass = `bg-${colors.primary}-600`;
  const buttonHoverClass = `hover:bg-${colors.primary}-700`;
  const primaryColorClass = `text-${colors.primary}-600`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-12"
    >
      <div className="container mx-auto px-4">
        <HeroCarousel />

        {/* --- SECCIÓN DE POR QUÉ ELEGIR DATACORP --- */}
        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className={`text-4xl font-bold ${textColorClass} mb-6`}>
            ¿Por qué elegir <span className={primaryColorClass}>DataCorp?</span>
          </h2>
          <p className={`${subtextColorClass} text-lg max-w-3xl mx-auto mb-10`}>
            En DataCorp, combinamos experiencia, innovación y un enfoque centrado en el cliente para ofrecer soluciones que realmente marcan la diferencia.
          </p>

          {/* GRID DE FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Expertos en Datos */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6 mx-auto">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Expertos <span className={primaryColorClass}>en Datos</span>
              </h3>
              <p className={subtextColorClass}>
                Nuestro equipo de especialistas transforma datos complejos en información valiosa y accionable para tu negocio.
              </p>
            </motion.div>

            {/* Tecnología de Vanguardia */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6 mx-auto">
                <Cpu className="w-8 h-8 text-green-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Tecnología <span className={primaryColorClass}>de Vanguardia</span>
              </h3>
              <p className={subtextColorClass}>
                Utilizamos las herramientas y plataformas más avanzadas para garantizar resultados precisos y eficientes.
              </p>
            </motion.div>

            {/* Soporte Dedicado */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6 mx-auto">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Soporte <span className={primaryColorClass}>Dedicado</span>
              </h3>
              <p className={subtextColorClass}>
                Estamos contigo en cada paso, ofreciendo un soporte personalizado y soluciones adaptadas a tus necesidades.
              </p>
            </motion.div>

            {/* Análisis Estratégico */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6 mx-auto">
                <BarChart3 className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Análisis <span className={primaryColorClass}>Estratégico</span>
              </h3>
              <p className={subtextColorClass}>
                Generamos reportes claros y detallados que impulsan decisiones basadas en evidencia real.
              </p>
            </motion.div>

            {/* Seguridad Garantizada */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6 mx-auto">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Seguridad <span className={primaryColorClass}>Garantizada</span>
              </h3>
              <p className={subtextColorClass}>
                Protegemos la confidencialidad y la integridad de tus datos con las mejores prácticas en ciberseguridad.
              </p>
            </motion.div>

            {/* Trabajo Colaborativo */}
            <motion.div
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6 mx-auto">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className={`text-2xl font-bold ${textColorClass} mb-4`}>
                Trabajo <span className={primaryColorClass}>Colaborativo</span>
              </h3>
              <p className={subtextColorClass}>
                Unimos la experiencia de nuestro equipo con la visión de tu empresa para alcanzar resultados sobresalientes.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* --- CTA FINAL --- */}
        <motion.section
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className={`${cardBgClass} p-12 rounded-3xl shadow-xl ${cardBorderClass} text-center`}>
            <h2 className={`text-4xl font-bold ${textColorClass} mb-6`}>
              Comienza Tu <span className={primaryColorClass}>Transformación Digital </span>Hoy
            </h2>
            <p className={`${subtextColorClass} text-lg max-w-2xl mx-auto mb-8`}>
              Únete a más de 1000 empresas que ya están aprovechando el poder de sus datos con DataCorp.
            </p>
            <motion.button
              className={`${buttonBgClass} ${buttonHoverClass} text-white px-8 py-4 rounded-full font-semibold inline-flex items-center space-x-2 transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Solicita una Demo Gratuita</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default HomePage;
