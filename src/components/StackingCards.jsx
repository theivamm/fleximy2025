import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    {
        id: 1,
        backgroundColor: 'var(--violeta)',
        title: 'Suscribite',
        text: 'Suscribirse es facilísimo... bueno, en teoría. Solo busca la parte de suscribrise que esta más abajo.',
        asset: '/suscribite.svg',
        align: 'left',
        textColor: 'var(--blanco)'
    },
    {
        id: 2,
        backgroundColor: 'var(--azul)',
        title: 'Agregá tareas',
        text: 'Comenzá a añadir tareas y proyectos de diseño a tu lista de pendientes. ¡Agregá tantas como quieras y nos pondremos manos a la obra!',
        asset: '/agrega-tareas.svg',
        align: 'right',
        textColor: 'var(--blanco)'
    },
    {
        id: 3,
        backgroundColor: 'var(--agua)',
        title: 'Descargá los diseños',
        text: 'Empezá a recibir tus diseños en un par de días hábiles. Los ajustes que podes hacer son ilimitados, no descansaremos hasta que estés satisfecho.',
        asset: '/descarga.svg',
        align: 'left',
        textColor: 'var(--violeta2)'
    }
];

// El título se moverá a otro componente
// const titleLines = ["CÓMO", "COMIENZO", "A FLEXEAR?"];

const StackingCards = () => {
    const componentRef = useRef(null);
    // const titleRef = useRef(null); // Ya no se usa aquí

    useEffect(() => {
        const auto = sessionStorage.getItem('stackingCardsAuto') === 'true';
        
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.stacking-card');

            // Timeline principal que controla la secuencia SOLO de las cards
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top top',
                    end: '+=3000',
                    pin: true,
                    scrub: 1,
                }
            });

            if (auto) {
                sessionStorage.removeItem('stackingCardsAuto');
                // Mostrar primera card inmediatamente
                gsap.set(cards[0], { 
                    yPercent: 0, 
                    opacity: 1, 
                    scale: 1 
                });
                // Ocultar las otras cards
                gsap.set(cards.slice(1), { 
                    yPercent: 120, 
                    autoAlpha: 0 
                });
                
                // Animación de las cards 2 y 3 con scroll
                cards.slice(1).forEach((card, index) => {
                    const cardIndex = index + 1;
                    mainTl.to(card, {
                        yPercent: 0,
                        autoAlpha: 1,
                        ease: 'power1.inOut'
                    })
                    .to(cards[cardIndex - 1], {
                        scale: 1 - (cardIndex * 0.05),
                        y: cardIndex * 20,
                        ease: 'power1.inOut'
                    }, "<");
                });
            } else {
                // Estado inicial: primera card visible, otras ocultas
                gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });
                gsap.set(cards.slice(1), { yPercent: 120, autoAlpha: 0 });
                
                // Animación de las cards 2 y 3 con scroll
                cards.slice(1).forEach((card, index) => {
                    const cardIndex = index + 1;
                    mainTl.to(card, {
                        yPercent: 0,
                        autoAlpha: 1,
                        ease: 'power1.inOut'
                    })
                    .to(cards[cardIndex - 1], {
                        scale: 1 - (cardIndex * 0.05),
                        y: cardIndex * 20,
                        ease: 'power1.inOut'
                    }, "<");
                });
            }
        }, componentRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="stacking-section stacking-cards-viewport-center" id="stacking-cards">
            <div className="cards-container">
                {cardData.map((card, index) => (
                    <div key={card.id} className="stacking-card" style={{ backgroundColor: card.backgroundColor, zIndex: index + 2 }}>
                        <div className={`card-content ${card.align === 'right' ? 'align-right' : ''}`}>
                            <div className="card-text-content">
                                <h2 style={card.textColor ? { color: card.textColor } : {}}>{card.title}</h2>
                                <p style={card.textColor ? { color: card.textColor } : {}}>{card.text}</p>
                            </div>
                            <div className="card-asset-content">
                                <img src={card.asset} alt={card.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StackingCards;