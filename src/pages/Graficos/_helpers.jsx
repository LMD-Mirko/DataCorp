import React, { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

export const GroupedGenderBar = ({ data = [], theme, palette }) => {
  const agg = useMemo(() => {
    const map = {};
    data.forEach(r => { const g = (r.gender || r.Gender || 'No especificado'); const score = Number(r.exam_score || r.examScore || r.score || 0) || 0; if (!map[g]) map[g] = { gender: g, total: 0, count: 0 }; map[g].total += score; map[g].count += 1; });
    return Object.keys(map).map(k => ({ gender: map[k].gender, avg: map[k].count ? Math.round(map[k].total / map[k].count) : 0 }));
  }, [data]);

  return (
    <ResponsiveBar
      theme={theme}
      data={agg}
      keys={[ 'avg' ]}
      indexBy="gender"
      margin={{ top: 12, right: 12, bottom: 120, left: 80 }}
      colors={palette}
      padding={0.28}
      valueFormat={v => Math.round(v)}
      axisBottom={{ tickRotation: -30 }}
    />
  );
};

export const ExerciseMentalLine = ({ rows = [], theme, color = '#7EE7C7' }) => {
  const series = useMemo(() => {
    // aggregate by exercise frequency (bucket) average mental score
    const b = {};
    rows.forEach(r => {
      const ex = r.exercise_frequency || r.exercise || '0';
      const mh = Number(r.mental_health_score || r.mentalHealth || r.health_score || 0) || 0;
      if (!b[ex]) b[ex] = { total: 0, count: 0 };
      b[ex].total += mh; b[ex].count += 1;
    });
    const keys = Object.keys(b).sort();
    return [{ id: 'Salud mental', data: keys.map(k => ({ x: k, y: b[k].count ? b[k].total / b[k].count : 0 })) }];
  }, [rows]);

  return (
    <ResponsiveLine
      theme={theme}
      data={series}
      margin={{ top: 12, right: 60, bottom: 80, left: 80 }}
      xScale={{ type: 'point' }}
      colors={[ color ]}
      enablePoints={true}
      pointSize={6}
    />
  );
};

export default null;
