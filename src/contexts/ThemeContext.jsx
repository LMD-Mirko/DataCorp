import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const colorOptions = {
  blue: {
    primary: 'blue',
    secondary: 'indigo',
    accent: 'purple',
  },
  red: {
    primary: 'red',
    secondary: 'rose',
    accent: 'pink',
  },
  green: {
    primary: 'green',
    secondary: 'emerald',
    accent: 'teal',
  },
  orange: {
    primary: 'orange',
    secondary: 'amber',
    accent: 'yellow',
  },
  purple: {
    primary: 'purple',
    secondary: 'fuchsia',
    accent: 'violet',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('appDarkMode');
      return storedMode ? JSON.parse(storedMode) : false;
    } catch (error) {
      console.error("Error reading dark mode from localStorage:", error);
      return false;
    }
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    try {
      const storedColor = localStorage.getItem('appPrimaryColor');
      return storedColor && colorOptions[storedColor] ? storedColor : 'blue';
    } catch (error) {
      console.error("Error reading primary color from localStorage:", error);
      return 'blue';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appDarkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error writing dark mode to localStorage:", error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('appPrimaryColor', primaryColor);
    } catch (error) {
      console.error("Error writing primary color to localStorage:", error);
    }
  }, [primaryColor]);

  const theme = {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(prevMode => !prevMode),
    primaryColor,
    setPrimaryColor,
    colors: colorOptions[primaryColor],
  };

  // Apply CSS variables for colors so components can adapt to light/dark and primary color
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDarkMode) {
        root.style.setProperty('--app-bg', '#071226');
        root.style.setProperty('--panel-bg', 'rgba(2,6,23,0.85)');
        root.style.setProperty('--card-bg', 'rgba(255,255,255,0.03)');
        root.style.setProperty('--text-color', '#e6eef6');
        root.style.setProperty('--muted-color', '#9aa6b2');
      } else {
        root.style.setProperty('--app-bg', '#f7fafc');
        root.style.setProperty('--panel-bg', '#ffffff');
        root.style.setProperty('--card-bg', '#f8fafc');
        root.style.setProperty('--text-color', '#0f172a');
        root.style.setProperty('--muted-color', '#6b7280');
      }

      const accents = {
        blue: ['#06b6d4', '#0ea5a4'],
        red: ['#ef4444', '#dc2626'],
        green: ['#34d399', '#10b981'],
        orange: ['#fb923c', '#fb7a0d'],
        purple: ['#a78bfa', '#8b5cf6'],
      };
      const [start, end] = accents[primaryColor] || accents.blue;
      root.style.setProperty('--accent-start', start);
      root.style.setProperty('--accent-end', end);
    } catch (err) {
      console.error('Failed to apply theme variables', err);
    }
  }, [isDarkMode, primaryColor]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);