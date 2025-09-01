/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /bg-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /ring-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /hover:bg-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /hover:text-(blue|red|green|orange|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
}

