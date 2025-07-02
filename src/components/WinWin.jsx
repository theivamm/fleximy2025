import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WinWin.css';

gsap.registerPlugin(ScrollTrigger);

const WinWin = () => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const titleTopRef = useRef(null);
    const titleMiddleRef = useRef(null);
    const titleBottomRef = useRef(null);
    const subtitleRef = useRef(null);
    const carouselRef = useRef(null);
    const cardsRef = useRef([]);

    const cardsData = [
        {
            icon: '/svg_solicitudesilimitadas.svg',
            title: 'Solicitudes ilimitadas',
            description: 'Obtené una lista de pendientes de solicitudes de diseño ilimitadas y priorizalas en el orden que prefieras.'
        },
        {
            icon: '/svg_entregasrapidas.svg',
            title: 'Entregás rápidas',
            description: 'Te enviaremos la primera versión de tus diseños para que la revises dentro de las 24 a 48 horas hábiles posteriores a la asignación de la tarea.'
        },
        {
            icon: '/svg_flexibleescalable.svg',
            title: 'Flexible y escalable',
            description: 'Acumula o cancela tu suscripción en cualquier momento: no hay problema.'
        },
        {
            icon: '/svg_diseñadoresexpertos.svg',
            title: 'Diseñadores expertos',
            description: 'Desarrollado por un equipo altamente capacitado y unido de diseñadores de alto nivel.'
        },
        {
            icon: '/svg_preciosasequibles.svg',
            title: 'Precios asequibles',
            description: 'Obtené talento de primer nivel al costo de un diseñador Junior.'
        },
        {
            icon: '/svg_bastadellamads.svg',
            title: 'Basta de llamadas',
            description: 'Nuestra dinámica sin reuniones ni llamadas fijas permite a nuestros diseñadores una adaptación veloz y mayor dedicación a la creación.'
        },
        {
            icon: '/svg_enfoque.svg',
            title: 'Enfoque',
            description: 'Nos concentramos en una sola tarea a la vez, lo que da como resultado una calidad superior.'
        },
        {
            icon: '/svg_sincontratos.svg',
            title: 'Sin contratos',
            description: 'Sin vueltas: nada de contratos eternos ni burocracia. Solo la creatividad que necesitás, sin complicaciones.'
        }
    ];

    const colorPalette = [
        'var(--azul)',
        'var(--pink)',
        'var(--agua)',
        'var(--blanco)'
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del carrusel infinito
            gsap.to(carouselRef.current, {
                x: '-50%',
                duration: 20,
                ease: 'none',
                repeat: -1
            });

            // Animación de cambio de colores del texto del carrusel
            const textElements = carouselRef.current.querySelectorAll('.carousel-text');
            let colorIndex = 0;
            
            gsap.to(textElements, {
                color: () => {
                    const color = colorPalette[colorIndex];
                    colorIndex = (colorIndex + 1) % colorPalette.length;
                    return color;
                },
                duration: 2,
                stagger: 0.5,
                repeat: -1,
                ease: 'none'
            });

            // Animación de entrada para la imagen
            gsap.from(imgRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            // Animación de entrada para los títulos y subtítulo
            gsap.from([titleTopRef.current, titleMiddleRef.current, titleBottomRef.current, subtitleRef.current], {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.18,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            // Animación de entrada para las cards
            gsap.from(cardsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.winwin-cards-section',
                    start: 'top 80%',
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="ventajas" className="winwin-section">
            {/* Carrusel superior */}
            <div className="winwin-carousel">
                <div ref={carouselRef} className="carousel-track">
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                    <span className="carousel-text">FLEXEÁ AHORA</span>
                </div>
            </div>

            <div className="winwin-container">
                <div className="winwin-content">
                    <div className="winwin-img-column">
                        <img ref={imgRef} src="/winwin-image.png" alt="Win Win" className="winwin-img" />
                    </div>
                    <div className="winwin-text-column">
                        <div className="winwin-title">
                            <h2 ref={titleTopRef} className="title-line winwin-title-top">Esto es un</h2>
                            <h1 ref={titleMiddleRef} className="title-line winwin-title-middle">Win Win</h1>
                            <h2 ref={titleBottomRef} className="title-line winwin-title-bottom">Asegurado</h2>
                        </div>
                        <p ref={subtitleRef} className="winwin-subtitle">
                            Siempre nos preguntamos, ¿Cómo las empresas y agencias pueden seguir operando sin un servicio y sistema tan SIMPLE?
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección de Cards */}
            <div className="winwin-cards-section">
                <div className="winwin-cards-container">
                    <div className="winwin-cards-grid">
                        {cardsData.map((card, index) => (
                            <div 
                                key={index} 
                                ref={el => cardsRef.current[index] = el}
                                className="winwin-card"
                            >
                                <div className="card-icon">
                                    <img src={card.icon} alt={card.title} />
                                </div>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-description">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WinWin; 