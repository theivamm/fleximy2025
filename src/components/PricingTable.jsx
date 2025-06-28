import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PricingTable.css';

gsap.registerPlugin(ScrollTrigger);

const colorPalette = [ 'var(--cyan-light)', 'var(--red-not-scarlet)', 'var(--yellow-cartoon)', 'var(--violet-light)', 'var(--green-turtle)', 'var(--punk-fresa)'];

const pricingData = [
    {
        plan: "PRO",
        title: "Full Diseñador Sr.",
        description: "Contrata un diseñador grafico sr. para todos tus proyectos, ideal para redes sociales, creacion de marcas y campañas de ads.",
        price: "$300.000"
    },
    {
        plan: "IDEAL",
        title: "Full Diseñador Multimedia Sr.",
        description: "Con el diseñador Multimedia tendras no solo piezas estaticas maravillosas, sino tambien alguien que cree videos increibles, y sepa lo básico sobre diseño web.",
        price: "$450.000"
    },
    {
        plan: "MASTER",
        title: "Graphics + UX/UI + Programador",
        description: "Suma un diseñador multimedia, Diseñador UX/UI, y un programador, un equipo dedicado y complejo solo para vos.",
        price: "$600.000"
    }
];

const PricingTable = () => {
    const componentRef = useRef(null);

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
                {"Nuestros Planes".split(" ").map((word, index) => (
                    <span key={index} className="title-word-wrapper">
                        <span className="title-word">{word}</span>
                    </span>
                ))}
            </h1>
            <div className="pricing-grid">
                {pricingData.map((plan, index) => (
                    <div key={index} className="price-card">
                        <h1>{plan.plan}</h1>
                        <h2>{plan.title}</h2>
                        <h3 className="price-tag">{plan.price}</h3>
                        <p>{plan.description}</p>
                        <button className="cta-button">
                            <span className="cta-text">¡Lo quiero!</span>
                            <span className="circle-fill"></span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingTable;
