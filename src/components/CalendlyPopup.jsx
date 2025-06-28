import React, { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const CalendlyPopup = ({ isOpen, onClose }) => {
  useLayoutEffect(() => {
    if (isOpen) {
      // Cargar el script de Calendly si no está cargado
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Animar la apertura del popup después de que el DOM se haya actualizado
      const overlay = document.querySelector('.calendly-popup-overlay');
      const content = document.querySelector('.calendly-popup-content');
      
      if (overlay && content) {
        gsap.set(overlay, { opacity: 0 });
        gsap.set(content, { scale: 0.8, opacity: 0 });
        
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(content, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
      }

      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // Animar el cierre del popup
      const overlay = document.querySelector('.calendly-popup-overlay');
      const content = document.querySelector('.calendly-popup-content');
      
      if (overlay && content) {
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(content, { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }

      // Restaurar scroll del body
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Inicializar el widget de Calendly cuando el popup esté abierto
  useEffect(() => {
    if (isOpen && window.Calendly) {
      // Esperar un poco para que el DOM se actualice completamente
      const timer = setTimeout(() => {
        const widget = document.querySelector('.calendly-inline-widget');
        if (widget && window.Calendly) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/fleximy-design/30min?background_color=ffe9cf&text_color=270f03&primary_color=f897b4',
            parentElement: widget
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="calendly-popup-overlay" onClick={handleOverlayClick}>
      <div className="calendly-popup-content">
        <button className="calendly-popup-close" onClick={onClose}>
          ×
        </button>
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/fleximy-design/30min?background_color=ffe9cf&text_color=270f03&primary_color=f897b4" 
          style={{ 
            minWidth: window.innerWidth <= 768 ? '320px' : '600px', 
            height: window.innerWidth <= 768 ? '500px' : '700px' 
          }}
        />
      </div>
    </div>
  );
};

export default CalendlyPopup; 