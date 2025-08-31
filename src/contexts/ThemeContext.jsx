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

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);