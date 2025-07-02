import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import CalendlyPopup from './CalendlyPopup';
import './CalendlyPopup.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrambleTextPlugin);

const colorPalette = [ 'var(--cyan-light)', 'var(--red-not-scarlet)', 'var(--yellow-cartoon)', 'var(--violet-light)', 'var(--green-turtle)', 'var(--punk-fresa)'];
const navLinks = [
  { name: "Conócenos", href: "#stacking-title" },
  { name: "Cómo funciona?", href: "#platform-section" },
  { name: "Ventajas", href: "#ventajas" },
  { name: "Qué hacemos?", href: "#que-hacemos" },
  {
    name: "Más",
    submenu: [
      { name: "Porqué Flexear", href: "#porque-flexear" },
      { name: "Planes", href: "#planes" },
      { name: "FAQs", href: "#faqs" }
    ]
  }
];

// Iconos SVG de assets para cada opción
const submenuIcons = {
  "Porqué Flexear": (
    <span className="supermenu-icon">
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24,48C10.75,48,0,37.25,0,24S10.75,0,24,0s24,10.75,24,24-10.75,24-24,24ZM24,6C14.06,6,6,14.06,6,24s8.06,18,18,18,18-8.06,18-18S33.94,6,24,6ZM36.09,28.8c0,1.99-5.39,8.4-12.05,8.4s-12.05-6.41-12.05-8.4,5.39-2.4,12.05-2.4,12.05.41,12.05,2.4ZM19.2,18c0,1.99-1.61,3.6-3.6,3.6s-3.6-1.61-3.6-3.6,1.61-3.6,3.6-3.6,3.6,1.61,3.6,3.6ZM36,18c0,1.99-1.61,3.6-3.6,3.6s-3.6-1.61-3.6-3.6,1.61-3.6,3.6-3.6,3.6,1.61,3.6,3.6Z" fill="#F5C939"/>
      </svg>
    </span>
  ),
  "Planes": (
    <span className="supermenu-icon">
      <svg width="36" height="36" viewBox="0 0 43 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.68,15.55c0-.11-2.83-.86-3.04-.91,0-.03.06-.07.06-.1.06-.33.22-1.73.22-2.1,0-6.87-5.57-12.44-12.45-12.44h0c-6.46,0-11.76,4.89-12.4,11.17-.04.42-.06.84-.06,1.27,0,.38.14,1.78.19,2.1,0,.03,0,.06.01.1-.22.05-2.92.8-2.93.91-3.75,1-6.29,5.32-6.29,9.4v14.23c0,4.87,3.49,8.82,8.34,8.82h26.28c4.85,0,8.38-3.95,8.38-8.82v-14.23c0-4.08-2.57-8.4-6.32-9.4ZM21.48,4.59c3.97,0,7.19,3.21,7.19,7.18,0,.45-.05.89-.13,1.32-1.58-.17-8.29-.31-8.9-.3,0,0-3.65.13-5.23.3-.08-.43-.13-.87-.13-1.32,0-3.96,3.22-7.18,7.19-7.18ZM30.79,32.09l-9.31,9.24-9.31-9.33h0c-1.26-1-2.03-2.93-2.03-4.83,0-3.8,3.09-6.86,6.9-6.86,1.69,0,3.24.62,4.44,1.63,1.2-1.01,2.75-1.62,4.44-1.62,3.81,0,6.89,3.09,6.89,6.88,0,1.91-.78,3.63-2.03,4.88Z" fill="#CA9DFE"/>
      </svg>
    </span>
  ),
  "FAQs": (
    <span className="supermenu-icon">
      <svg width="36" height="36" viewBox="0 0 43 48.11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.27,3.85c-.39-.39-16.68,6.26-16.68-.74s-15.97,0-15.97,0c-.59,0-1.36.35-1.75.74-.39.39-.86,1.03-.86,1.62v15.65c0,.59.47,1.05.86,1.44.39.39,1.16.55,1.75.55,0,0,15.97-8,15.97,0s16.3-.17,16.68-.55.73-.85.73-1.44V5.47c0-.59-.34-1.24-.73-1.62Z" fill="#7AE66A"/>
        <path d="M3.3.11h-1.16C.96.11,0,1.07,0,2.25v43.72c0,1.18.96,2.14,2.14,2.14h1.16c1.18,0,1.7-.96,1.7-2.14V2.25C5,1.07,4.48.11,3.3.11Z" fill="#7AE66A"/>
      </svg>
    </span>
  )
};

