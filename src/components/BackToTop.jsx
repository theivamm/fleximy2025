import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detectar cuando hacer scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Función para scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animación de entrada/salida
  useEffect(() => {
    const button = document.querySelector('.back-to-top');
    if (button) {
      if (isVisible) {
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(button, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isVisible]);

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--punk-fresa)',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'scale(0.8)',
        transformOrigin: 'center center'
      }}
      onMouseEnter={(e) => {
        gsap.to(e.target, {
          scale: 1.1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.target, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }}
    >
      ↑
    </button>
  );
};

export default BackToTop; 