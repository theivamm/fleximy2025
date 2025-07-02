import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slidesData = [
    { id: 1, bgColor: 'var(--azul)', title: 'Gestioná múltiples proyectos', text: 'Crea y administra tus proyectos en un formato super intuitivo, obtené actualizaciones y visualiza en tiempo real en que proyectos se está avanzando.', asset: '/Gestiona_Boxie.svg', align: 'left', textColor: 'var(--blanco)' },
    { id: 2, bgColor: 'var(--violeta)', title: 'Actualizaciones en Tiempo Real', text: 'Podes hablar y comentar todos los proyectos en tiempo real con los diseñadores asignados.', asset: '/Updates.svg', align: 'right', textColor: 'var(--blanco)' },
    { id: 3, bgColor: 'var(--azul)', title: 'Hacé revisiones Point & Click', text: 'En cualquier diseño, deja tus comentarios en zonas especificas para que los diseñadores entiendan perfectamente como y donde queres tus modificaciones.', asset: '/Point&Click.svg', align: 'left', textColor: 'var(--blanco)' },
    { id: 4, bgColor: 'var(--violeta)', title: 'Gestioná todas tus marcas', text: 'Mientras mas organizados estemos, más facil sera encontrar todos tus proyectos, dentro de sus marcas.', asset: '/Gestion.svg', align: 'right', textColor: 'var(--blanco)' },
    { id: 5, bgColor: 'var(--azul)', title: 'Colaborá con tu equipo', text: 'Invita a miembros de tu equipo para ver, ajustar, comentar y descargar proyectos.', asset: '/Colabora.svg', align: 'left', textColor: 'var(--blanco)' }
];

const PlatformSection = () => {
    const componentRef = useRef(null);
    const introSceneRef = useRef(null);
    const horizontalWrapperRef = useRef(null);
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            const introScene = introSceneRef.current;
            const horizontalWrapper = horizontalWrapperRef.current;
            const horizontalTrack = horizontalWrapper.querySelector('.horizontal-track');
            const slides = gsap.utils.toArray('.horizontal-slide');

            // --- Timeline Principal que controla TODA la sección ---
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top top',
                    end: () => `+=${(slides.length - 1) * window.innerWidth}`,
                    pin: true,
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            });
            
            // 1. La escena de introducción se desliza hacia arriba para desaparecer
            mainTl.to(introScene, {
                yPercent: -100,
                ease: 'power2.inOut',
            });
            
            // 2. El scroll horizontal comienza DESPUÉS de que la intro haya desaparecido
            mainTl.to(horizontalTrack, {
                x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
                ease: 'none',
            });

            // 3. Animación de flotación para cada asset
            slides.forEach((slide) => {
                const asset = slide.querySelector('.slide-asset img');
                if (asset) {
                    gsap.to(asset, {
                        y: -20,
                        duration: 3,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }
            });

        }, componentRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} id="platform-section" className="platform-section">
            <div ref={introSceneRef} className="intro-scene" style={{ backgroundColor: 'var(--violeta)' }}>
                <div className="intro-content" style={{ color: 'var(--blanco)' }}>
                    <div className="intro-asset">
                        <img src="/fatcat.svg" alt="Gato gordo" />
                    </div>
                    <div className="intro-text">
                        <h1>Tu plataforma de gestión de proyectos creativos</h1>
                        <h2>Al suscribirte a Fleximy, se te dara acceso a tu plataforma de getión de proyectos dedicada, en donde podras hacer esto y mucho más!</h2>
                    </div>
                </div>
            </div>

            <div ref={horizontalWrapperRef} className="horizontal-wrapper">
                <div className="horizontal-track">
                    {slidesData.map((slide, index) => (
                        <div key={slide.id} className="horizontal-slide" style={{ backgroundColor: slide.bgColor }}>
                            <div className={`slide-content-wrapper ${slide.align === 'right' ? 'align-right' : ''}`} style={{ color: slide.textColor }}>
                                <div className="slide-text">
                                    <h1>{slide.title}</h1>
                                    <h2>{slide.text}</h2>
                                </div>
                                <div className={`slide-asset slide-asset-${index + 1}`}>
                                    <img 
                                        src={slide.asset} 
                                        alt={slide.title}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformSection;
