import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesCarousel.css';

gsap.registerPlugin(Draggable, ScrollTrigger);

const cardData = [
    { id: 1, bgColor: 'var(--yellow-cartoon)', asset: '/grafico-img.png', text: 'Diseño Gráfico' },
    { id: 2, bgColor: 'var(--green-turtle)', asset: '/ilustraciones-img.png', text: 'Ilustraciones' },
    { id: 3, bgColor: 'var(--violet-light)', asset: '/marcas-img.png', text: 'Creación de marcas' },
    { id: 4, bgColor: 'var(--violet-light)', asset: '/motion-img.png', text: 'Motion Graphics' },
    { id: 5, bgColor: 'var(--green-turtle)', asset: '/packagings-img.png', text: 'Packagings' },
    { id: 6, bgColor: 'var(--red-not-scarlet)', asset: '/presentaciones-img.png', text: 'Presentaciones' },
    { id: 7, bgColor: 'var(--yellow-cartoon)', asset: '/uxui-img.png', text: 'UX/UI' },
    { id: 8, bgColor: 'var(--punk-fresa)', asset: '/web-img.png', text: 'Diseño Web' }
];

const listColumns = [
    ["Diseño de redes sociales", "Packaging", "Creación de logos", "Facebook Ads", "Google Ads", "Reels", "Tik Toks"],
    ["Merchandising", "Landing pages", "Ilustraciones para prendas", "Templates para e-mails", "Youtube Ads", "Diseños para tazas", "Diseños para gorras"],
    ["Branding", "Manuales de marca", "Stories", "Animaciones", "Videos para promo", "Todo tipo de imprimibles", "Stickers"],
    ["Presentaciones", "Infografías", "Membretes", "Brand Books", "Folletería", "Señalética", "Vinilos"]
];

const ServicesCarousel = () => {
    const componentRef = useRef(null);
    const trackRef = useRef(null);
    const animationRef = useRef(null);
    const draggableRef = useRef(null);
    const isDraggingRef = useRef(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del título
            const titleWords = componentRef.current.querySelectorAll('.title-word');
            gsap.from(titleWords, {
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                y: -100,
                opacity: 0,
                rotation: "random(-80, 80)",
                ease: "none",
                stagger: 0.15
            });

            // Configuración del carrusel
            const cards = gsap.utils.toArray('.service-card');
            if (cards.length === 0) return;

            const cardWidth = cards[0].offsetWidth + parseInt(gsap.getProperty(cards[0], "marginRight"));
            const totalWidth = cardWidth * cardData.length;
            const track = trackRef.current;

            // Clonar tarjetas para efecto infinito
            cardData.forEach((_, i) => {
                track.appendChild(cards[i].cloneNode(true));
            });

            // Función para iniciar/reiniciar animación
            const startAutoScroll = () => {
                if (animationRef.current) animationRef.current.kill();
                
                animationRef.current = gsap.to(track, {
                    x: `-=${totalWidth}`,
                    duration: 40,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize(x => {
                            const xNum = parseFloat(x);
                            return xNum % totalWidth;
                        })
                    }
                });
            };

            // Configurar Draggable
            draggableRef.current = Draggable.create(track, {
                type: "x",
                inertia: true,
                edgeResistance: 0.8,
                onPress: () => {
                    isDraggingRef.current = true;
                    animationRef.current.pause();
                },
                onDrag: function() {
                    gsap.set(track, { x: this.x });
                },
                onThrowUpdate: function() {
                    gsap.set(track, { x: this.x });
                },
                onThrowComplete: function() {
                    isDraggingRef.current = false;
                    gsap.delayedCall(0.5, startAutoScroll);
                },
                onRelease: function() {
                    if (this.tween) return;
                    isDraggingRef.current = false;
                    gsap.delayedCall(0.5, startAutoScroll);
                }
            });

            // Iniciar animación automática
            startAutoScroll();

            // Animación de la sección de listas
            const listWords = componentRef.current.querySelectorAll('.list-word');
            gsap.from(listWords, {
                scrollTrigger: {
                    trigger: componentRef.current.querySelector('.more-services-section'),
                    start: 'top 80%',
                    end: 'center 60%',
                    scrub: 1.5
                },
                y: -80,
                opacity: 0,
                rotation: "random(-60, 60)",
                ease: "none",
                stagger: 0.05
            });

        }, componentRef);

        return () => {
            ctx.revert();
            if (draggableRef.current) draggableRef.current[0].kill();
        };
    }, []);

    return (
        <section ref={componentRef} id="que-hacemos" className="services-section">
            <h1 className="services-title">
                {"¿Qué hacemos?".split(" ").map((word, index) => (
                    <span key={index} className="title-word-wrapper">
                        <span className="title-word">{word}</span>
                    </span>
                ))}
            </h1>
            <div className="carousel-container">
                <div ref={trackRef} className="carousel-track">
                    {cardData.map((card) => (
                        <div key={card.id} className="service-card" style={{ backgroundColor: card.bgColor }}>
                            <div className="service-card-content">
                                <h1>{card.text}</h1>
                            </div>
                            <div className="service-card-asset">
                                <img src={card.asset} alt={card.text} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="more-services-section">
                <h3 className="more-services-title">
                    {"Más de 120 servicios de generación de contenidos".split(" ").map((word, index) => (
                        <span key={index} className="list-word-wrapper">
                            <span className="list-word">{word}</span>
                        </span>
                    ))}
                </h3>
                <div className="services-grid">
                    {listColumns.map((column, colIndex) => (
                        <div key={colIndex} className="services-column">
                            <ul>
                                {column.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        {item.split(" ").map((word, wordIndex) => (
                                            <span key={wordIndex} className="list-word-wrapper">
                                                <span className="list-word">{word}</span>
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesCarousel;