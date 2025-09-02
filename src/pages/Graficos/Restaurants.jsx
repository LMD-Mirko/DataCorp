import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';
import { API_BASE } from '../../config/api';
import { useTheme } from '../../contexts/ThemeContext';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Restaurants = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(API_BASE + 'restaurants')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(json => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch(err => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const salesByLocation = useMemo(() => {
    const m = {};
    rows.forEach(r => { const loc = r.Location || r.Restaurant || 'Unknown'; m[loc] = (m[loc]||0) + (Number(r.Sales)||0); });
    return Object.keys(m).map(k => ({ location: k, sales: m[k] }));
  }, [rows]);

  const unitsByLocation = useMemo(() => {
    const m = {};
    rows.forEach(r => { const loc = r.Location || r.Restaurant || 'Unknown'; m[loc] = (m[loc]||0) + (Number(r.Units)||0); });
    return Object.keys(m).map(k => ({ location: k, units: m[k] }));
  }, [rows]);

  const yoySalesByLocation = useMemo(() => {
    const m = {};
    rows.forEach(r => { 
        const loc = r.Location || r.Restaurant || 'Unknown'; 
        m[loc] = parseFloat(r.YOY_Sales) || 0;
    });
    return Object.keys(m).map(k => ({ location: k, yoySales: m[k] }));
  }, [rows]);

  const unitVolumeByLocation = useMemo(() => {
    const m = {};
    rows.forEach(r => { const loc = r.Location || r.Restaurant || 'Unknown'; m[loc] = (m[loc]||0) + (Number(r.Unit_Volume)||0); });
    return Object.keys(m).map(k => ({ location: k, unitVolume: m[k] }));
  }, [rows]);

  const franchisePie = useMemo(() => {
    const m = {};
    rows.forEach(r => { const f = (r.Franchising || 'No') ; m[f] = (m[f]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  if (loading) return <div className="p-6">Cargando Datos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1">
      {/* Cambiado: eliminado md:col-span-2 */}
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Ventas por Ubicación (en millones)</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={salesByLocation} keys={[ 'sales' ]} indexBy="location" margin={{ top: 18, right: 18, bottom: 120, left: 96 }} colors={palette} axisBottom={{ tickRotation: -45 }} padding={0.22} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cambiado: eliminado md:col-span-2 */}
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Unidades por Ubicación</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={unitsByLocation} keys={[ 'units' ]} indexBy="location" margin={{ top: 18, right: 18, bottom: 120, left: 96 }} colors={palette} axisBottom={{ tickRotation: -45 }} padding={0.22} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Crecimiento de Ventas YOY (%)</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={yoySalesByLocation} keys={[ 'yoySales' ]} indexBy="location" margin={{ top: 18, right: 18, bottom: 120, left: 96 }} colors={palette} axisBottom={{ tickRotation: -45 }} padding={0.22} valueFormat={v => `${v}%`} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Volumen por Unidad</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={unitVolumeByLocation} keys={[ 'unitVolume' ]} indexBy="location" margin={{ top: 18, right: 18, bottom: 120, left: 96 }} colors={palette} axisBottom={{ tickRotation: -45 }} padding={0.22} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cambiado: eliminado md:col-span-2 */}
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Franquiciados vs No</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsivePie theme={nivoTheme} data={franchisePie} innerRadius={0.6} padAngle={0.8} cornerRadius={6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} enableArcLabels={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;