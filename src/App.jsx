import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import GraphicsPage from './pages/GraphicsPage';
import DataCorpBotPage from './pages/DataCorpBotPage';
import ProductsPage from './pages/ProductsPage';
import ThemeSwitcher from './components/ThemeSwitcher';

const AppContent = () => {
  const { isDarkMode, colors } = useTheme();

  const bgColorClass = isDarkMode 
    ? `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700`
    : `bg-gradient-to-br from-${colors.primary}-50 via-${colors.secondary}-50 to-${colors.accent}-50`;

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subtextColorClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen flex flex-col ${bgColorClass} ${textColorClass}`}>
      <Navbar />
      <ThemeSwitcher />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/sobre-nosotros" element={<AboutUsPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/graficos" element={<GraphicsPage />} />
          <Route path="/datacorpbot" element={<DataCorpBotPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;
