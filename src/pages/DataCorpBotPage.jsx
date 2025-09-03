import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Power, PowerOff, RefreshCcw } from 'lucide-react';
import styles from './DataCorpBot.module.css';
import botImg from '../assets/icons8-big-data-99.png';

const API_BASE = 'https://datacorp-api-chatbot.onrender.com/api';

export default function DataCorpBotPage() {
  const [messages, setMessages] = useState([]); // { id, role: 'bot'|'user', text, time }
  const [text, setText] = useState('');
  const [connected, setConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const MAX_MESSAGES = 40;

  useEffect(() => {
    // initial greeting
    setMessages([{ id: Date.now(), role: 'bot', text: '¡Hola! Soy DataCorpBot. Pregúntame sobre servicios, productos o contacto 📊🤖', time: new Date() }]);

    let mounted = true;
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/status`);
        if (!mounted) return;
        setConnected(res.ok);
      } catch (err) {
        if (!mounted) return;
        setConnected(false);
      }
    };

    check();
    const id = setInterval(check, 7000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    // always scroll to bottom when messages change
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const pushMessage = (m) => {
    setMessages(prev => {
      const next = [...prev, { ...m, id: Date.now() }];
      return next.slice(-MAX_MESSAGES);
    });
  };

  const send = async (msg) => {
    if (!msg || !msg.trim()) return;
    pushMessage({ role: 'user', text: msg, time: new Date() });
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: msg }) });
      if (!res.ok) throw new Error('server');
      const data = await res.json();
      const reply = data.respuesta || data.respuesta_text || data.respuesta_markdown || JSON.stringify(data);
      pushMessage({ role: 'bot', text: reply, time: new Date() });
    } catch (err) {
      // fallback
      pushMessage({ role: 'bot', text: 'Lo siento, no puedo conectarme al servicio. Intenta más tarde o revisa tu red.', time: new Date() });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const val = text.trim();
    if (!val) return;
    setText('');
    send(val);
  };

  const handleRestart = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/reiniciar`, { method: 'POST' });
      if (!res.ok) throw new Error('server');
      const data = await res.json();
      setMessages([{ id: Date.now(), role: 'bot', text: data.respuesta || 'Conversación reiniciada.', time: new Date() }]);
    } catch (err) {
      setMessages([{ id: Date.now(), role: 'bot', text: 'No se pudo reiniciar la conversación en el servidor. Reiniciado localmente.', time: new Date() }]);
    }
  };

  return (
    <div className={styles.root} style={{ marginTop: '3rem' }}>
      <div className={styles.container}>
        {/* header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logoBubble}>
              <img src={botImg} alt="DataCorpBot" className={styles.logoImg} />
            </div>
            <div>
              <h1 className={styles.title}>DataCorp Assistant</h1>
              <p className={styles.subtitle}>Asistente especializado en visualización de datos y APIs</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.status}>
              {connected ? <Power className={styles.statusIconConnected}/> : <PowerOff className={styles.statusIconDisconnected}/>}
              <span>{connected ? 'Conectado' : 'Desconectado'}</span>
            </div>
            <button onClick={handleRestart} title="Reiniciar conversación" className={styles.restartBtn}><RefreshCcw size={16}/> Reiniciar</button>
          </div>
        </header>

        {/* body */}
        <div className={styles.body}>
          <div ref={containerRef} className={styles.window} role="log" aria-live="polite" aria-atomic="false">
            {messages.map(m => (
              <div key={m.id} className={`${styles.messageRow} ${m.role === 'user' ? styles.user : styles.bot}`}>
                <div className={styles.messageWrap}> 
                      <div className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : ''}`} role={m.role === 'bot' ? 'article' : 'textbox'}>
                    {m.role === 'bot' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-sm prose-invert">{m.text}</ReactMarkdown>
                    ) : (
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    )}
                  </div>
                  <div className={styles.meta}>{new Date(m.time).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>

          {/* input */}
          <div className={styles.inputArea}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                aria-label="Escribe tu mensaje"
                value={text}
                onChange={e => setText(e.target.value)}
                className={styles.input}
                autoComplete="off"
                spellCheck={true}
                placeholder="Escribe tu mensaje aquí..."
              />
              {/* keep a visually hidden submit for accessibility (Enter) */}
              <button type="submit" disabled={loading} className="sr-only">Send</button>
            </form>

            {/* floating send button */}
            <button aria-label="Enviar mensaje" onClick={handleSubmit} disabled={loading} className={`${styles.sendBtn} ${styles.floatingSend}`}>
              <Send size={20}/> <span className="sr-only">{loading ? 'Enviando' : 'Enviar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
