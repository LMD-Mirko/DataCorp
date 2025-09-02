import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';
import { API_BASE } from '../../config/api';
import { useTheme } from '../../contexts/ThemeContext';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Bancos = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(API_BASE + 'bancos')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(json => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch(err => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const balanceBuckets = useMemo(() => {
    const buckets = { '<0':0, '0-1000':0, '1000-5000':0, '>5000':0 };
    rows.forEach(r => { const b = Number(r.balance||0); if (b<0) buckets['<0']++; else if (b<1000) buckets['0-1000']++; else if (b<5000) buckets['1000-5000']++; else buckets['>5000']++; });
    return Object.keys(buckets).map(k => ({ category: k, count: buckets[k] }));
  }, [rows]);

  const depositCounts = useMemo(() => {
    const m = {};
    rows.forEach(r => { const d = r.deposit || 'unknown'; m[d] = (m[d]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  const ageBuckets = useMemo(() => {
    const buckets = { '<20':0, '20-30':0, '30-40':0, '40-50':0, '50-60':0, '>60':0 };
    rows.forEach(r => {
      const age = Number(r.age||0);
      if (age < 20) buckets['<20']++;
      else if (age < 30) buckets['20-30']++;
      else if (age < 40) buckets['30-40']++;
      else if (age < 50) buckets['40-50']++;
      else if (age < 60) buckets['50-60']++;
      else buckets['>60']++;
    });
    return Object.keys(buckets).map(k => ({ category: k, count: buckets[k] }));
  }, [rows]);

  const loanCounts = useMemo(() => {
    const m = {};
    rows.forEach(r => { const l = r.loan || 'unknown'; m[l] = (m[l]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  const depositsByEducation = useMemo(() => {
    const educationLevels = [...new Set(rows.map(r => r.education || 'unknown'))];
    const data = educationLevels.map(edu => ({
      education: edu,
      yes: 0,
      no: 0,
    }));
    rows.forEach(r => {
      const eduLevel = data.find(d => d.education === (r.education || 'unknown'));
      if (eduLevel) {
        if (r.deposit === 'yes') eduLevel.yes++;
        else if (r.deposit === 'no') eduLevel.no++;
      }
    });
    return data;
  }, [rows]);

  if (loading) return <div className="p-6">Cargando Datos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Balance (rangos)</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveBar theme={nivoTheme} data={balanceBuckets} keys={[ 'count' ]} indexBy="category" margin={{ top: 18, right: 18, bottom: 100, left: 96 }} colors={palette} axisLeft={{ legend: 'Cuentas', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Distribución de Edades</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveBar theme={nivoTheme} data={ageBuckets} keys={[ 'count' ]} indexBy="category" margin={{ top: 18, right: 18, bottom: 100, left: 96 }} colors={palette} axisLeft={{ legend: 'Clientes', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Deposit (sí/no/unknown)</h3>
        <div style={{ height: 340 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsivePie theme={nivoTheme} data={depositCounts} innerRadius={0.6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} padAngle={0.6} cornerRadius={6} enableArcLabels={false} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Préstamos (sí/no/unknown)</h3>
        <div style={{ height: 340 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsivePie theme={nivoTheme} data={loanCounts} innerRadius={0.6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} padAngle={0.6} cornerRadius={6} enableArcLabels={false} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Depósitos por Nivel Educativo</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar 
                theme={nivoTheme} 
                data={depositsByEducation} 
                keys={[ 'yes', 'no' ]} 
                indexBy="education" 
                margin={{ top: 18, right: 18, bottom: 100, left: 96 }} 
                colors={palette} 
                axisLeft={{ legend: 'Clientes', legendPosition: 'middle', legendOffset: -48 }} 
                padding={0.18}
                groupMode="grouped"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Bancos;
