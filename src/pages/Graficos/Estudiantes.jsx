import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { motion } from 'framer-motion';
import { API_BASE } from '../../config/api';
import { useTheme } from '../../contexts/ThemeContext';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';

const Estudiantes = () => {
  const { isDarkMode } = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(API_BASE + 'estudiantes')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(json => { if (!mounted) return; setRows(Array.isArray(json?.data) ? json.data : []); })
      .catch(err => { if (!mounted) return; setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, []);

  const nivoTheme = getNivoTheme(isDarkMode);
  const palette = getPalette(isDarkMode);

  const cardClass = `p-4 rounded-xl shadow-lg border border-gray-200/10 transition-transform hover:scale-[1.01] ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/70'} h-full flex flex-col overflow-hidden`;

  const studyVsScore = useMemo(() => rows.map(r => ({ x: Number(r.study_hours_per_day||0), y: Number(r.exam_score||0), id: r.student_id || r._id })), [rows]);

  const avgScoreByParentalEducation = useMemo(() => {
    const m = {};
    rows.forEach(r => {
      const edu = r.parental_education_level || 'unknown';
      if (!m[edu]) m[edu] = { total: 0, count: 0 };
      m[edu].total += Number(r.exam_score || 0);
      m[edu].count++;
    });
    return Object.keys(m).map(k => ({ education: k, score: m[k].total / m[k].count }));
  }, [rows]);

  const socialMediaBuckets = useMemo(() => {
    const buckets = { '0-1h': 0, '1-2h': 0, '2-4h': 0, '>4h': 0 };
    rows.forEach(r => {
      const h = Number(r.social_media_hours || 0);
      if (h <= 1) buckets['0-1h']++;
      else if (h <= 2) buckets['1-2h']++;
      else if (h <= 4) buckets['2-4h']++;
      else buckets['>4h']++;
    });
    return Object.keys(buckets).map(k => ({ category: k, count: buckets[k] }));
  }, [rows]);

  const partTimeJobCounts = useMemo(() => {
    const m = {};
    rows.forEach(r => { const j = r.part_time_job || 'unknown'; m[j] = (m[j]||0) + 1; });
    return Object.keys(m).map(k => ({ id: k, label: k, value: m[k] }));
  }, [rows]);

  const genderVsScore = useMemo(() => {
    const m = {};
    rows.forEach(r => {
        const gender = r.gender || 'unknown';
        if (!m[gender]) m[gender] = { total: 0, count: 0 };
        m[gender].total += Number(r.exam_score || 0);
        m[gender].count++;
    });
    return Object.keys(m).map(k => ({ gender: k, score: m[k].total / m[k].count }));
  }, [rows]);

  if (loading) return <div className="p-6">Cargando Datos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="p-4 bg-white/5 rounded shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Horas de estudio vs Puntaje</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveScatterPlot theme={nivoTheme} data={[{ id: 'Estudiantes', data: studyVsScore }]} margin={{ top: 18, right: 18, bottom: 80, left: 80 }} nodeSize={8} colors={palette} useMesh={true} tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff', color:isDarkMode?'#E5E7EB':'#0F172A'}}><div>Horas: {node.data.x}</div><div>Puntaje: {node.data.y}</div></div>)} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Trabajo a tiempo parcial</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsivePie theme={nivoTheme} data={partTimeJobCounts} innerRadius={0.6} colors={palette} margin={{ top: 8, right: 32, bottom: 8, left: 32 }} padAngle={0.6} cornerRadius={6} enableArcLabels={false} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Puntaje por Nivel Educativo Parental</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={avgScoreByParentalEducation} keys={[ 'score' ]} indexBy="education" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Puntaje Promedio', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Uso de Redes Sociales</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveBar theme={nivoTheme} data={socialMediaBuckets} keys={[ 'count' ]} indexBy="category" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Alumnos', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Género vs Puntaje promedio</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              <ResponsiveBar theme={nivoTheme} data={genderVsScore} keys={[ 'score' ]} indexBy="gender" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Puntaje Promedio', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Estudiantes;
