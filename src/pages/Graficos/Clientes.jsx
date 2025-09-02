import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { API_BASE } from '../../config/api';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Clientes = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(API_BASE + 'clientes')
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((json) => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch((err) => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const fmtCurrency = (v) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const mapGenderToSpanish = (g) => {
    if (!g) return 'No especificado';
    const s = String(g).toLowerCase();
    if (s === 'male' || s === 'm' || s === 'masculino' || s === 'hombre') return 'Hombre';
    if (s === 'female' || s === 'f' || s === 'femenino' || s === 'mujer') return 'Mujer';
    if (s === 'other' || s === 'otro' || s === 'non-binary' || s === 'nonbinary') return 'Otro';
    return g;
  };

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const totalByCategory = useMemo(() => {
    const map = {};
    rows.forEach((r) => { const cat = r['Product Category'] || 'Sin categoría'; const val = Number(r['Total Amount'] || r.Total || 0) || 0; map[cat] = (map[cat]||0) + val; });
    return Object.keys(map).map((k) => ({ category: k, total: map[k] }));
  }, [rows]);

  const quantityByCategory = useMemo(() => {
    const map = {};
    rows.forEach((r) => { const cat = r['Product Category'] || 'Sin categoría'; const q = Number(r.Quantity || 0) || 0; map[cat] = (map[cat]||0) + q; });
    return Object.keys(map).map((k) => ({ category: k, quantity: map[k] }));
  }, [rows]);

  const genderDistribution = useMemo(() => {
    const map = {};
    rows.forEach((r) => { const raw = r.Gender || null; const g = mapGenderToSpanish(raw); map[g] = (map[g]||0) + 1; });
    return Object.keys(map).map((k) => ({ id: k, label: k, value: map[k] }));
  }, [rows]);

  const salesByDate = useMemo(() => {
    const map = {};
    rows.forEach((r) => { const dateRaw = r.Date || r.date || null; const parsed = dateRaw ? new Date(dateRaw) : null; const date = parsed && !isNaN(parsed) ? parsed.toISOString().slice(0,10) : (dateRaw||'Sin fecha'); const val = Number(r['Total Amount'] || r.Total || 0) || 0; map[date] = (map[date]||0) + val; });
    return Object.keys(map).map((k) => ({ x: k, y: map[k] })).sort((a,b) => new Date(a.x) - new Date(b.x));
  }, [rows]);

  const ageVsTotal = useMemo(() => rows.map((r,i) => ({ x: Number(r.Age||0)||0, y: Number(r['Total Amount']||r.Total||0)||0, id: i })).filter(d => !Number.isNaN(d.x) && !Number.isNaN(d.y)), [rows]);

  const priceVsQuantity = useMemo(() => rows.map((r,i) => ({ x: Number(r['Price per Unit']||r['Price']||0)||0, y: Number(r.Quantity||0)||0, id: i })).filter(d => !Number.isNaN(d.x) && !Number.isNaN(d.y)), [rows]);

  if (loading) return <div className="p-6">Cargando clientes...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Ventas por categoría</h3>
        <div style={{ height: 420 }}>
          <div className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar
                theme={nivoTheme}
                data={totalByCategory}
                keys={[ 'total' ]}
                indexBy="category"
                margin={{ top: 18, right: 18, bottom: 100, left: 100 }}
                valueFormat={v => fmtCurrency(v)}
                colors={palette}
                axisBottom={{ tickRotation: -40, legend: 'Categoría', legendPosition: 'middle', legendOffset: 56 }}
                axisLeft={{ legend: 'Ventas', legendPosition: 'middle', legendOffset: -60 }}
                borderRadius={6}
                tooltip={({ id, value, indexValue }) => (<div style={{ padding: 8, background: isDarkMode ? '#0b1220' : '#fff' }}><strong>{indexValue}</strong><div>{fmtCurrency(value)}</div></div>)}
                animate={true}
                motionConfig="gentle"
                padding={0.18}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Distribución de género</h3>
        <div style={{ height: 360 }}>
          <div className={cardClass}>
            <div className="flex-1">
              <ResponsivePie theme={nivoTheme} data={genderDistribution} innerRadius={0.6} colors={palette} margin={{ top: 12, right: 40, bottom: 12, left: 40 }} enableArcLabels={false} padAngle={0.6} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Ventas en el tiempo</h3>
        <div style={{ height: 420 }}>
          <div className={cardClass}>
            <div className="flex-1">
              <ResponsiveLine
                theme={nivoTheme}
                data={[{ id: 'Ventas', data: salesByDate.map(d => ({ x: d.x, y: d.y })) }]}
                xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
                xFormat="time:%Y-%m-%d"
                margin={{ top: 18, right: 80, bottom: 100, left: 100 }}
                axisBottom={{ format: v => (v ? new Date(v).toLocaleDateString('es-ES') : ''), tickValues: 'every 1 month', legend: 'Fecha', legendOffset: 56, legendPosition: 'middle' }}
                colors={[palette[0]]}
                enablePoints={true}
                pointSize={6}
                enableArea={true}
                areaOpacity={0.06}
                tooltip={({ point }) => (
                  <div style={{ padding: 8, background: isDarkMode ? '#0b1220' : '#fff', color: isDarkMode ? '#E5E7EB' : '#0F172A' }}>
                    <div>{point?.data?.x ? new Date(point.data.x).toLocaleDateString('es-ES') : ''}</div>
                    <div>{Number(point?.data?.y || 0).toLocaleString('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</div>
                  </div>
                )}
                animate={true}
                motionConfig="gentle"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Edad vs Gasto</h3>
        <div style={{ height: 320 }}>
          <div className={cardClass}><div className="flex-1"><ResponsiveScatterPlot theme={nivoTheme} data={[{ id: 'Edad vs Gasto', data: ageVsTotal }]} margin={{ top: 12, right: 12, bottom: 60, left: 60 }} colors={palette} nodeSize={8} useMesh={true} tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff'}}><div>Edad: {node.data.x}</div><div>Gasto: {fmtCurrency(node.data.y)}</div></div>)} /></div></div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Precio vs Cantidad</h3>
        <div style={{ height: 320 }}>
          <div className={cardClass}><div className="flex-1"><ResponsiveScatterPlot theme={nivoTheme} data={[{ id: 'Precio vs Cantidad', data: priceVsQuantity }]} margin={{ top: 12, right: 12, bottom: 60, left: 60 }} colors={palette} nodeSize={d => Math.max(6, Math.min(28, (d.data.y || 1) * 0.6))} useMesh={true} tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff'}}><div>Precio: {fmtCurrency(node.data.x)}</div><div>Cantidad: {node.data.y}</div></div>)} /></div></div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
