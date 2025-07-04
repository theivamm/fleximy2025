import React, { useState, useEffect, useRef } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import ServicesCarousel from '../components/ServicesCarousel';
import { gsap } from 'gsap';

const filtros = [
  { label: 'Todos', color: 'var(--white)' },
  { label: 'Diseño de redes sociales', color: 'var(--cyan-light)' },
  { label: 'Websites', color: 'var(--yellow-cartoon)' },
  { label: 'Logos', color: 'var(--green-turtle)' },
  { label: 'Ilustración', color: 'var(--violet-light)' },
  { label: 'Campañas', color: 'var(--red-not-scarlet)' },
  { label: 'Videos', color: 'var(--punk-fresa)' },
];

const galeria = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  filtro: filtros[i % filtros.length],
}));

const carruselImgs = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  color: 'var(--cyan-light)',
}));

const HERO_BG = 'var(--azul)';
const CTA_AGUA = 'var(--agua)';
const CTA_VIOLETA2 = 'var(--violeta2)';
const CTA_VIOLETA = 'var(--violeta)';
const WHITE = 'var(--white)';

export default function NuestrosTrabajos() {
  const [filtroActivo, setFiltroActivo] = useState('');
  const carruselRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const carrusel = carruselRef.current;
    const track = trackRef.current;
    if (!carrusel || !track) return;
    // Reset transform
    gsap.set(track, { x: 0 });
    const cardWidth = track.children[0].offsetWidth + 40; // 40 = gap
    const totalCards = track.children.length;
    const totalWidth = cardWidth * totalCards;
    // Animación GSAP
    function startScroll() {
      if (animRef.current) animRef.current.kill();
      animRef.current = gsap.to(track, {
        x: `-=${totalWidth/3}`,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const xNum = parseFloat(x);
            if (xNum <= -totalWidth/3*2) return 0;
            return x;
          }
        }
      });
    }
    startScroll();
    // Drag nativo
    let isDown = false;
    let startX = 0;
    let startTx = 0;
    let lastTx = 0;
    const onPointerDown = (e) => {
      isDown = true;
      if (animRef.current) animRef.current.pause();
      startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const m = gsap.getProperty(track, 'x');
      startTx = typeof m === 'number' ? m : parseFloat(m);
      lastTx = startTx;
      document.body.style.cursor = 'grabbing';
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const dx = x - startX;
      let newTx = startTx + dx;
      // Opcional: límites suaves
      if (newTx > 100) newTx = 100;
      if (newTx < -totalWidth + carrusel.offsetWidth - 100) newTx = -totalWidth + carrusel.offsetWidth - 100;
      gsap.set(track, { x: newTx });
      lastTx = newTx;
    };
    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      document.body.style.cursor = '';
      if (animRef.current) animRef.current.resume();
    };
    track.addEventListener('mousedown', onPointerDown);
    track.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    // Pausa/reanuda en hover/touch
    const pause = () => { if (animRef.current) animRef.current.pause(); isPausedRef.current = true; };
    const resume = () => { if (animRef.current && isPausedRef.current) animRef.current.resume(); isPausedRef.current = false; };
    carrusel.addEventListener('mouseenter', pause);
    carrusel.addEventListener('mouseleave', resume);
    carrusel.addEventListener('touchstart', pause);
    carrusel.addEventListener('touchend', resume);
    return () => {
      if (animRef.current) animRef.current.kill();
      track.removeEventListener('mousedown', onPointerDown);
      track.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      carrusel.removeEventListener('mouseenter', pause);
      carrusel.removeEventListener('mouseleave', resume);
      carrusel.removeEventListener('touchstart', pause);
      carrusel.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--body-bg, #FCFEFE)', color: '#222', fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar2 />
      {/* HERO NUEVO */}
      <section style={{ position: 'relative', width: '100%', minHeight: 600, overflow: 'visible', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
        {/* Fondo circular azul */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 600,
          background: HERO_BG,
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        {/* Nubes flotantes */}
        <img src="/cloud.png" alt="nube" className="hero-cloud" style={{ position: 'absolute', left: '10px', top: 80, width: 180, zIndex: 2, animation: 'floatCloud1 8s ease-in-out infinite' }} />
        <img src="/cloud.png" alt="nube" className="hero-cloud" style={{ position: 'absolute', right: '20px', top: 160, width: 180, zIndex: 2, animation: 'floatCloud2 10s ease-in-out infinite' }} />
        {/* Contenido principal por encima de la imagen */}
        <div style={{ position: 'absolute', zIndex: 4, top: 100, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="hero-title" style={{ color: '#fff', fontWeight: 800, fontSize: 96, margin: 0, textAlign: 'center', letterSpacing: -2, fontStyle: 'italic' }}>
            Nuestros <span className="hero-title-break">trabajos</span>
          </h1>
          <h2 className="hero-subtitle" style={{ color: '#fff', fontWeight: 400, fontSize: 24, margin: '24px 0 40px 0', textAlign: 'center', maxWidth: 600, fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif' }}>
            Descubre el impacto de nuestro trabajo creativo en marcas reales
          </h2>
          <div className="hero-btns" style={{ display: 'flex', gap: 28, marginBottom: 48, flexDirection: 'row', alignItems: 'center' }}>
            <a href="#contacto" style={{
              background: CTA_AGUA,
              color: CTA_VIOLETA2,
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 32,
              padding: '20px 64px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #0002',
              border: 'none',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}>Contactanos</a>
            <a href="#planes" style={{
              backgroundColor: '#fff',
              color: CTA_VIOLETA,
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 32,
              padding: '20px 64px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #0002',
              border: 'none',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}>Ver planes</a>
          </div>
        </div>
        {/* Imagen grande, mitad afuera del círculo (solo desktop) */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}>
          <img
            src="/nuestros-trabajos-hero.svg"
            alt="Ilustración nuestros trabajos"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '-170px',
              transform: 'translateX(-50%)',
              width: '715px',
              maxWidth: '95vw',
              zIndex: 3,
              pointerEvents: 'none',
              display: 'block',
            }}
            className="hero-img-desktop hero-img-mobile-abs"
          />
        </div>
        {/* Animaciones de nubes */}
        <style>{`
          @keyframes floatCloud1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }
          @keyframes floatCloud2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-24px); }
          }
          @media (max-width: 900px) {
            .hero-cloud { display: none !important; }
            .hero-img-desktop { display: none !important; }
            .hero-img-mobile-abs {
              display: block !important;
              position: absolute !important;
              left: 50% !important;
              bottom: 0 !important;
              transform: translateX(-50%) !important;
              width: 90vw !important;
              max-width: 400px !important;
              z-index: 3 !important;
            }
            .hero-title {
              font-size: 54px !important;
              margin-top: 0 !important;
              line-height: 1.1 !important;
              word-break: break-word !important;
            }
            .hero-subtitle {
              font-size: 18px !important;
              margin: 16px 0 28px 0 !important;
            }
            .hero-btns {
              flex-direction: row !important;
              gap: 16px !important;
              margin-bottom: 32px !important;
              align-items: center !important;
            }
            .hero-btns a {
              font-size: 16px !important;
              padding: 14px 32px !important;
              width: auto !important;
              text-align: center !important;
            }
            .hero-title-break {
              display: block !important;
            }
          }
        `}</style>
      </section>
      {/* Carrusel horizontal de cards verticales */}
      <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: 'var(--blanco)', padding: '60px 0' }}>
        <div style={{ height: 56, marginBottom: 40 }}></div>
        <div
          ref={carruselRef}
          style={{
            overflowX: 'hidden',
            width: '100%',
            padding: '20px 40px',
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 40,
              width: 'max-content',
              scrollSnapType: 'x mandatory',
              cursor: 'grab',
            }}
          >
            {/* Repetimos las 3 cards 6 veces para asegurar overflow */}
            {Array.from({ length: 6 }).map((_, i) => (
              <React.Fragment key={i}>
                {/* Card1: AG Estudio */}
                <div className="card1" style={{
                  width: 340,
                  minWidth: 340,
                  maxWidth: 340,
                  height: 480,
                  background: 'var(--violeta)',
                  borderRadius: 24,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  scrollSnapAlign: 'start',
                  marginTop: 64,
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 0;
                }}
                >
                  {/* Imagen vertical sin overlay */}
                  <div style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '133%', // 3:4 proporción vertical
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--violeta)'
                  }}>
                    <img
                      src="/proyectos/agestudio1.png"
                      alt="AG Estudio"
                      draggable={false}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Info arriba (sin overlay) */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      zIndex: 3,
                      padding: '20px 20px 0 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 10
                    }}>
                      <h3 style={{
                        color: 'var(--blanco)',
                        fontWeight: 800,
                        fontSize: 22,
                        margin: 0,
                        fontFamily: 'Plus Jakarta Sans',
                        textShadow: '0 2px 8px rgba(0,0,0,0.25)'
                      }}>AG Estudio</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ background: 'var(--agua)', color: 'var(--violeta2)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Figma</span>
                        <span style={{ background: 'var(--violeta2)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Prototipado</span>
                        <span style={{ background: 'var(--azul)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>UI Design</span>
                        <span style={{ background: 'var(--pink)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>UX Research</span>
                      </div>
                    </div>
                  </div>
                  {/* CTA al hacer hover */}
            <button
                    className="cta-carrusel"
              style={{
                      opacity: 0,
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      background: 'var(--violeta)',
                      color: 'var(--blanco)',
                border: 'none',
                      borderRadius: '0 0 24px 24px',
                      fontWeight: 700,
                      fontSize: 16,
                      padding: '18px 0',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s',
                      fontFamily: 'Plus Jakarta Sans',
                      letterSpacing: 1
                    }}
                  >
                    Ver proyecto
                  </button>
                </div>
                {/* Card2: Multipoint */}
                <div className="card2" style={{
                  width: 340,
                  minWidth: 340,
                  maxWidth: 340,
                  height: 480,
                  background: 'var(--agua)',
                borderRadius: 24,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  scrollSnapAlign: 'start',
                  marginTop: 64,
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 0;
                }}
                >
                  {/* Imagen vertical sin overlay */}
                  <div style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '133%', // 3:4 proporción vertical
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--agua)'
                  }}>
                    <img
                      src="/proyectos/multipoint.png"
                      alt="Multipoint"
                      draggable={false}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Info arriba (sin overlay) */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      zIndex: 3,
                      padding: '20px 20px 0 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 10
                    }}>
                      <h3 style={{
                        color: 'var(--violeta2)',
                        fontWeight: 800,
                        fontSize: 22,
                        margin: 0,
                        fontFamily: 'Plus Jakarta Sans'
                      }}>Multipoint</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ background: 'var(--azul)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Illustrator</span>
                        <span style={{ background: 'var(--violeta2)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Social Media</span>
                        <span style={{ background: 'var(--pink)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Creatividad</span>
                        <span style={{ background: 'var(--violeta)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Animación</span>
                      </div>
                    </div>
                  </div>
                  {/* CTA al hacer hover */}
                  <button
                    className="cta-carrusel"
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      background: 'var(--azul)',
                      color: 'var(--blanco)',
                      border: 'none',
                      borderRadius: '0 0 24px 24px',
                      fontWeight: 700,
                fontSize: 16,
                      padding: '18px 0',
                cursor: 'pointer',
                      transition: 'opacity 0.3s',
                      fontFamily: 'Plus Jakarta Sans',
                      letterSpacing: 1
                    }}
                  >
                    Ver proyecto
            </button>
        </div>
                {/* Card3: Branded Strong */}
                <div className="card3" style={{
                  width: 340,
                  minWidth: 340,
                  maxWidth: 340,
                  height: 480,
                  background: 'var(--azul)',
                  borderRadius: 24,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  scrollSnapAlign: 'start',
                  marginTop: 64,
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.cta-carrusel').style.opacity = 0;
                }}
                >
                  {/* Imagen vertical sin overlay */}
        <div style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '133%', // 3:4 proporción vertical
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'var(--azul)'
                  }}>
                    <img
                      src="/proyectos/brandedstrong.png"
                      alt="Branded Strong"
                      draggable={false}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Info arriba (sin overlay) */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      zIndex: 3,
                      padding: '20px 20px 0 20px',
                display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 10
                    }}>
                      <h3 style={{
                        color: 'var(--blanco)',
                fontWeight: 800,
                        fontSize: 22,
                        margin: 0,
                        fontFamily: 'Plus Jakarta Sans',
                        textShadow: '0 2px 8px rgba(0,0,0,0.25)'
                      }}>Branded Strong</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ background: 'var(--agua)', color: 'var(--violeta2)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>UX/UI</span>
                        <span style={{ background: 'var(--violeta2)', color: 'var(--blanco)', fontWeight: 700, fontSize: 12, borderRadius: 12, padding: '4px 10px' }}>Figma</span>
                      </div>
                    </div>
                  </div>
                  {/* CTA al hacer hover */}
                  <button
                    className="cta-carrusel"
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      background: 'var(--azul)',
                      color: 'var(--blanco)',
                      border: 'none',
                      borderRadius: '0 0 24px 24px',
                      fontWeight: 700,
                      fontSize: 16,
                      padding: '18px 0',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s',
                      fontFamily: 'Plus Jakarta Sans',
                      letterSpacing: 1
                    }}
                  >
                    Ver proyecto
                  </button>
              </div>
              </React.Fragment>
            ))}
        </div>
        </div>
      </section>
      {/* 2 CARDS DE ACCIÓN */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px', display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: 320, background: 'linear-gradient(120deg, #7B4DDF 60%, #F5C939 100%)', borderRadius: 18, padding: 40, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 8px 32px #7B4DDF22' }}>
          <h3 style={{ fontWeight: 800, fontSize: 28, marginBottom: 12 }}>¿Querés ver la plataforma en acción?</h3>
          <p style={{ fontSize: 18, marginBottom: 24 }}>Agenda una meet personalizada y descubre cómo podemos potenciar tu marca.</p>
          <a href="https://calendly.com/fleximy/demo" target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#7B4DDF', fontWeight: 700, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 18, boxShadow: '0 2px 8px #0002' }}>Agendar Meet</a>
        </div>
        <div style={{ flex: 1, minWidth: 320, background: 'linear-gradient(120deg, #F5C939 60%, #7B4DDF 100%)', borderRadius: 18, padding: 40, color: '#311B6E', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 8px 32px #F5C93922' }}>
          <h3 style={{ fontWeight: 800, fontSize: 28, marginBottom: 12 }}>Conocé nuestros planes</h3>
          <p style={{ fontSize: 18, marginBottom: 24 }}>Elige el plan ideal para tu negocio y accede a equipos creativos profesionales.</p>
          <a href="#planes" style={{ background: '#311B6E', color: '#fff', fontWeight: 700, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 18, boxShadow: '0 2px 8px #0002' }}>Ver Planes</a>
        </div>
      </section>
      <Footer />
    </div>
  );
} 