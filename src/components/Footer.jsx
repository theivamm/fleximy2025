import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const phrases = [
    "Diseños increíbles",
    "Páginas únicas",
    "Key Visuals sorprendentes",
    "Campañas funcionales",
    "Ilustraciones mágicas"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [clickedLinks, setClickedLinks] = useState(new Set());
  const logoRef = useRef();
  const footerRef = useRef();

  const handleNavigation = (e, href) => {
    if (href === "#stacking-title") {
      e.preventDefault();
      const section = document.getElementById('stacking-title');
      if (section) {
        sessionStorage.setItem('stackingCardsAuto', 'true');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#stacking-title") {
            window.history.pushState(null, null, "#stacking-title");
          }
        }, 500);
      }
    } else if (href === "#platform-section") {
      e.preventDefault();
      const section = document.getElementById('platform-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#platform-section") {
            window.history.pushState(null, null, "#platform-section");
          }
        }, 500);
      }
    } else if (href === "#ventajas") {
      e.preventDefault();
      const section = document.getElementById('ventajas');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#ventajas") {
            window.history.pushState(null, null, "#ventajas");
          }
        }, 500);
      }
    } else if (href === "#que-hacemos") {
      e.preventDefault();
      const section = document.getElementById('que-hacemos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#que-hacemos") {
            window.history.pushState(null, null, "#que-hacemos");
          }
        }, 500);
      }
    } else if (href === "#porque-flexear") {
      e.preventDefault();
      const section = document.getElementById('porque-flexear');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#porque-flexear") {
            window.history.pushState(null, null, "#porque-flexear");
          }
        }, 500);
      }
    } else if (href === "#planes") {
      e.preventDefault();
      const section = document.getElementById('planes');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#planes") {
            window.history.pushState(null, null, "#planes");
          }
        }, 500);
      }
    } else if (href === "#faqs") {
      e.preventDefault();
      const section = document.getElementById('faqs');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          gsap.scrollTrigger.refresh();
          if (window.location.hash !== "#faqs") {
            window.history.pushState(null, null, "#faqs");
          }
        }, 500);
      }
    }
  };

  const handleProximamenteClick = (e, linkText) => {
    e.preventDefault();
    setClickedLinks(prev => new Set([...prev, linkText]));
    
    // Resetear después de 3 segundos
    setTimeout(() => {
      setClickedLinks(prev => {
        const newSet = new Set(prev);
        newSet.delete(linkText);
        return newSet;
      });
    }, 3000);
  };

  useEffect(() => {
    const typingEffect = () => {
      const fullText = phrases[currentPhrase];
      
      if (isTyping) {
        if (displayText.length < fullText.length) {
          setTimeout(() => {
            setDisplayText(fullText.substring(0, displayText.length + 1));
          }, 100);
        } else {
          setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setTimeout(() => {
            setDisplayText(displayText.substring(0, displayText.length - 1));
          }, 50);
        } else {
          setCurrentPhrase((currentPhrase + 1) % phrases.length);
          setIsTyping(true);
        }
      }
    };

    const timer = setTimeout(typingEffect, isTyping ? 100 : 50);
    return () => clearTimeout(timer);
  }, [displayText, isTyping, currentPhrase]);

  useEffect(() => {
    const bar = document.getElementById('footer-gradient-bar');
    if (!bar) return;
    
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular si estamos al final del documento
      const isAtBottom = scrollY + windowHeight >= documentHeight - 50; // 50px de tolerancia
      
      // Mueve el gradiente en X en función del scroll
      bar.style.backgroundPosition = `${-scrollY / 2}px center`;
      
      // Mostrar/ocultar la barra basado en si estamos al final
      if (isAtBottom) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animación de letras sin scrubbing - se ejecuta una vez cuando entra en viewport
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      tl.from('#F', { y: -80, opacity: 0, duration: 0.7, ease: 'bounce.out' })
        .from('#l', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
        .from('#e', { x: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('#x', { rotationY: 180, opacity: 0, duration: 0.7, ease: 'power4.out' }, '-=0.3')
        .from('#e2', { scaleY: 0, opacity: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, '-=0.3')
        .from('#a', { y: 80, opacity: 0, duration: 0.6, ease: 'bounce.out' }, '-=0.3')
        .from('#y', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
        .from('#a2', { x: 60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('#excl', { rotation: 360, opacity: 0, duration: 0.7, ease: 'expo.out' }, '-=0.3');
    }, logoRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section" ref={footerRef}>
      {/* Fila 1: Logo grande centrado */}
      <div className="footer-row logo-row" ref={logoRef}>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2030 689" className="footer-main-logo">
          <g>
            <path id="excl" className="footer-logo-fill" d="M1907.21,427.14l.5-68.09c-.33-31.91-.17-57.56.49-76.97.99-19.74,2.47-34.7,4.44-44.9,2.63-14.14,8.06-24.18,16.28-30.1,8.22-6.25,17.93-9.37,29.11-9.37,12.17,0,21.21,3.12,27.13,9.37,6.25,6.25,9.38,14.31,9.38,24.18,0,8.88-2.64,20.89-7.9,36.02-5.26,14.8-13.65,34.87-25.16,60.19-11.51,25.33-26.64,58.55-45.39,99.67h-8.88ZM1860.34,505.1c0-11.51,4.12-21.38,12.34-29.6,8.55-8.22,18.42-12.33,29.6-12.33,10.53,0,18.91,3.45,25.16,10.36s9.37,15.13,9.37,24.67c0,11.51-4.27,21.22-12.82,29.11-8.22,7.89-17.93,11.84-29.11,11.84-10.19,0-18.58-3.29-25.16-9.87-6.25-6.91-9.38-14.97-9.38-24.18Z" />
            <path id="a" className="st0" d="M1660.71,539.64c-9.21,0-17.93-2.14-26.15-6.41-8.22-4.28-14.97-11.35-20.23-21.22-4.93-9.87-7.4-22.86-7.4-38.98,0-17.43,3.46-34.87,10.36-52.3,6.91-17.76,16.12-34.54,27.63-50.33,11.52-16.12,24.34-30.26,38.48-42.43,14.14-12.5,28.79-22.37,43.91-29.6,15.13-7.24,29.44-10.85,42.92-10.85,6.59,0,12.66,1.32,18.26,3.95,5.92,2.3,11.51,5.59,16.77,9.87l39.96-15.3,3.95,2.47-42.92,188.97c-2.3,9.21-3.45,16.78-3.45,22.7,0,6.91,3.12,10.36,9.37,10.36,4.61,0,9.87-2.14,15.79-6.41,6.25-4.28,13.32-10.03,21.21-17.27l3.95,3.95c-4.94,7.89-11.18,15.62-18.75,23.19-7.23,7.24-15.46,13.32-24.67,18.26-8.88,4.93-18.42,7.4-28.61,7.4-11.18,0-20.23-3.29-27.14-9.87-6.9-6.91-10.36-17.43-10.36-31.58,0-4.61.17-9.05.5-13.32-13.16,14.8-27.14,27.63-41.94,38.49-14.47,10.85-28.29,16.28-41.44,16.28ZM1665.15,450.83c0,17.43,2.79,30.1,8.39,37.99,5.92,7.57,13.65,11.35,23.18,11.35,7.9,0,15.79-2.47,23.69-7.4,7.89-4.93,16.44-12.01,25.65-21.22.66-3.95,1.48-8.06,2.47-12.33l31.08-142.1c-4.27-5.26-9.38-8.88-15.3-10.85-5.92-1.97-11.18-2.96-15.78-2.96-14.14,0-28.95,8.39-44.41,25.16-12.17,13.49-21.7,31.25-28.61,53.29-6.91,22.04-10.36,45.06-10.36,69.08Z" />
            <path id="y" className="st0" d="M1419.12,532.24l.99-4.93,12.33-4.44c12.83-4.28,20.4-12.99,22.7-26.15l18.25-96.21-54.27-163.31c-3.29-11.18-10.53-18.91-21.71-23.19l-5.42-2.47.98-4.93h123.85l-.99,4.93-10.85,3.45c-10.53,3.29-14.31,10.36-11.35,21.22l41.94,142.1,87.33-143.09c5.92-10.2,3.29-17.1-7.89-20.72l-9.87-2.96.99-4.93h67.1l-.98,4.93-9.38,3.45c-6.25,1.97-11.51,4.61-15.79,7.89-4.27,3.29-8.22,7.89-11.84,13.82l-93.25,153.94c-2.64,15.13-5.75,32.56-9.37,52.3-3.62,19.74-6.91,38.16-9.87,55.26-1.98,12.17,2.79,20.56,14.31,25.16l11.34,3.95-.98,4.93h-128.29Z" />
            <path id="a2" className="st0" d="M1096.29,539.64c-9.21,0-17.93-2.14-26.15-6.41-8.22-4.28-14.96-11.35-20.22-21.22-4.94-9.87-7.4-22.86-7.4-38.98,0-17.43,3.45-34.87,10.36-52.3,6.9-17.76,16.12-34.54,27.63-50.33,11.51-16.12,24.34-30.26,38.48-42.43,14.14-12.5,28.78-22.37,43.91-29.6,15.13-7.24,29.44-10.85,42.92-10.85,6.58,0,12.66,1.32,18.25,3.95,5.92,2.3,11.52,5.59,16.78,9.87l39.96-15.3,3.95,2.47-42.93,188.97c-2.3,9.21-3.45,16.78-3.45,22.7,0,6.91,3.13,10.36,9.37,10.36,4.61,0,9.87-2.14,15.79-6.41,6.25-4.28,13.32-10.03,21.22-17.27l3.94,3.95c-4.93,7.89-11.18,15.62-18.75,23.19-7.23,7.24-15.46,13.32-24.66,18.26-8.88,4.93-18.43,7.4-28.62,7.4-11.18,0-20.23-3.29-27.13-9.87-6.91-6.91-10.36-17.43-10.36-31.58,0-4.61.16-9.05.49-13.32-13.16,14.8-27.13,27.63-41.94,38.49-14.47,10.85-28.28,16.28-41.44,16.28ZM1100.73,450.83c0,17.43,2.8,30.1,8.39,37.99,5.92,7.57,13.65,11.35,23.19,11.35,7.89,0,15.79-2.47,23.68-7.4,7.89-4.93,16.45-12.01,25.65-21.22.66-3.95,1.48-8.06,2.47-12.33l31.08-142.1c-4.27-5.26-9.37-8.88-15.29-10.85-5.92-1.97-11.18-2.96-15.79-2.96-14.14,0-28.95,8.39-44.4,25.16-12.17,13.49-21.71,31.25-28.62,53.29-6.9,22.04-10.36,45.06-10.36,69.08ZM1205.83,260.87c4.27-13.49,8.55-26.81,12.83-39.97,4.27-13.49,8.55-26.64,12.82-39.47,3.62-11.84,8.06-20.23,13.32-25.16,5.6-5.26,11.84-7.89,18.75-7.89s13.65,2.47,19.24,7.4c5.6,4.61,8.39,10.69,8.39,18.26,0,6.25-1.97,12.17-5.92,17.76-3.95,5.26-9.38,11.18-16.28,17.76-9.87,9.54-19.41,18.91-28.62,28.12-8.88,9.21-18.25,18.42-28.12,27.63l-6.41-4.44Z" />
            <path id="e" className="st0" d="M931.88,539.64c-24.67,0-44.74-8.06-60.19-24.18-15.47-16.12-23.19-38.98-23.19-68.58,0-21.05,3.62-41.12,10.85-60.19,7.24-19.08,17.27-36.02,30.1-50.82,13.16-15.13,28.29-26.97,45.39-35.52,17.1-8.55,35.69-12.83,55.75-12.83s36.5,4.77,47.36,14.31c11.18,9.21,16.77,21.55,16.77,37,0,12.83-6.09,25.49-18.25,37.99-11.84,12.5-28.62,23.85-50.32,34.04-21.71,9.87-47.21,17.43-76.48,22.7.32,22.7,5.26,39.31,14.8,49.83,9.54,10.53,22.69,15.79,39.47,15.79,14.14,0,27.14-3.78,38.98-11.35,11.84-7.89,21.88-17.1,30.09-27.63l4.94,3.45c-6.58,12.83-15.13,25-25.66,36.51-10.19,11.51-22.04,21.05-35.52,28.62-13.49,7.24-28.45,10.85-44.9,10.85ZM987.13,300.83c-7.57,0-15.79,3.29-24.67,9.87-8.55,6.58-16.77,15.62-24.66,27.14-7.57,11.18-13.99,24.18-19.24,38.98-4.94,14.47-7.9,29.93-8.88,46.38,36.18-9.87,61.83-22.86,76.97-38.98,15.46-16.12,23.19-34.37,23.19-54.77,0-9.87-2.14-17.1-6.42-21.71-4.27-4.61-9.7-6.91-16.28-6.91Z" />
            <path id="x" className="st0" d="M612.86,539.64c-9.54,0-18.09-2.8-25.66-8.39-7.24-5.92-10.85-13.98-10.85-24.18,0-8.55,2.63-15.46,7.89-20.72,5.26-5.26,12.01-7.89,20.23-7.89,10.2,0,19.24,4.93,27.14,14.8,4.61,6.25,9.05,9.54,13.32,9.87,4.61,0,9.54-3.62,14.8-10.85,6.25-8.55,12.66-17.43,19.24-26.64,6.91-9.54,13.82-19.41,20.72-29.6l-25.16-77.46c-3.95-12.17-7.89-20.72-11.84-25.66-3.62-4.93-8.22-7.4-13.82-7.4-3.29,0-7.4.99-12.33,2.96-4.61,1.97-9.37,6.25-14.31,12.83l-5.92-6.41c22.37-31.58,44.24-47.37,65.62-47.37,12.83,0,22.37,3.62,28.62,10.85,6.25,7.24,12.01,18.58,17.27,34.04l15.3,46.87c9.21-15.13,17.43-27.96,24.67-38.49,7.24-10.85,12.83-18.75,16.78-23.68,9.21-11.51,17.93-19.24,26.15-23.19,8.22-4.28,16.45-6.41,24.67-6.41s15.95,2.47,22.2,7.4c6.25,4.93,9.37,12.17,9.37,21.71s-2.79,16.45-8.38,21.71c-5.26,5.26-11.52,7.89-18.75,7.89-10.19,0-19.24-4.61-27.14-13.82-3.94-4.93-7.56-7.73-10.85-8.39-2.96-.66-7.07,2.14-12.33,8.39-4.61,5.59-10.69,13.65-18.26,24.18-7.57,10.53-15.62,21.87-24.18,34.04l27.63,82.89c3.62,11.84,7.07,19.9,10.36,24.18,3.29,4.28,7.56,6.41,12.83,6.41,4.94,0,9.87-1.64,14.8-4.93,4.94-3.29,10.36-7.89,16.29-13.82l5.92,5.43c-8.89,14.14-19.08,25.99-30.59,35.52-11.52,9.54-24.01,14.31-37.5,14.31-10.2,0-19.08-2.8-26.64-8.39-7.57-5.59-13.82-15.95-18.75-31.08l-17.76-53.29c-8.55,13.49-16.61,25.66-24.18,36.51-7.24,10.53-13.98,20.06-20.23,28.62-6.25,9.21-12.99,15.95-20.23,20.23-6.91,4.28-15.62,6.41-26.15,6.41Z" />
            <path id="e2" className="st0" d="M486.85,539.64c-24.67,0-44.73-8.06-60.19-24.18-15.46-16.12-23.19-38.98-23.19-68.58,0-21.05,3.62-41.12,10.85-60.19,7.24-19.08,17.27-36.02,30.1-50.82,13.16-15.13,28.29-26.97,45.39-35.52,17.1-8.55,35.69-12.83,55.75-12.83s36.51,4.77,47.37,14.31c11.18,9.21,16.78,21.55,16.78,37,0,12.83-6.09,25.49-18.26,37.99-11.84,12.5-28.62,23.85-50.33,34.04-21.71,9.87-47.2,17.43-76.48,22.7.33,22.7,5.26,39.31,14.8,49.83,9.54,10.53,22.7,15.79,39.47,15.79,14.14,0,27.14-3.78,38.98-11.35,11.84-7.89,21.87-17.1,30.1-27.63l4.93,3.45c-6.58,12.83-15.13,25-25.66,36.51-10.2,11.51-22.04,21.05-35.52,28.62-13.49,7.24-28.45,10.85-44.9,10.85ZM542.11,300.83c-7.57,0-15.79,3.29-24.67,9.87-8.55,6.58-16.78,15.62-24.67,27.14-7.57,11.18-13.98,24.18-19.24,38.98-4.93,14.47-7.89,29.93-8.88,46.38,36.18-9.87,61.84-22.86,76.97-38.98,15.46-16.12,23.19-34.37,23.19-54.77,0-9.87-2.14-17.1-6.41-21.71-4.28-4.61-9.7-6.91-16.28-6.91Z" />
            <path id="l" className="st0" d="M328.21,539.64c-10.85,0-19.57-2.8-26.15-8.39-6.25-5.59-9.37-13.65-9.37-24.18,0-5.92.66-12.99,1.97-21.22,1.32-8.55,3.29-19.41,5.92-32.56l28.12-136.18c2.63-12.5,4.77-23.85,6.41-34.04,1.97-10.2,4.11-21.71,6.41-34.54,2.3-13.16-2.96-22.04-15.79-26.64l-8.39-2.96.99-4.93,96.71-27.63,2.96,3.45-60.69,286.17c-.99,4.93-1.81,9.37-2.47,13.32-.66,3.62-.99,6.74-.99,9.37,0,7.24,3.12,10.85,9.37,10.85,8.22,0,20.23-7.4,36.02-22.2l4.93,3.95c-8.22,12.17-18.58,23.35-31.08,33.55-12.5,9.87-27.47,14.8-44.9,14.8Z" />
            <path id="F" className="st0" d="M35.45,532.24l.99-4.93,10.85-4.44c10.85-4.61,17.43-12.5,19.74-23.68l26.15-139.63c3.29-17.43,6.74-36.68,10.36-57.73,3.62-21.38,7.07-41.61,10.36-60.69,2.3-13.16-2.8-22.2-15.3-27.14l-4.93-2.47.99-4.93h227.95l-13.82,85.85h-4.93l-10.85-41.94c-3.62-12.5-8.72-21.22-15.3-26.15-6.58-5.26-16.61-7.89-30.1-7.89h-60.69l-27.14,143.09h37c9.21,0,16.78-1.48,22.7-4.44,6.25-3.29,12.01-8.55,17.27-15.79l19.24-25.16h4.93l-19.24,103.12h-4.93l-7.89-22.2c-2.96-8.88-6.91-15.3-11.84-19.24-4.61-4.28-11.68-6.41-21.22-6.41h-37.99c-2.3,12.17-4.93,25.82-7.89,40.95-2.63,14.8-5.26,29.93-7.89,45.39-2.63,15.13-5.1,29.27-7.4,42.43-1.97,12.17,2.63,20.39,13.82,24.67l11.84,4.44-.99,4.93H35.45Z" />
          </g>
        </svg>
        
        {/* Pills de redes sociales */}
        <div className="social-pills">
          <a href="#" className="social-pill proximamente-link" style={{ backgroundColor: 'var(--punk-fresa)' }} onClick={(e) => handleProximamenteClick(e, 'Instagram')}>IG<div className={`tooltip-absolute ${clickedLinks.has('Instagram') ? 'clicked' : ''}`}>{clickedLinks.has('Instagram') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></a>
          <a href="#" className="social-pill proximamente-link" style={{ backgroundColor: 'var(--violet-light)' }} onClick={(e) => handleProximamenteClick(e, 'Facebook')}>FB<div className={`tooltip-absolute ${clickedLinks.has('Facebook') ? 'clicked' : ''}`}>{clickedLinks.has('Facebook') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></a>
          <a href="#" className="social-pill proximamente-link" style={{ backgroundColor: 'var(--cyan-light)' }} onClick={(e) => handleProximamenteClick(e, 'TikTok')}>TK<div className={`tooltip-absolute ${clickedLinks.has('TikTok') ? 'clicked' : ''}`}>{clickedLinks.has('TikTok') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></a>
          <a href="#" className="social-pill proximamente-link" style={{ backgroundColor: 'var(--green-turtle)' }} onClick={(e) => handleProximamenteClick(e, 'LinkedIn')}>LI<div className={`tooltip-absolute ${clickedLinks.has('LinkedIn') ? 'clicked' : ''}`}>{clickedLinks.has('LinkedIn') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></a>
        </div>
      </div>

      {/* Fila 2: 4 columnas */}
      <div className="footer-row columns-row">
        <div className="footer-col description-col">
          <p>Fleximy es una plataforma de diseño creativo por suscripción que ofrece un servicio flexible, rápido y sin complicaciones. Permite gestionar múltiples proyectos, colaborar con tu equipo en tiempo real y realizar revisiones con facilidad, ¿estás listo para Flexear ya?</p>
        </div>
        
        <div className="footer-col links-col">
          <h3>Plataforma</h3>
          <ul>
            <li><a href="#stacking-title" className="footer-link" onClick={(e) => handleNavigation(e, "#stacking-title")}>Conócenos</a></li>
            <li><a href="#platform-section" className="footer-link" onClick={(e) => handleNavigation(e, "#platform-section")}>Cómo funciona?</a></li>
            <li><a href="#ventajas" className="footer-link" onClick={(e) => handleNavigation(e, "#ventajas")}>Ventajas</a></li>
            <li><a href="#que-hacemos" className="footer-link" onClick={(e) => handleNavigation(e, "#que-hacemos")}>Qué hacemos?</a></li>
            <li><a href="#porque-flexear" className="footer-link" onClick={(e) => handleNavigation(e, "#porque-flexear")}>Porqué Flexear</a></li>
            <li><a href="#planes" className="footer-link" onClick={(e) => handleNavigation(e, "#planes")}>Planes</a></li>
            <li><a href="#faqs" className="footer-link" onClick={(e) => handleNavigation(e, "#faqs")}>FAQs</a></li>
          </ul>
        </div>
        
        <div className="footer-col links-col">
          <h3>Contenido</h3>
          <ul>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Blog')}>Blog</a><div className={`tooltip-absolute ${clickedLinks.has('Blog') ? 'clicked' : ''}`}>{clickedLinks.has('Blog') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Prensa')}>Prensa</a><div className={`tooltip-absolute ${clickedLinks.has('Prensa') ? 'clicked' : ''}`}>{clickedLinks.has('Prensa') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Términos')}>Términos y condiciones</a><div className={`tooltip-absolute ${clickedLinks.has('Términos') ? 'clicked' : ''}`}>{clickedLinks.has('Términos') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Trabaja')}>Trabaja con Flexi</a><div className={`tooltip-absolute ${clickedLinks.has('Trabaja') ? 'clicked' : ''}`}>{clickedLinks.has('Trabaja') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Ayuda')}>Ayuda</a><div className={`tooltip-absolute ${clickedLinks.has('Ayuda') ? 'clicked' : ''}`}>{clickedLinks.has('Ayuda') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
            <li><a href="#" className="footer-link proximamente-link" onClick={(e) => handleProximamenteClick(e, 'Tutoriales')}>Tutoriales</a><div className={`tooltip-absolute ${clickedLinks.has('Tutoriales') ? 'clicked' : ''}`}>{clickedLinks.has('Tutoriales') ? 'TE DIJE PROXIMAMENTE 😠' : 'PROXIMAMENTE'}</div></li>
          </ul>
        </div>
        
        <div className="footer-col newsletter-col">
          <h3>Suscribite</h3>
          <p>Recibí las últimas novedades y ofertas.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="newsletter-input" 
            />
            <button 
              type="submit" 
              className="newsletter-button"
              style={{ backgroundColor: 'var(--yellow-cartoon)' }}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Fila 4: Texto animado */}
      <div className="footer-row animated-text-row">
        <span className="fixed-word">Flexeá</span>
        <span className="typing-text">{displayText}</span>
        <span className="typing-cursor">|</span>
      </div>

      {/* Barra de gradiente */}
      <div className="gradient-bar" id="footer-gradient-bar"></div>
    </footer>
  );
};

export default Footer;