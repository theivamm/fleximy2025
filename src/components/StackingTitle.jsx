import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const titleLines = ["CÓMO", "COMIENZO", "A FLEXEAR?"];

const StackingTitle = React.forwardRef((props, ref) => {
    const titleRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: false, // Sin scrub
                }
            });

            // Animación de entrada de las letras de "CÓMO"
            tl.from('#C', { y: -80, opacity: 0, duration: 0.3, ease: 'bounce.out' })
              .from('#O1', { scale: 0, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, '-=0.1')
              .from('#M', { x: -60, opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1')
              .from('#O2', { rotationY: 180, opacity: 0, duration: 0.3, ease: 'power4.out' }, '-=0.1')

              // Animación de entrada de las letras de "COMIENZO"
              .from('#C2', { scaleY: 0, opacity: 0, duration: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=0.1')
              .from('#O3', { y: 80, opacity: 0, duration: 0.25, ease: 'bounce.out' }, '-=0.1')
              .from('#M2', { scale: 0, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, '-=0.1')
              .from('#I', { x: 60, opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1')
              .from('#E', { rotation: 360, opacity: 0, duration: 0.3, ease: 'expo.out' }, '-=0.1')
              .from('#N', { y: -80, opacity: 0, duration: 0.25, ease: 'bounce.out' }, '-=0.1')
              .from('#Z', { scale: 0, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, '-=0.1')
              .from('#O4', { x: -60, opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1')

              // Animación de entrada de las letras de "A FLEXEAR?"
              .from('#A', { scaleY: 0, opacity: 0, duration: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=0.1')
              .from('#F', { y: 80, opacity: 0, duration: 0.25, ease: 'bounce.out' }, '-=0.1')
              .from('#L', { scale: 0, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, '-=0.1')
              .from('#E2', { x: 60, opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1')
              .from('#X', { rotationY: 180, opacity: 0, duration: 0.3, ease: 'power4.out' }, '-=0.1')
              .from('#E3', { scaleY: 0, opacity: 0, duration: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=0.1')
              .from('#A2', { y: -80, opacity: 0, duration: 0.25, ease: 'bounce.out' }, '-=0.1')
              .from('#R', { scale: 0, opacity: 0, duration: 0.2, ease: 'back.out(2)' }, '-=0.1')
              .from('#question', { rotation: 360, opacity: 0, duration: 0.3, ease: 'expo.out' }, '-=0.1')

              // Animación del indicador de scroll
              .from(scrollIndicatorRef.current, { y: 20, opacity: 0, duration: 0.2, ease: 'power2.out' }, '-=0.1');

            // Animación continua del indicador de scroll
            gsap.to(scrollIndicatorRef.current, {
                y: -10,
                duration: 1.5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });

        }, titleRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={ref}
            className="stacking-title-viewport-center"
            id="stacking-title"
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                padding: 0,
                margin: 0,
                flexDirection: 'column',
                position: 'relative'
            }}
        >
            <div className="stacking-title-container" ref={titleRef}>
                <h1 className="stacking-title">
                    {titleLines.map((line, lineIndex) => (
                        <div key={lineIndex}>
                            {line.split("").map((letter, letterIndex) => {
                                // Generar IDs únicos para cada letra
                                let letterId = '';
                                if (lineIndex === 0) { // CÓMO
                                    if (letterIndex === 0) letterId = 'C';
                                    else if (letterIndex === 1) letterId = 'O1';
                                    else if (letterIndex === 2) letterId = 'M';
                                    else if (letterIndex === 3) letterId = 'O2';
                                } else if (lineIndex === 1) { // COMIENZO
                                    if (letterIndex === 0) letterId = 'C2';
                                    else if (letterIndex === 1) letterId = 'O3';
                                    else if (letterIndex === 2) letterId = 'M2';
                                    else if (letterIndex === 3) letterId = 'I';
                                    else if (letterIndex === 4) letterId = 'E';
                                    else if (letterIndex === 5) letterId = 'N';
                                    else if (letterIndex === 6) letterId = 'Z';
                                    else if (letterIndex === 7) letterId = 'O4';
                                } else if (lineIndex === 2) { // A FLEXEAR?
                                    if (letterIndex === 0) letterId = 'A';
                                    else if (letterIndex === 2) letterId = 'F'; // Skip space
                                    else if (letterIndex === 3) letterId = 'L';
                                    else if (letterIndex === 4) letterId = 'E2';
                                    else if (letterIndex === 5) letterId = 'X';
                                    else if (letterIndex === 6) letterId = 'E3';
                                    else if (letterIndex === 7) letterId = 'A2';
                                    else if (letterIndex === 8) letterId = 'R';
                                    else if (letterIndex === 9) letterId = 'question';
                                }
                                
                                return (
                                    <span 
                                        key={letterIndex} 
                                        id={letterId}
                                        className="h1-word-wrapper"
                                        style={{ display: 'inline-block' }}
                                    >
                                        <span className="h1-word">{letter}</span>
                                    </span>
                                );
                            })}
                        </div>
                    ))}
                </h1>
            </div>
            
            {/* Indicador de scroll */}
            <div 
                ref={scrollIndicatorRef}
                className="scroll-indicator"
                style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    color: 'var(--chocolate-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    opacity: 0.7,
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
                onClick={() => {
                    const stackingCards = document.getElementById('stacking-cards');
                    if (stackingCards) {
                        // Hacer scroll hasta la sección de cards
                        stackingCards.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // Activar la primera card
                        setTimeout(() => {
                            sessionStorage.setItem('stackingCardsAuto', 'true');
                            // Refrescar ScrollTrigger
                            gsap.scrollTrigger.refresh();
                        }, 300);
                    }
                }}
            >
                <div style={{ marginBottom: '0.5rem' }}>scroll</div>
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ display: 'block', margin: '0 auto' }}
                >
                    <path d="M7 13l5 5 5-5"/>
                    <path d="M7 6l5 5 5-5"/>
                </svg>
            </div>
        </section>
    );
});

export default StackingTitle; 