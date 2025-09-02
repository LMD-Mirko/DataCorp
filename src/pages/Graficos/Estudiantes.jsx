import React, { useEffect, useMemo, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { motion } from 'framer-motion';
import { API_BASE } from '../../config/api';
import { useTheme } from '../../contexts/ThemeContext';
import { getNivoTheme, getPalette } from '../../config/nivoTheme';
import { GroupedGenderBar, ExerciseMentalLine } from './_helpers';

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

  const attendanceBuckets = useMemo(() => {
    const buckets = { '<60':0, '60-75':0, '75-90':0, '90-100':0 };
    rows.forEach(r => { const a = Number(r.attendance_percentage||r.attendance||0); if (a<60) buckets['<60']++; else if (a<75) buckets['60-75']++; else if (a<90) buckets['75-90']++; else buckets['90-100']++; });
    return Object.keys(buckets).map(k => ({ category: k, count: buckets[k] }));
  }, [rows]);

  const examScores = useMemo(() => rows.map(r => ({ id: r.student_id || r._id || '', score: Number(r.exam_score||r.examScore||0) })), [rows]);

  const studyVsScore = useMemo(() => rows.map(r => ({ x: Number(r.study_hours_per_day||0), y: Number(r.exam_score||r.examScore||0), id: r.student_id || r._id })), [rows]);

  if (loading) return <div className="p-6">Cargando estudiantes...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Horas de estudio vs Puntaje</h3>
        <div style={{ height: 420 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveScatterPlot theme={nivoTheme} data={[{ id: 'Estudiantes', data: studyVsScore }]} margin={{ top: 18, right: 18, bottom: 80, left: 80 }} nodeSize={8} colors={palette} useMesh={true} tooltip={({ node }) => (<div style={{padding:8, background:isDarkMode?'#0b1220':'#fff', color:isDarkMode?'#E5E7EB':'#0F172A'}}><div>Horas: {node.data.x}</div><div>Puntaje: {node.data.y}</div></div>)} /></div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Asistencia (rangos)</h3>
        <div style={{ height: 360 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1"><ResponsiveBar theme={nivoTheme} data={attendanceBuckets} keys={[ 'count' ]} indexBy="category" margin={{ top: 12, right: 12, bottom: 80, left: 80 }} colors={palette} axisLeft={{ legend: 'Alumnos', legendPosition: 'middle', legendOffset: -48 }} padding={0.18} /></div>
          </motion.div>
        </div>
      </div>

      <div className="md:col-span-2 p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Género vs Puntaje promedio</h3>
        <div style={{ height: 380 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              {/* grouped bars: compute avg score by gender */}
              <GroupedGenderBar data={rows} theme={nivoTheme} palette={palette} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="md:col-span-2 p-4 bg-white/5 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Ejercicio vs Salud mental (línea promedio)</h3>
        <div style={{ height: 320 }}>
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={cardClass}>
            <div className="flex-1">
              {/* small line showing exercise frequency vs mental health score aggregated */}
              <ExerciseMentalLine rows={rows} theme={nivoTheme} color={palette[1]} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Estudiantes;