// Reemplazo de descripciones para cada sublink
const submenuDescriptions = {
  "Porqué Flexear": "Olvídate de la incertidumbre de los freelancers y de los costos desorbitados de las agencias tradicionales.",
  "Planes": "Sin sorpresas ni contratos ocultos. Elige el plan ideal, cada uno con equipos creativos profesionales.",
  "FAQs": "Respondemos las preguntas más comunes sobre nuestro modelo, el equipo y los entregables."
};
const supermenuPlaceholder = "¿Hay algo más que te gustaría saber? Escribe tu pregunta aquí. Nos comprometemos a responderte a la brevedad.";

const Navbar2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContrast, setIsContrast] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const submenuTriggerRef = useRef(null);
    const [submenuPos, setSubmenuPos] = useState({ left: 0, top: 0, width: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [submenuArrowLeft, setSubmenuArrowLeft] = useState(0);
    
  const navRef = useRef(null);
    const logoRef = useRef(null);
    const menuTl = useRef(null);
    const submenuCloseTimeout = useRef(null);

    const [megaMenuWidth, setMegaMenuWidth] = useState(0);
    const megaMenuRef = useRef(null);
    useEffect(() => {
        if (megaMenuRef.current) {
            setMegaMenuWidth(megaMenuRef.current.offsetWidth);
        }
    }, [isSubmenuOpen]);
    const arrowOffset = megaMenuWidth
        ? submenuArrowLeft - (window.innerWidth / 2 - megaMenuWidth / 2)
        : 0;

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

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            gsap.scrollTrigger.refresh();
            if (window.location.hash !== "") {
                window.history.pushState(null, null, window.location.pathname);
            }
        }, 500);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const menuOverlay = navRef.current.querySelector('.mobile-menu-overlay');
            const burgerLines = navRef.current.querySelectorAll('.burger-line');
            const mobileLinks = navRef.current.querySelectorAll('.mobile-nav-link');
            menuTl.current = gsap.timeline({ 
                paused: true,
                onStart: () => { gsap.set(menuOverlay, { pointerEvents: 'all' }); },
                onReverseComplete: () => { gsap.set(menuOverlay, { pointerEvents: 'none' }); }
            });
            menuTl.current
                .to(menuOverlay, { clipPath: 'circle(150% at 90% 50%)', duration: 0.7, ease: 'power3.inOut' })
                .to(burgerLines[0], { rotation: 45, y: 8, duration: 0.3 }, "<")
                .to(burgerLines[1], { opacity: 0, duration: 0.3 }, "<")
                .to(burgerLines[2], { rotation: -45, y: -8, duration: 0.3 }, "<")
                .from(mobileLinks, { y: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.3");
            const logoObject = logoRef.current;
            let retryCount = 0;
            const maxRetries = 10;
            const retryDelay = 100;
            function animateLogoIfReady() {
                if (!logoObject) return;
                const svgDoc = logoObject.contentDocument;
                if (!svgDoc) {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        setTimeout(animateLogoIfReady, retryDelay);
                    }
                    return;
                }
                const letters = svgDoc.querySelectorAll('#logo-letra-f, #logo-letra-l, #logo-letra-e, #logo-letra-x, #logo-letra-i, #logo-letra-ipoint, #logo-letra-m, #logo-letra-y');
                const underline = svgDoc.querySelector('#logo-letra-subrayado');
                if (letters.length < 8 || !underline) return;
                gsap.set(letters, { autoAlpha: 0, y: -100, rotation: "random(-80, 80)" });
                gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' });
                const logoTl = gsap.timeline({ delay: 1 });
                logoTl.to(letters, { autoAlpha: 1, y: 0, rotation: 0, ease: "back.out(1.4)", duration: 1, stagger: { each: 0.08, from: "random" } })
                      .to(underline, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, "-=1");
            }
            if (logoObject) {
                logoObject.addEventListener('load', animateLogoIfReady);
                animateLogoIfReady();
            }
            if (logoRef.current && logoRef.current.tagName === 'IMG') {
                gsap.fromTo(logoRef.current,
                  { y: -100, opacity: 0, rotation: gsap.utils.random(-80, 80) },
                  { y: 0, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)', delay: 0.5 }
                );
            }
            const desktopLinks = gsap.utils.toArray('.desktop-nav-link');
            desktopLinks.forEach(link => {
                const originalText = link.textContent;
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, { duration: 0.5, scrambleText: { text: originalText, chars: "XO*#?/", speed: 0.4, ease: 'power2.inOut' } });
                });
            });
            // Efecto Hover para los Botones CTA
            const ctaButtons = navRef.current.querySelectorAll('.cta-button');
            ctaButtons.forEach((ctaButton) => {
                const circleFill = ctaButton.querySelector('.circle-fill');
                if (!circleFill) return;
                // Detectar si es el botón de home (icono)
                const isHomeButton = ctaButton.querySelector('svg') && ctaButton.querySelector('.cta-text') && ctaButton.querySelector('.cta-text').textContent === '';
                if (isHomeButton) return; // No aplicar efecto hover al botón home
                let lastColorIndex = -1;
                const onButtonEnter = (e) => {
                    const rect = ctaButton.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // Solo color #5720C6 para el efecto circular
                    gsap.set(circleFill, { top: y, left: x, backgroundColor: '#5720C6' });
                    gsap.to(circleFill, { scale: 15, duration: 0.5, ease: 'power2.out' });
                };
                const onButtonLeave = () => { gsap.to(circleFill, { scale: 0, duration: 0.5, ease: 'power2.in' }); };
                ctaButton.addEventListener('mouseenter', onButtonEnter);
                ctaButton.addEventListener('mouseleave', onButtonLeave);
            });
        }, navRef);
        return () => ctx.revert();
    }, []);
    useEffect(() => {
        if (menuTl.current) {
            if (isMenuOpen) {
                menuTl.current.play();
            } else {
                menuTl.current.reverse();
            }
        }
    }, [isMenuOpen]);
    useEffect(() => {
        const navbar = navRef.current;
        const servicesSection = document.querySelector('.services-section');
        const footerSection = document.querySelector('.footer-section');
        const comparisonSection = document.querySelector('.comparison-section');
        if (!navbar || (!servicesSection && !footerSection)) return;
        const checkPosition = () => {
            const navbarBottom = navbar.getBoundingClientRect().bottom;
            const servicesTop = servicesSection ? servicesSection.getBoundingClientRect().top : Infinity;
            const servicesBottom = servicesSection ? servicesSection.getBoundingClientRect().bottom : -Infinity;
            const footerTop = footerSection ? footerSection.getBoundingClientRect().top : Infinity;
            const footerBottom = footerSection ? footerSection.getBoundingClientRect().bottom : -Infinity;
            const comparisonTop = comparisonSection ? comparisonSection.getBoundingClientRect().top : Infinity;
            const isOverServices = navbarBottom > servicesTop && navbarBottom < servicesBottom && navbarBottom < comparisonTop;
            const isOverFooter = navbarBottom > footerTop && navbarBottom < footerBottom;
            if (isOverServices || isOverFooter) {
                setIsContrast(true);
            } else {
                setIsContrast(false);
            }
        };
        checkPosition();
        window.addEventListener('scroll', checkPosition);
        return () => window.removeEventListener('scroll', checkPosition);
    }, []);
    const openSubmenu = () => {
        if (submenuCloseTimeout.current) {
            clearTimeout(submenuCloseTimeout.current);
        }
        if (submenuTriggerRef.current) {
            const rect = submenuTriggerRef.current.getBoundingClientRect();
            setSubmenuPos({
                left: rect.left,
                top: rect.bottom,
                width: rect.width
            });
            setSubmenuArrowLeft(rect.left + rect.width / 2);
            setIsSubmenuOpen(true);
        }
    };
    const closeSubmenu = () => {
        submenuCloseTimeout.current = setTimeout(() => {
            setIsSubmenuOpen(false);
        }, 150);
    };
    const cancelCloseSubmenu = () => {
        if (submenuCloseTimeout.current) {
            clearTimeout(submenuCloseTimeout.current);
        }
    };
    const [isMobileSuperMenuOpen, setIsMobileSuperMenuOpen] = useState(false);
  return (
        <header ref={navRef} className={`main-header${isContrast ? ' navbar-contrast' : ''}`}>
            <div className="navbar-wrapper">
                <a href="/" className="logo-link">
                    <img ref={logoRef} src="/fleximy-logo.svg" className="navbar-logo" alt="Fleximy logo" style={{ filter: 'brightness(0) invert(1)' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button className="cta-button" onClick={() => window.location.href = '/'} style={{ background: 'transparent', color: '#FCFEFE', borderColor: 'transparent' }}> 
                        <span className="cta-text">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#FCFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 22V12H15V22" stroke="#FCFEFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span> 
          </button>
                    <button 
                        className="cta-button" 
                        onClick={() => setIsCalendlyOpen(true)} 
                        style={{ background: '#A0EDE7', color: '#311B6E', border: 'none', borderColor: '#A0EDE7', transition: 'background 0.3s, color 0.3s' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#5720C6';
                            e.currentTarget.style.color = '#FCFEFE';
                            e.currentTarget.style.border = 'none';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = '#A0EDE7';
                            e.currentTarget.style.color = '#311B6E';
                            e.currentTarget.style.border = 'none';
                        }}
                    >
                        <span className="cta-text">Hablemos</span>
          </button>
        </div>
                <button className="mobile-cta-button" onClick={() => setIsCalendlyOpen(true)}>Hablemos</button>
                <button className="mobile-cta-button" onClick={() => window.location.href = '/'} style={{ background: 'transparent', color: '#270F03', borderColor: 'transparent', padding: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
      </div>
            <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </header>
  );
};

export default Navbar2;