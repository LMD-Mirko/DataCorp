import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const GraphicsPage = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('http://localhost:4000/api/clientes')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!mounted) return;
        setRows(Array.isArray(json?.data) ? json.data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  const fmtCurrency = (v) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const mapGenderToSpanish = (g) => {
    if (!g) return 'No especificado';
    const s = String(g).toLowerCase();
    if (s === 'male' || s === 'm' || s === 'masculino' || s === 'hombre') return 'Hombre';
    if (s === 'female' || s === 'f' || s === 'femenino' || s === 'mujer') return 'Mujer';
    if (s === 'other' || s === 'otro' || s === 'non-binary' || s === 'nonbinary') return 'Otro';
    return g;
  };

  // Transformaciones
  const totalByCategory = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      const cat = r['Product Category'] || 'Sin categoría';
      const val = Number(r['Total Amount'] || r.Total || 0) || 0;
      map[cat] = map[cat] || 0;
      map[cat] += val;
    });
    return Object.keys(map).map((k) => ({ category: k, total: map[k] }));
  }, [rows]);

  const quantityByCategory = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      const cat = r['Product Category'] || 'Sin categoría';
      const q = Number(r.Quantity || 0) || 0;
      map[cat] = map[cat] || 0;
      map[cat] += q;
    });
    return Object.keys(map).map((k) => ({ category: k, quantity: map[k] }));
  }, [rows]);

  const genderDistribution = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      const raw = r.Gender || null;
      const g = mapGenderToSpanish(raw);
      map[g] = (map[g] || 0) + 1;
    });
    return Object.keys(map).map((k) => ({ id: k, label: k, value: map[k] }));
  }, [rows]);

  const ageVsTotal = useMemo(() =>
    rows
      .map((r, i) => ({ x: Number(r.Age || 0) || 0, y: Number(r['Total Amount'] || r.Total || 0) || 0, id: i }))
      .filter((d) => !Number.isNaN(d.x) && !Number.isNaN(d.y))
  , [rows]);

  const priceVsQuantity = useMemo(() =>
    rows
      .map((r, i) => ({ x: Number(r['Price per Unit'] || r['Price'] || 0) || 0, y: Number(r.Quantity || 0) || 0, id: i }))
      .filter((d) => !Number.isNaN(d.x) && !Number.isNaN(d.y))
  , [rows]);

  const salesByDate = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      const date = r.Date || r.date || 'Sin fecha';
      const val = Number(r['Total Amount'] || r.Total || 0) || 0;
      map[date] = (map[date] || 0) + val;
    });
    return Object.keys(map)
      .map((k) => ({ x: k, y: map[k] }))
      .sort((a, b) => new Date(a.x) - new Date(b.x));
  }, [rows]);

  const avgTicketByCustomer = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      const c = r['Customer ID'] || 'Cliente desconocido';
      const val = Number(r['Total Amount'] || r.Total || 0) || 0;
      map[c] = map[c] || { total: 0, count: 0 };
      map[c].total += val;
      map[c].count += 1;
    });
    return Object.keys(map)
      .map((k) => ({ customer: k, avg: map[k].count ? map[k].total / map[k].count : 0 }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 10);
  }, [rows]);

  if (loading) {
    return (
      <motion.div className="pt-24 pb-12 container mx-auto px-4">
        <h2 className={`text-2xl font-semibold text-center ${textColorClass}`}>Cargando datos...</h2>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="pt-24 pb-12 container mx-auto px-4">
        <h2 className={`text-2xl font-semibold text-center ${textColorClass}`}>Error: {error}</h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12 container mx-auto px-4"
    >
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className={`text-4xl font-bold text-center ${textColorClass} mb-8`}>
        Gráficos (Nivo)
      </motion.h1>

      <p className={`text-lg text-center ${subtextColorClass} mb-8`}>
        Visualizaciones generadas desde la API local. Ejecuta la app localmente para ver los gráficos.
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="p-4 bg-white/5 rounded shadow">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Ventas por categoría</h3>
          <div style={{ height: 320 }}>
            <ResponsiveBar
              data={totalByCategory}
              keys={[ 'total' ]}
              indexBy="category"
              margin={{ top: 20, right: 20, bottom: 80, left: 80 }}
              padding={0.3}
              valueFormat={(v) => fmtCurrency(v)}
              colors={{ scheme: 'purple_blue' }}
              axisBottom={{ tickRotation: -45 }}
              tooltip={({ id, value, indexValue }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <strong>{indexValue}</strong>
                  <div>{fmtCurrency(value)}</div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Distribución de género</h3>
          <div style={{ height: 320 }}>
            <ResponsivePie
              data={genderDistribution}
              margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'set2' }}
              arcLinkLabelsSkipAngle={10}
              arcLabelsSkipAngle={10}
              tooltip={({ datum }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <strong>{datum.id}</strong>
                  <div>{datum.value} transacciones</div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Edad vs Gasto total</h3>
          <div style={{ height: 320 }}>
            <ResponsiveScatterPlot
              data={[ { id: 'Edad vs Gasto', data: ageVsTotal } ]}
              margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
              xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              xFormat=" >-.2f"
              yFormat=" >-.2f"
              axisBottom={{ legend: 'Edad', legendPosition: 'middle', legendOffset: 46 }}
              axisLeft={{ legend: 'Gasto total', legendPosition: 'middle', legendOffset: -60 }}
              tooltip={({ node }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <div>Edad: {node.data.x}</div>
                  <div>Gasto: {fmtCurrency(node.data.y)}</div>
                </div>
              )}
              colors={{ scheme: 'category10' }}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Cantidad vendida por categoría</h3>
          <div style={{ height: 320 }}>
            <ResponsiveBar
              data={quantityByCategory}
              keys={[ 'quantity' ]}
              indexBy="category"
              margin={{ top: 20, right: 20, bottom: 80, left: 80 }}
              padding={0.3}
              valueFormat={(v) => `${v}`}
              colors={{ scheme: 'paired' }}
              axisBottom={{ tickRotation: -45 }}
              tooltip={({ id, value, indexValue }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <strong>{indexValue}</strong>
                  <div>{value} unidades</div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Ventas en el tiempo</h3>
          <div style={{ height: 360 }}>
            <ResponsiveLine
              data={[ { id: 'Ventas', data: salesByDate.map((d) => ({ x: d.x, y: d.y })) } ]}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
              margin={{ top: 20, right: 60, bottom: 80, left: 80 }}
              axisBottom={{ rotate: -45 }}
              colors={{ scheme: 'category10' }}
              tooltip={({ point }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <div>{point.data.x}</div>
                  <div>{fmtCurrency(point.data.y)}</div>
                </div>
              )}
              enablePoints={false}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Ticket promedio por cliente (top 10)</h3>
          <div style={{ height: 360 }}>
            <ResponsiveBar
              data={avgTicketByCustomer.map((d) => ({ customer: d.customer, avg: d.avg }))}
              keys={[ 'avg' ]}
              indexBy="customer"
              margin={{ top: 20, right: 20, bottom: 160, left: 120 }}
              padding={0.3}
              layout="vertical"
              valueFormat={(v) => fmtCurrency(v)}
              colors={{ scheme: 'set3' }}
              axisBottom={{ tickRotation: -90 }}
              tooltip={({ id, value, indexValue }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <strong>{indexValue}</strong>
                  <div>{fmtCurrency(value)}</div>
                </div>
              )}
            />
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>Precio unitario vs cantidad</h3>
          <div style={{ height: 360 }}>
            <ResponsiveScatterPlot
              data={[ { id: 'Precio vs Cantidad', data: priceVsQuantity } ]}
              margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
              xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              axisBottom={{ legend: 'Precio unitario', legendPosition: 'middle', legendOffset: 46 }}
              axisLeft={{ legend: 'Cantidad', legendPosition: 'middle', legendOffset: -60 }}
              tooltip={({ node }) => (
                <div style={{ padding: 8, background: '#222', color: '#fff' }}>
                  <div>Precio: {fmtCurrency(node.data.x)}</div>
                  <div>Cantidad: {node.data.y}</div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GraphicsPage;