// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import CalendlyPopup from './CalendlyPopup';
import './CalendlyPopup.css';

gsap.registerPlugin(ScrambleTextPlugin);

const colorPalette = [ 'var(--cyan-light)', 'var(--red-not-scarlet)', 'var(--yellow-cartoon)', 'var(--violet-light)', 'var(--green-turtle)', 'var(--punk-fresa)'];
const navLinks = [
  { name: "Conócenos", href: "#stacking-title" },
  { name: "Cómo funciona?", href: "#platform-section" },
  { name: "Ventajas", href: "#ventajas" },
  { name: "Qué hacemos?", href: "#que-hacemos" },
  { name: "Porqué Flexear", href: "#porque-flexear" },
  { name: "Planes", href: "#planes" },
  { name: "FAQs", href: "#faqs" }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuBgColor, setMenuBgColor] = useState('var(--punk-fresa)');
    const [isContrast, setIsContrast] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const menuTl = useRef(null);

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

    // === useEffect ÚNICO Y UNIFICADO para TODA la lógica ===
    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- LÓGICA DEL MENÚ MÓVIL ---
            const menuOverlay = navRef.current.querySelector('.mobile-menu-overlay');
            const burgerLines = navRef.current.querySelectorAll('.burger-line');
            const mobileLinks = navRef.current.querySelectorAll('.mobile-nav-link');
            
            // 1. Creamos la timeline del menú y la guardamos en el ref
            menuTl.current = gsap.timeline({ 
                paused: true,
                onStart: () => { gsap.set(menuOverlay, { pointerEvents: 'all' }); },
                onReverseComplete: () => { gsap.set(menuOverlay, { pointerEvents: 'none' }); }
            });

            // 2. Definimos la animación de apertura del menú
            menuTl.current
                .to(menuOverlay, { clipPath: 'circle(150% at 90% 50%)', duration: 0.7, ease: 'power3.inOut' })
                .to(burgerLines[0], { rotation: 45, y: 8, duration: 0.3 }, "<")
                .to(burgerLines[1], { opacity: 0, duration: 0.3 }, "<")
                .to(burgerLines[2], { rotation: -45, y: -8, duration: 0.3 }, "<")
                // Se anima la aparición de los links dentro del menú
                .from(mobileLinks, { y: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.3");

            // --- LÓGICA DE ESCRITORIO ---
            const logoObject = logoRef.current;
            let retryCount = 0;
            const maxRetries = 10;
            const retryDelay = 100; // ms

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
                // Animación de entrada del logo
                gsap.set(letters, { autoAlpha: 0, y: -100, rotation: "random(-80, 80)" });
                gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' });
                const logoTl = gsap.timeline({ delay: 1 });
                logoTl.to(letters, { autoAlpha: 1, y: 0, rotation: 0, ease: "back.out(1.4)", duration: 1, stagger: { each: 0.08, from: "random" } })
                      .to(underline, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, "-=1");
            }

            if (logoObject) {
                logoObject.addEventListener('load', animateLogoIfReady);
                // Si el logo ya está cargado, intenta animar inmediatamente
                animateLogoIfReady();
            }

            // --- Animación de entrada para el logo <img> ---
            if (logoRef.current && logoRef.current.tagName === 'IMG') {
                gsap.fromTo(logoRef.current,
                  { y: -100, opacity: 0, rotation: gsap.utils.random(-80, 80) },
                  { y: 0, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)', delay: 0.5 }
                );
            }

            // Efecto Hover para los Links del Menú
            const desktopLinks = gsap.utils.toArray('.desktop-nav-link');
            desktopLinks.forEach(link => {
                const originalText = link.textContent;
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, { duration: 0.5, scrambleText: { text: originalText, chars: "XO*#?/", speed: 0.4, ease: 'power2.inOut' } });
                });
            });
            
            // Efecto Hover para el Botón CTA
            const ctaButton = navRef.current.querySelector('.cta-button');
            if (ctaButton) {
                const circleFill = ctaButton.querySelector('.circle-fill');
                let lastColorIndex = -1;
                const onButtonEnter = (e) => {
                    const rect = ctaButton.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    let colorIndex;
                    do { colorIndex = Math.floor(Math.random() * colorPalette.length); } while (colorIndex === lastColorIndex);
                    lastColorIndex = colorIndex;
                    gsap.set(circleFill, { top: y, left: x, backgroundColor: colorPalette[colorIndex] });
                    gsap.to(circleFill, { scale: 15, duration: 0.5, ease: 'power2.out' });
                };
                const onButtonLeave = () => { gsap.to(circleFill, { scale: 0, duration: 0.5, ease: 'power2.in' }); };
                ctaButton.addEventListener('mouseenter', onButtonEnter);
                ctaButton.addEventListener('mouseleave', onButtonLeave);
            }
        }, navRef);

        return () => ctx.revert();
    }, []); // Este useEffect solo se ejecuta una vez

    // Este useEffect se mantiene separado, solo para CONTROLAR el menú
    useEffect(() => {
        if (menuTl.current) {
            if (isMenuOpen) {
                let newColor;
                do { newColor = gsap.utils.random(colorPalette); } while (newColor === menuBgColor);
                setMenuBgColor(newColor);
                menuTl.current.play();
            } else {
                menuTl.current.reverse();
            }
        }
    }, [isMenuOpen]);

    // === Detección de intersección con ServicesCarousel y Footer ===
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
            
            // Si la parte inferior de la navbar está sobre el inicio de services-section
            // Y no ha llegado al final de services-section o al inicio de comparison-section
            const isOverServices = navbarBottom > servicesTop && navbarBottom < servicesBottom && navbarBottom < comparisonTop;
            
            // Si la parte inferior de la navbar está sobre el inicio de footer-section
            const isOverFooter = navbarBottom > footerTop && navbarBottom < footerBottom;
            
            if (isOverServices || isOverFooter) {
                setIsContrast(true);
            } else {
                setIsContrast(false);
            }
        };

        // Verificar posición inicial
        checkPosition();
        
        // Escuchar scroll
        window.addEventListener('scroll', checkPosition);
        return () => window.removeEventListener('scroll', checkPosition);
    }, []);

    return (
        <header ref={navRef} className={`main-header${isContrast ? ' navbar-contrast' : ''}`}>
            <div className="navbar-wrapper">
                <a href="#" className="logo-link" onClick={handleLogoClick}>
                    <img ref={logoRef} src="/fleximy-logo.svg" className="navbar-logo" alt="Fleximy logo" />
                </a>
                <nav className="desktop-nav">
                    <ul> 
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    className="desktop-nav-link" 
                                    onClick={(e) => handleNavigation(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))} 
                    </ul>
                </nav>
                <button className="cta-button" onClick={() => setIsCalendlyOpen(true)}> <span className="cta-text">Hablemos</span> <span className="circle-fill"></span> </button>
                <button className="mobile-cta-button" onClick={() => setIsCalendlyOpen(true)}>Hablemos</button>
                <button className="burger-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="burger-line"></span> <span className="burger-line"></span> <span className="burger-line"></span>
                </button>
            </div>
            <div className="mobile-menu-overlay" style={{ backgroundColor: menuBgColor }}>
                <nav className="mobile-nav">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    className="mobile-nav-link" 
                                    onClick={(e) => {
                                        setIsMenuOpen(false);
                                        handleNavigation(e, link.href);
                                    }}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
        </header>
    );
};

export default Navbar;