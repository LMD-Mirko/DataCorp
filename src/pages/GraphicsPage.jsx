import React, { Suspense, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Clientes = React.lazy(() => import('./Graficos/Clientes'));
const Peliculas = React.lazy(() => import('./Graficos/Peliculas'));
const Restaurants = React.lazy(() => import('./Graficos/Restaurants'));
const Estudiantes = React.lazy(() => import('./Graficos/Estudiantes'));
const Bancos = React.lazy(() => import('./Graficos/Bancos'));

const GraphicsPage = () => {
  const { isDarkMode } = useTheme();
  const [view, setView] = useState('clientes');

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  const options = useMemo(() => [
    { id: 'clientes', label: 'Clientes' },
    { id: 'peliculas', label: 'Películas' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'bancos', label: 'Bancos' },
  ], []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12 container mx-auto px-4">
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className={`text-4xl font-bold text-center ${textColorClass} mb-6`}>
        Gráficos - Panel
      </motion.h1>

      <p className={`text-lg text-center ${subtextColorClass} mb-8`}>
        Selecciona una categoría para ver los gráficos. Los componentes cargan sus datos desde el API.
      </p>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {options.map(opt => (
          <button key={opt.id} onClick={() => setView(opt.id)} className={`px-4 py-2 rounded-md border ${view===opt.id ? 'bg-blue-600 text-white' : 'bg-white/10'}`}>
            {opt.label}
          </button>
        ))}
      </div>

      <div className="min-h-[360px]">
        <Suspense fallback={<div className="p-6">Cargando vista...</div>}>
          {view === 'clientes' && <Clientes />}
          {view === 'peliculas' && <Peliculas />}
          {view === 'restaurants' && <Restaurants />}
          {view === 'estudiantes' && <Estudiantes />}
          {view === 'bancos' && <Bancos />}
        </Suspense>
      </div>
    </motion.div>
  );
};

export default GraphicsPage;