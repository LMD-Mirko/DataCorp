import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Search, Shield, Rocket, LayoutDashboard, CheckCircle2, Database, Brain, Code, Cloud, Cpu, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const services = [
  {
    icon: BarChart,
    title: 'Visualización de Datos',
    description: 'Transformamos tus datos crudos en gráficos interactivos y paneles intuitivos para una comprensión clara y rápida.'
  },
  {
    icon: Search,
    title: 'Consultoría Estratégica',
    description: 'Ofrecemos asesoramiento experto para optimizar tus estrategias de negocio basadas en análisis de datos profundos.'
  },
  {
    icon: Shield,
    title: 'Seguridad de la Información',
    description: 'Protegemos tus activos más valiosos con soluciones robustas de ciberseguridad y gestión de riesgos.'
  },
  {
    icon: Rocket,
    title: 'Desarrollo de Soluciones Personalizadas',
    description: 'Creamos herramientas y plataformas a medida para automatizar procesos y potenciar la eficiencia de tu empresa.'
  },
  {
    icon: LayoutDashboard,
    title: 'Análisis Predictivo',
    description: 'Anticipa tendencias y comportamientos futuros con nuestros modelos avanzados de análisis predictivo.'
  },
  {
    icon: CheckCircle2,
    title: 'Integración de Sistemas',
    description: 'Conectamos tus diferentes plataformas y bases de datos para un flujo de información unificado y eficiente.'
  }
];

const products = [
  {
    icon: Database,
    title: 'DataCorp Analytics Suite',
    description: 'Plataforma integral de análisis de datos con herramientas avanzadas de visualización y reportería.'
  },
  {
    icon: Brain,
    title: 'AI Insights Engine',
    description: 'Motor de inteligencia artificial para automatización de procesos y toma de decisiones basada en datos.'
  },
  {
    icon: Code,
    title: 'DataCorp API Gateway',
    description: 'Sistema de gestión de APIs para integración segura y eficiente de servicios empresariales.'
  },
  {
    icon: Cloud,
    title: 'Cloud Data Manager',
    description: 'Solución cloud-native para almacenamiento y procesamiento distribuido de datos empresariales.'
  },
  {
    icon: Cpu,
    title: 'Edge Computing Platform',
    description: 'Plataforma de procesamiento en el borde para análisis en tiempo real y baja latencia.'
  },
  {
    icon: Lock,
    title: 'SecureData Vault',
    description: 'Sistema de encriptación y gestión de datos sensibles con certificación de seguridad empresarial.'
  }
];

const ServicesPage = () => {
  const { isDarkMode, colors } = useTheme();

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgClass = isDarkMode ? 'bg-gray-800/80' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const iconBgClass = `bg-${colors.primary}-100`;
  const iconColorClass = `text-${colors.primary}-600`;
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
          Nuestros <span className={primaryColorClass}>Servicios y Productos</span>
        </motion.h1>
        <motion.p
          className={`text-xl ${subtextColorClass} text-center max-w-3xl mx-auto mb-12`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          En DataCorp, ofrecemos una gama completa de servicios y productos diseñados para potenciar tu negocio en la era digital.
        </motion.p>

        <h2 className={`text-3xl font-bold ${textColorClass} mb-8 mt-12`}>Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass} flex flex-col items-center text-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className={`p-4 ${iconBgClass} rounded-full mb-6`}>
                <service.icon className={`w-10 h-10 ${iconColorClass}`} />
              </div>
              <h3 className={`text-2xl font-semibold ${textColorClass} mb-3`}>{service.title}</h3>
              <p className={subtextColorClass}>{service.description}</p>
            </motion.div>
          ))}
        </div>

        <h2 className={`text-3xl font-bold ${textColorClass} mb-8`}>Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`${cardBgClass} p-8 rounded-2xl shadow-lg ${cardBorderClass} flex flex-col items-center text-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className={`p-4 ${iconBgClass} rounded-full mb-6`}>
                <product.icon className={`w-10 h-10 ${iconColorClass}`} />
              </div>
              <h3 className={`text-2xl font-semibold ${textColorClass} mb-3`}>{product.title}</h3>
              <p className={subtextColorClass}>{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;