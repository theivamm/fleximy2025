import React, { useState } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import ServicesCarousel from '../components/ServicesCarousel';

const filtros = [
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

export default function NuestrosTrabajos() {
  const [filtroActivo, setFiltroActivo] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#FCFEFE', color: '#222', fontFamily: 'Plus Jakarta Sans, Inter, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar2 />
      {/* HERO SECTION */}
      <section style={{ padding: '80px 0 40px 0', textAlign: 'center', background: '#F5F2FF' }}>
        <h1 style={{ fontWeight: 800, fontSize: 56, color: '#311B6E', margin: 0 }}>Nuestros Trabajos</h1>
        <h2 style={{ fontWeight: 500, fontSize: 22, color: '#7B4DDF', margin: '18px 0 0 0' }}>
          Descubre el impacto de nuestro trabajo creativo en marcas reales
        </h2>
      </section>
      {/* FILTROS Y GALERÍA */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px 0 16px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {filtros.map(f => (
            <button
              key={f.label}
              onClick={() => setFiltroActivo(f.label === filtroActivo ? '' : f.label)}
              style={{
                background: f.color,
                color: '#222',
                border: 'none',
                borderRadius: 24,
                padding: '10px 22px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                opacity: filtroActivo && filtroActivo !== f.label ? 0.5 : 1,
                boxShadow: filtroActivo === f.label ? '0 0 0 3px #311B6E33' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          marginBottom: 48,
        }}>
          {galeria
            .filter(img => !filtroActivo || img.filtro.label === filtroActivo)
            .map(img => (
              <div key={img.id} style={{
                background: img.filtro.color,
                borderRadius: 18,
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                boxShadow: '0 4px 16px #0001',
                transition: 'transform 0.2s',
              }}>
                {img.filtro.label}
              </div>
            ))}
        </div>
      </section>
      {/* CARRUSEL NUESTRA SELECCIÓN */}
      <section style={{ background: '#F5F2FF', padding: '40px 0 60px 0' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 36, color: '#311B6E', marginBottom: 32 }}>Nuestra selección</h2>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ServicesCarousel />
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