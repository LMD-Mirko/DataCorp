import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { motion } from 'framer-motion';
import { API_BASE } from '../../config/api';
import { useTheme } from '../../contexts/ThemeContext';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Peliculas = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(API_BASE + 'peliculas')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(json => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch(err => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const moviesByGenre = useMemo(() => {
    const m = {};
    rows.forEach(r => { const g = r.genre || 'Unknown'; m[g] = (m[g]||0) + 1; });
    return Object.keys(m).map(k => ({ genre: k, count: m[k] }));
  }, [rows]);

  const moviesByDecade = useMemo(() => {
    const buckets = {};
    rows.forEach(r => {
        const year = Number(r.year || 0);
        if (!year) return;
        const decade = Math.floor(year / 10) * 10;
        buckets[decade] = (buckets[decade] || 0) + 1;
    });
    return Object.keys(buckets).map(k => ({ decade: `${k}s`, count: buckets[k] }));
  }, [rows]);

  const budgetVsGross = useMemo(() => rows.map(r => ({ x: Number(r.budget||0), y: Number(r.gross||0), id: r.name })), [rows]);

  const topDirectors = useMemo(() => {
    const m = {};
    rows.forEach(r => { const d = r.director || 'Unknown'; m[d] = (m[d]||0) + 1; });
    return Object.entries(m).sort((a,b) => b[1] - a[1]).slice(0, 10).map(([director, count]) => ({ director, count }));
  }, [rows]);

  const ratingsPie = useMemo(() => {
    const m = {};
    rows.forEach(r => { const r_ = r.rating || 'Unknown'; m[r_] = (m[r_]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  if (loading) return <div className="p-6">Cargando Datos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Presupuesto vs Ganancia</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveScatterPlot theme={nivoTheme} data={[{ id: 'Peliculas', data: budgetVsGross }]} margin={{ top: 18, right: 18, bottom: 80, left: 96 }} nodeSize={8} colors={palette} useMesh={true} tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff', color:isDarkMode?'#E5E7EB':'#0F172A'}}><div>{node.data.id}</div><div>Presupuesto: {node.data.x}</div><div>Ganancia: {node.data.y}</div></div>)} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Películas por Rating</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsivePie theme={nivoTheme} data={ratingsPie} innerRadius={0.6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} padAngle={0.6} cornerRadius={6} enableArcLabels={false} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Películas por Década</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveBar theme={nivoTheme} data={moviesByDecade} keys={[ 'count' ]} indexBy="decade" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Películas', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Películas por Género</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={moviesByGenre} keys={[ 'count' ]} indexBy="genre" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Películas', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Top 10 Directores</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={topDirectors} keys={[ 'count' ]} indexBy="director" margin={{ top: 12, right: 12, bottom: 120, left: 80 }} colors={palette} axisLeft={{ legend: 'Películas', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} axisBottom={{ tickRotation: -45 }} />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Peliculas;
