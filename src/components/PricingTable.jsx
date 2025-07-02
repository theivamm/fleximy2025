import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CalendlyPopup from './CalendlyPopup';
import './PricingTable.css';

gsap.registerPlugin(ScrollTrigger);

const colorPalette = [ 'var(--azul)' ];

const pricingData = [
    {
        plan: "Pro",
        title: "Full Diseñador Sr.",
        description: "Contrata un diseñador grafico sr. para todos tus proyectos, ideal para redes sociales, creacion de marcas y campañas de ads.",
        price: "USD300"
    },
    {
        plan: "Ideal",
        title: "Full Diseñador Multimedia Sr.",
        description: "Con el diseñador Multimedia tendras no solo piezas estaticas maravillosas, sino tambien alguien que cree videos increibles, y sepa lo básico sobre diseño web.",
        price: "USD450"
    },
    {
        plan: "Master",
        title: "Graphics + UX/UI + Programador",
        description: "Suma un diseñador multimedia, Diseñador UX/UI, y un programador, un equipo dedicado y complejo solo para vos.",
        price: "USD600"
    }
];

const PricingTable = () => {
    const componentRef = useRef(null);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del Título Principal con Scrub (se mantiene)
            const mainTitleWords = componentRef.current.querySelectorAll('.pricing-main-title .title-word');
            gsap.from(mainTitleWords, {
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1,
                },
                y: -100, opacity: 0, rotation: "random(-80, 80)",
                ease: "none", stagger: 0.15
            });

            const cards = componentRef.current.querySelectorAll('.price-card');
            // Animación de entrada de las Tarjetas sin Scrub
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse' // Vuelve a la animación de entrada/salida
                },
                opacity: 0,
                y: 100,
                scale: 0.9,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.2
            });

            // Lógica de Hover para las tarjetas y botones
            cards.forEach(card => {
                const ctaButton = card.querySelector('.cta-button');
                const circleFill = ctaButton.querySelector('.circle-fill');
                
                // Eventos de Hover para la tarjeta
                const onCardEnter = () => {
                    gsap.to(card, {
                        y: -15,
                        scale: 1.03,
                        rotation: "random(-4, 4)",
                        boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.2)",
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                };
                const onCardLeave = () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                };
                card.addEventListener('mouseenter', onCardEnter);
                card.addEventListener('mouseleave', onCardLeave);

                // Eventos de Hover para el botón dentro de la tarjeta
                const onButtonEnter = (e) => {
                    const rect = ctaButton.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const randomColor = gsap.utils.random(colorPalette);
                    gsap.set(circleFill, { top: y, left: x, backgroundColor: randomColor });
                    gsap.to(circleFill, { scale: 15, duration: 0.5, ease: 'power2.out' });
                };
                const onButtonLeave = () => {
                    gsap.to(circleFill, { scale: 0, duration: 0.5, ease: 'power2.in' });
                };
                ctaButton.addEventListener('mouseenter', onButtonEnter);
                ctaButton.addEventListener('mouseleave', onButtonLeave);
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} id="planes" className="pricing-section">
            <h1 className="pricing-main-title">
                {(() => {
                    const words = "Nuestros Planes".split(" ");
                    return [
                        <span key="nuestros" style={{ color: 'var(--violeta2)' }}>Nuestros</span>,
                        ' ',
                        <span key="planes" style={{ color: 'var(--violeta)' }}>Planes</span>
                    ];
                })()}
            </h1>
            <div className="pricing-grid">
                {pricingData.map((plan, index) => (
                    <div key={index} className="price-card">
                        <h1>{plan.plan}</h1>
                        <h2>{plan.title}</h2>
                        <h3 className="price-tag">{plan.price}</h3>
                        <p dangerouslySetInnerHTML={{ __html: plan.description
                            .replace(/diseñador grafico sr/gi, '<b style="color: var(--violeta);">diseñador grafico sr</b>')
                            .replace(/diseñador multimedia/gi, '<b style="color: var(--violeta);">diseñador multimedia</b>')
                            .replace(/diseñador ux\/ui/gi, '<b style="color: var(--violeta);">Diseñador UX/UI</b>')
                            .replace(/programador/gi, '<b style="color: var(--violeta);">programador</b>')
                        }} />
                        <button className="cta-button" onClick={() => setIsCalendlyOpen(true)}>
                            <span className="cta-text">¡Lo quiero!</span>
                        </button>
                    </div>
                ))}
            </div>
            <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
        </section>
    );
};

export default PricingTable;
