import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { API_BASE } from '../../config/api';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Peliculas = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(API_BASE + 'peliculas')
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json) => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch((err) => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const fmtCurrency = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const genreCounts = useMemo(() => {
    const m = {};
    rows.forEach(r => { const g = r.genre || 'Unknown'; m[g] = (m[g]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  const budgetGross = useMemo(() => rows.map(r => ({ x: Number(r.budget || 0), y: Number(r.gross || r.recaudacion || 0), z: Number(r.score || 0), id: r.name || r._id })), [rows]);

  // years histogram and bubble data
  const yearsData = useMemo(() => {
    const arr = rows.map(r => {
      const raw = r.year || r.release_year || r.releaseDate || r.release || null;
      const y = raw ? Number(String(raw).slice(0,4)) : NaN;
      return Number.isFinite(y) ? y : null;
    }).filter(Boolean);
    if (!arr.length) return [];
    const counts = {};
    arr.forEach(y => { counts[y] = (counts[y]||0) + 1; });
    const keys = Object.keys(counts).map(k => Number(k)).sort((a,b) => a-b);
    return keys.map(k => ({ year: String(k), count: counts[k] }));
  }, [rows]);

  const bubbleData = useMemo(() => {
    const yrs = rows.map(r => { const raw = r.year || r.release_year || r.releaseDate || r.release || null; const y = raw ? Number(String(raw).slice(0,4)) : NaN; return Number.isFinite(y) ? y : null; }).filter(Boolean);
    const minY = yrs.length ? Math.min(...yrs) : 2000;
    const maxY = yrs.length ? Math.max(...yrs) : 2020;
    const denom = Math.max(1, maxY - minY);
    return rows.map(r => {
      const votes = Number(r.votes || r.vote_count || r.votes_count || 0) || 0;
      const score = Number(r.score || r.rating || 0) || 0;
      const raw = r.year || r.release_year || r.releaseDate || r.release || null;
      const year = raw ? Number(String(raw).slice(0,4)) : minY;
      const norm = (year - minY) / denom;
      return { x: votes, y: score, z: Math.max(1, Math.round(1 + norm * 8)), id: r.name || r._id, year };
    }).filter(d => !Number.isNaN(d.x) && !Number.isNaN(d.y));
  }, [rows]);

  const topRated = useMemo(() => rows.slice().sort((a,b) => (Number(b.score||0) - Number(a.score||0))).slice(0,10).map(r => ({ title: r.name || r._id, score: Number(r.score||0) })) , [rows]);

  if (loading) return <div className="p-6">Cargando películas...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-semibold mb-2">Géneros (conteo)</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className={cardClass}>
            <div className="flex-1"><ResponsivePie theme={nivoTheme} data={genreCounts} innerRadius={0.6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} enableArcLabels={false} padAngle={0.8} cornerRadius={6} /></div>
          </motion.div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Presupuesto vs Recaudación (tamaño = score)</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveScatterPlot
                theme={nivoTheme}
                data={[{ id: 'BG', data: budgetGross.map(d => ({ x: d.x, y: d.y, z: Math.max(1, Math.round(d.z)), id: d.id })) }]}
                margin={{ top: 12, right: 24, bottom: 80, left: 96 }}
                nodeSize={d => Math.min(60, Math.max(8, (d.data.z||1) * 3))}
                colors={palette}
                useMesh={true}
                tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff', color:isDarkMode?'#E5E7EB':'#0F172A'}}><div>Película: {node.data.id}</div><div>Presupuesto: {fmtCurrency(node.data.x)}</div><div>Recaudación: {fmtCurrency(node.data.y)}</div><div>Score: {node.data.z}</div></div>)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Histograma: Años de estreno</h3>
        <div style={{ height: 340 }}>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar
                theme={nivoTheme}
                data={yearsData.map(y => ({ year: y.year, count: y.count }))}
                keys={[ 'count' ]}
                indexBy="year"
                margin={{ top: 12, right: 12, bottom: 100, left: 80 }}
                colors={palette}
                valueFormat={v => v}
                axisBottom={{ tickRotation: -45, legend: 'Año', legendPosition: 'middle', legendOffset: 56 }}
                axisLeft={{ legend: 'Cantidad', legendPosition: 'middle', legendOffset: -60 }}
                padding={0.12}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-0 md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Top 10 por puntuación</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar
                theme={nivoTheme}
                data={topRated.map(t => ({ title: t.title, score: t.score }))}
                keys={[ 'score' ]}
                indexBy="title"
                margin={{ top: 12, right: 12, bottom: 140, left: 180 }}
                layout="horizontal"
                colors={palette}
                valueFormat={v => v}
                axisBottom={{ tickRotation: -45 }}
                padding={0.18}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Burbujas: Votos vs Score (tamaño = año)</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveScatterPlot
                theme={nivoTheme}
                data={[{ id: 'Burbujas', data: bubbleData.map(d => ({ x: d.x, y: d.y, z: d.z, id: d.id })) }]}
                margin={{ top: 12, right: 24, bottom: 80, left: 80 }}
                nodeSize={d => Math.min(80, Math.max(6, (d.data.z||1) * 6))}
                colors={palette}
                useMesh={true}
                tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff', color:isDarkMode?'#E5E7EB':'#0F172A'}}><div>Película: {node.data.id}</div><div>Votos: {node.data.x}</div><div>Score: {node.data.y}</div></div>)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Peliculas;
