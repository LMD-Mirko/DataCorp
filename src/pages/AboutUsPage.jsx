import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Target, Lightbulb, Shield, BarChart, Trophy } from 'lucide-react';

const AboutUsPage = () => {
  const { isDarkMode, colors } = useTheme();

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgClass = isDarkMode ? 'bg-gray-800/80' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const primaryColorClass = `text-${colors.primary}-600`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-12"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className={`text-5xl font-extrabold text-center ${textColorClass} mb-8`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Sobre <span className={primaryColorClass}>Nosotros</span>
        </motion.h1>
        <motion.p
          className={`text-xl ${subtextColorClass} text-center max-w-3xl mx-auto mb-12`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Conoce al equipo detrás de DataCorp y nuestra misión de transformar el futuro de los negocios.
        </motion.p>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-16`}>
          <motion.div
            className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold ${textColorClass} mb-6`}>
              ¿Quiénes <span className={primaryColorClass}>Somos?</span>
            </h2>
            <p className={`${subtextColorClass} mb-4 text-lg leading-relaxed`}>
              DataCorp es una empresa líder en soluciones de datos y tecnología, dedicada a convertir la información en valor estratégico para empresas de todo tamaño, ayudándolas a crecer y tomar mejores decisiones.
              </p>
            <p className={`${subtextColorClass} mb-4 text-lg leading-relaxed`}>
              Nuestro equipo de expertos en análisis de datos, desarrollo de software e inteligencia artificial brinda soluciones personalizadas, innovadoras y seguras, generando un impacto real y medible en cada proyecto.
              </p>
          </motion.div>

          <motion.div
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000"
              alt="Equipo de DataCorp"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>
        </div>

        <motion.div
          className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass} mb-16`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className={`text-4xl font-bold ${textColorClass} mb-6 text-center`}>
            Nuestra <span className={primaryColorClass}>Misión</span>
          </h2>
          <p className={`${subtextColorClass} text-lg leading-relaxed text-center max-w-4xl mx-auto`}>
            Nuestra misión es clara: transformar datos en valor. Creemos que cada empresa, independientemente de su tamaño, merece acceso a la información que le permita tomar decisiones más inteligentes, optimizar operaciones y descubrir nuevas oportunidades de crecimiento. Nos esforzamos por ser el puente entre tus datos y tu éxito.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass} text-center`}>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 text-blue-600"
              whileHover={{ scale: 1.1 }}
            >
              <Users size={32} />
            </motion.div>
            <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>+1000</span>
            </h2>
            <p className={`${subtextColorClass}`}>Clientes Satisfechos</p>
          </div>

          <div className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass} text-center`}>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 text-green-600"
              whileHover={{ scale: 1.1 }}
            >
              <BarChart size={32} />
            </motion.div>
            <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>98%</span>
            </h2>
            <p className={`${subtextColorClass}`}>Tasa de Éxito en Proyectos</p>
          </div>

          <div className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass} text-center`}>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100 text-purple-600"
              whileHover={{ scale: 1.1 }}
            >
              <Trophy size={32} />
            </motion.div>
            <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>15+</span>
            </h2>
            <p className={`${subtextColorClass}`}>Años de Experiencia</p>
          </div>
        </motion.div>

        <motion.div
          className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass} mb-16`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h2 className={`text-4xl font-bold ${textColorClass} mb-8 text-center`}>
            Nuestros <span className={primaryColorClass}>Valores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-100 text-red-600"
                whileHover={{ scale: 1.1 }}
              >
                <Target size={32} />
              </motion.div>
              <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>Excelencia</span>
            </h2>
              <p className={`${subtextColorClass}`}>Buscamos la perfección en cada proyecto y solución que entregamos.</p>
            </div>

            <div className="text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-yellow-100 text-yellow-600"
                whileHover={{ scale: 1.1 }}
              >
                <Lightbulb size={32} />
              </motion.div>
              <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>Innovación</span>
            </h2>
              <p className={`${subtextColorClass}`}>Constantemente exploramos nuevas tecnologías y metodologías.</p>
            </div>

            <div className="text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-teal-100 text-teal-600"
                whileHover={{ scale: 1.1 }}
              >
                <Users size={32} />
              </motion.div>
              <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>Colaboración</span>
            </h2>
              <p className={`${subtextColorClass}`}>Trabajamos en estrecha colaboración con nuestros clientes.</p>
            </div>

            <div className="text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100 text-indigo-600"
                whileHover={{ scale: 1.1 }}
              >
                <Shield size={32} />
              </motion.div>
              <h2 className={`text-2xl font-bold ${textColorClass} mb-6`}>
              <span className={primaryColorClass}>Integridad</span>
            </h2>
              <p className={`${subtextColorClass}`}>Mantenemos los más altos estándares éticos en todo lo que hacemos.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`${cardBgClass} p-8 rounded-3xl shadow-xl ${cardBorderClass}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <h2 className={`text-4xl font-bold ${textColorClass} mb-6`}>
            ¿Qué <span className={primaryColorClass}>Somos?</span>
          </h2>
          <ul className={`${subtextColorClass} grid grid-cols-1 md:grid-cols-2 gap-4 text-lg`}>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Convertimos datos complejos en visualizaciones y reportes fáciles de entender.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Automatizamos procesos y optimizamos flujos de trabajo para ahorrarte tiempo y recursos.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Identificamos tendencias y oportunidades que impulsan la expansión de tu negocio.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Implementamos las mejores prácticas para proteger tu información más sensible.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Te mantenemos a la vanguardia con las últimas tecnologías y metodologías.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Ofrecemos soporte dedicado y acompañamiento en cada etapa de tu transformación digital.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;