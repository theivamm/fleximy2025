import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ComparisonSection.css';

gsap.registerPlugin(ScrollTrigger);

const panelsData = [
    {
        id: 'fleximy',
        h1: 'Fleximy vs Old School',
        h2: 'Fleximy te da:',
        points: ['Bajo costos', 'Tiempos de respuesta de hasta 48 hs', 'Compromiso en cada pedido', 'Tareas y revisiones ilimitadas', 'Diseñadores Sr.', 'Comenzá ya mismo', 'Gasto predecible y fijo', 'Casi no hace falta reuniones'],
        frontColor: 'var(--green-turtle)',
    },
    {
        id: 'freelancers',
        h1: 'Freelancers vs Fleximy',
        h2: 'Freelancers te aseguran:',
        points: ['Altos costos', 'Tiempos de respuesta semanales', 'Poco compromiso', 'Tareas y revisiones LIMITADAS', 'Comenzás despues de varias reuniones', 'Estructura de precios variables'],
        frontColor: 'var(--punk-fresa)',
    },
    {
        id: 'agencies',
        h1: 'Agencias vs Fleximy',
        h2: 'Agencias te aseguran:',
        points: ['Altisimos costos', 'Tiempos de respuesta mensuales', 'Poco compromiso', 'Tareas y revisiones LIMITADAS', 'Comenzás despues de varias reuniones', 'Estructura de precios altos y con sorpresas'],
        frontColor: 'var(--yellow-cartoon)',
    }
];

const ComparisonSection = () => {
    const [flippedId, setFlippedId] = useState(null);
    const componentRef = useRef(null);
    const cardRefs = useRef([]);

    // Animación del título principal
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mainTitleWords = componentRef.current.querySelectorAll('.comparison-main-title .title-word');
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
        }, componentRef);
        return () => ctx.revert();
    }, []);

    // Animación de FLIP mejorada
    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const id = panelsData[index].id;
            const front = card.querySelector('.card-face-front');
            const back = card.querySelector('.card-face-back');

            // Configuración inicial crítica
            gsap.set(card, {
                transformStyle: "preserve-3d",
                transformPerspective: 1200,
                backfaceVisibility: "hidden"
            });

            gsap.set([front, back], {
                position: "absolute",
                backfaceVisibility: "hidden"
            });

            gsap.set(back, { rotationY: 180 });

            if (flippedId === id) {
                gsap.to(card, {
                    rotationY: 180,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto",
                    onStart: () => gsap.set(card, { zIndex: 10 }),
                    onComplete: () => gsap.set(card, { zIndex: "auto" })
                });
            } else {
                gsap.to(card, {
                    rotationY: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        });
    }, [flippedId]);

    // Efecto hover
    useEffect(() => {
        const handleMouseMove = (e, card) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };

        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const frontFace = card.querySelector('.card-face-front');
                
                card.addEventListener('mousemove', (e) => {
                    if (flippedId !== panelsData[index].id) {
                        handleMouseMove(e, frontFace);
                    }
                });
            });
        }, componentRef);

        return () => ctx.revert();
    }, [flippedId]);

    const handleFlip = (id) => {
        setFlippedId(prevFlippedId => (prevFlippedId === id ? null : id));
    };

    return (
        <section ref={componentRef} id="porque-flexear" className="comparison-section-v2">
            <h1 className="comparison-main-title">
                {"Porqué Flexear?".split(" ").map((word, index) => (
                    <span key={index} className="title-word-wrapper">
                        <span className="title-word">{word}</span>
                    </span>
                ))}
            </h1>
            <div className="card-grid-container">
                {panelsData.map((panel, index) => (
                    <div
                        key={panel.id}
                        ref={el => cardRefs.current[index] = el}
                        className="comparison-card-flipper"
                        onClick={() => handleFlip(panel.id)}
                    >
                        <div className="card-face card-face-front" style={{ backgroundColor: panel.frontColor }}>
                            <h1>{panel.h1}</h1>
                            <p className="click-me-legend">
                                {'CLICK ME'.split('').map((char, i) => <span key={i} className="legend-char">{char}</span>)}
                            </p>
                        </div>
                        <div className="card-face card-face-back">
                            <h2>{panel.h2}</h2>
                            <div className="pills-container">
                                {panel.points.map((point, pIndex) => (
                                    <div key={pIndex} className="pill">{point}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ComparisonSection;