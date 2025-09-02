// Centralized palettes and Nivo theme factory used by all Graficos components
export const lightPalette = ['#6FB3FF', '#7EE7C7', '#FFD77A', '#F3B6D8', '#C6B7FF', '#A7C7E7'];
export const darkPalette = ['#4D87C8', '#36B08A', '#D4A11A', '#C46A98', '#8F6FEF', '#6AA3C9'];

export function getPalette(isDark) {
  return isDark ? darkPalette : lightPalette;
}

export function getNivoTheme(isDark) {
  return {
    textColor: isDark ? '#E5E7EB' : '#0F172A',
    tooltip: {
      container: {
        background: isDark ? '#0b1220' : '#fff',
        color: isDark ? '#E5E7EB' : '#0F172A',
        fontSize: 12,
        borderRadius: 6,
        padding: '6px 8px',
        boxShadow: isDark ? '0 6px 18px rgba(2,6,23,0.6)' : '0 6px 18px rgba(15,23,42,0.06)'
      },
    },
    axis: {
      legend: { text: { fontSize: 12, fill: isDark ? '#B7C0CC' : '#6B7280' } },
      ticks: { text: { fontSize: 11, fill: isDark ? '#9CA3AF' : '#6B7280' } },
    },
    grid: { line: { stroke: isDark ? '#111827' : '#E6E7EA' } },
    legends: { text: { fill: isDark ? '#E5E7EB' : '#0F172A' } },
  };
}

export default {
  getNivoTheme,
  getPalette,
  lightPalette,
  darkPalette,
};

