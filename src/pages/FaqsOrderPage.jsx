import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/Navbar2';
import { addFaqQuestion } from '../firebase';

export default function FaqsOrderPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isBtnHover, setIsBtnHover] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', question: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await addFaqQuestion(formState);
      if (res.success) {
        setSuccess(true);
        setFormState({ name: '', email: '', question: '' });
      } else {
        setError(res.error || 'Ocurrió un error.');
      }
    } catch (err) {
      setError('Ocurrió un error al enviar tu pregunta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#311B6E',
      color: '#FCFEFE',
      fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>
        {`
          @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes gradientMove2 {
            0%, 100% { background-position: 100% 0%; }
            50% { background-position: 0% 100%; }
          }
          @keyframes gradientMove3 {
            0%, 100% { background-position: 50% 0%; }
            50% { background-position: 50% 100%; }
          }
          @keyframes gradientMove4 {
            0%, 100% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
          }
          @keyframes gradientMove5 {
            0%, 100% { background-position: 100% 50%; }
            50% { background-position: 0% 50%; }
          }
          @keyframes gradientMove6 {
            0%, 100% { background-position: 50% 50%; }
            50% { background-position: 100% 0%; }
          }
        `}
      </style>
      <Navbar2 />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '0 16px',
        paddingTop: isMobile ? '100px' : '0',
        paddingBottom: isMobile ? '40px' : '0'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: 1100,
          gap: 120,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
          {/* Columna izquierda: solo textos */}
          <div style={{
            flex: 1,
            minWidth: 300,
            maxWidth: 540,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            color: '#FCFEFE',
          }}>
            <h1 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? 40 : 60, 
              color: '#FCFEFE', 
              margin: 0, 
              lineHeight: 1.05, 
              fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' 
            }}>
              ¿Tenés Dudas? Transfórmalas en Claridad.
            </h1>
            <h2 style={{ fontWeight: 600, fontSize: 20, color: '#FCFEFE', margin: 0, lineHeight: 1.25, fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }}>
              Un experto de nuestro equipo resolverá tus preguntas para que descubras cómo Fleximy puede impulsar tu marca.
            </h2>
            <p style={{ color: '#FCFEFE', fontSize: 16, margin: 0, lineHeight: 1.6 }}>
              Sabemos que elegir un partner creativo es una decisión clave. Querés seguridad sobre el proceso, los costos y, sobre todo, los resultados. Por eso abrimos este canal directo: un espacio sin compromiso para que preguntes todo lo que necesites saber antes de dar el siguiente paso. Al dejarnos tu consulta, podrás:
            </p>
            <ul style={{ color: '#FCFEFE', fontSize: 15, margin: '12px 0 0 0', padding: 0, lineHeight: 1.7, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>✅</span>
                <span>Recibir una respuesta personalizada</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>✅</span>
                <span>Obtener información sin compromiso</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>✅</span>
                <span>Entender si somos el partner ideal para vos</span>
              </li>
            </ul>
          </div>
          {/* Columna derecha: card con form e imagen arriba */}
          <div style={{
            flex: 1,
            minWidth: 320,
            maxWidth: 420,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '40px 32px 32px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 180,
          }}>
            <img
              src="/form-faqs.png"
              alt="Formulario de preguntas Fleximy"
              style={{
                width: 320,
                height: 'auto',
                objectFit: 'contain',
                position: 'absolute',
                top: -120,
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: 24,
                zIndex: 2,
              }}
            />
            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="name" style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>Nombre <span style={{ color: '#e74c3c' }}>*</span></label>
                <input id="name" type="text" required value={formState.name} onChange={handleChange} style={{ padding: '14px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 16, background: '#fafbfc', outline: 'none', transition: 'border 0.2s', fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="email" style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>Email <span style={{ color: '#e74c3c' }}>*</span></label>
                <input id="email" type="email" required value={formState.email} onChange={handleChange} style={{ padding: '14px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 16, background: '#fafbfc', outline: 'none', transition: 'border 0.2s', fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="question" style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>Tu pregunta <span style={{ color: '#e74c3c' }}>*</span></label>
                <input id="question" required type="text" value={formState.question} onChange={handleChange} style={{ padding: '14px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 16, background: '#fafbfc', outline: 'none', transition: 'border 0.2s', fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }} />
              </div>
              <button
                type="submit"
                style={{
                width: '100%',
                padding: '15px 0',
                borderRadius: 8,
                  background: isBtnHover ? '#7B4DDF' : '#5720C6',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                marginTop: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(39,15,3,0.08)',
                fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif'
                }}
                onMouseEnter={() => setIsBtnHover(true)}
                onMouseLeave={() => setIsBtnHover(false)}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
              {success && <p style={{ fontSize: 13, color: '#27ae60', textAlign: 'center', marginTop: 10 }}>¡Tu pregunta fue enviada con éxito!</p>}
              {error && <p style={{ fontSize: 13, color: '#e74c3c', textAlign: 'center', marginTop: 10 }}>{error}</p>}
              <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 10, lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }}>
                Al enviar tu pregunta, aceptas que podamos contactarte para responderte.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 