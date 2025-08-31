import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Send, Power, PowerOff, Bot, User } from 'lucide-react';

const DataCorpBotPage = () => {
  const { isDarkMode, colors } = useTheme();
  const [message, setMessage] = useState('');
  const [isServerConnected, setIsServerConnected] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const predefinedQueries = [
    { text: 'Servicios de DataCorp', response: 'Ofrecemos servicios de análisis de datos, inteligencia artificial, desarrollo de software y consultoría tecnológica.' },
    { text: 'Productos DataCorp', response: 'Nuestros productos incluyen soluciones de Business Intelligence, plataformas de Machine Learning y sistemas de automatización empresarial.' },
    { text: 'Contacto', response: 'Puedes contactarnos a través de info@datacorp.com o llamando al (+51) 906 936 891.' },
    { text: 'Ubicación', response: 'Nuestra sede principal está en Lima-Perú, con oficinas en Los Olivos y San Martín de Porres.' },
    { text: 'Horario de atención', response: 'Atendemos de lunes a viernes, de 9:00 AM a 6:00 PM (hora local).' }
  ];

  useEffect(() => {
    setChatHistory([{
      type: 'bot',
      content: '¡Hola! Soy DataCorpBot. Pregúntame sobre servicios, productos o contacto 📊🤖'
    }]);

    const interval = setInterval(() => {
      setIsServerConnected(prev => !prev);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const textColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const bgClass = isDarkMode ? 'bg-gray-950' : 'bg-white';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);

    setTimeout(() => {
      const predefinedQuery = predefinedQueries.find(
        query => query.text.toLowerCase().includes(userMessage.toLowerCase())
      );

      if (predefinedQuery) {
        setChatHistory(prev => [...prev, {
          type: 'bot',
          content: predefinedQuery.response
        }]);
      } else {
        setChatHistory(prev => [...prev, {
          type: 'bot',
          content: `No encontré información sobre "${userMessage}". Pero puedo ayudarte con *servicios, productos o contacto*.`
        }]);
      }
    }, 1000);

    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-12 container mx-auto px-4 max-w-4xl"
    >
      {/* HEADER sticky */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-20 z-20 flex items-center justify-between bg-gradient-to-r from-${colors.primary}-600 to-${colors.primary}-800 text-white px-6 py-3 rounded-2xl shadow-lg`}
      >
        <div className="flex items-center gap-3">
          <Bot className="animate-bounce" size={28} />
          <h1 className="text-2xl font-bold tracking-tight">DataCorpBot</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {isServerConnected ? (
            <>
              <Power className="text-green-400 animate-pulse" size={18} />
              <span>Conectado</span>
            </>
          ) : (
            <>
              <PowerOff className="text-red-400" size={18} />
              <span>Desconectado</span>
            </>
          )}
        </div>
      </motion.div>

      {/* BOTONES DE ACCESO RÁPIDO */}
      <div className="flex flex-wrap gap-3 mt-6 mb-6 justify-center">
        {predefinedQueries.map((query, index) => (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            key={index}
            onClick={() => {
              setMessage(query.text);
              handleSubmit({ preventDefault: () => {} });
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md 
              bg-gradient-to-r from-${colors.primary}-500 to-${colors.primary}-700 text-white`}
          >
            {query.text}
          </motion.button>
        ))}
      </div>

      {/* CHAT WINDOW */}
      <div className={`${bgClass} rounded-3xl shadow-2xl border ${borderClass} p-6 relative`}>
        <div className="h-[500px] overflow-y-auto mb-4 space-y-5 pr-2 custom-scrollbar">
          {chatHistory.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.type === 'user' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end gap-3 max-w-[75%]">
                {msg.type === 'bot' && (
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full bg-${colors.primary}-600 text-white shadow-md`}>
                    <Bot size={18} />
                  </div>
                )}
                <div
                  className={`px-5 py-3 rounded-2xl text-base leading-relaxed shadow-md ${
                    msg.type === 'user'
                      ? `bg-gradient-to-r from-${colors.primary}-500 to-${colors.primary}-700 text-white`
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100'
                        : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.type === 'user' && (
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full bg-${colors.primary}-600 text-white shadow-md`}>
                    <User size={18} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* INPUT AREA */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className={`flex-1 p-4 rounded-2xl border ${borderClass} ${bgClass} ${textColorClass} focus:outline-none focus:ring-2 focus:ring-${colors.primary}-500`}
          />
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className={`p-4 rounded-2xl bg-gradient-to-r from-${colors.primary}-500 to-${colors.primary}-700 text-white shadow-lg`}
          >
            <Send size={22} />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default DataCorpBotPage;
