// src/components/CreativeHero.jsx

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const colorPalette = [ 'var(--cyan-light)', 'var(--red-not-scarlet)', 'var(--yellow-cartoon)', 'var(--violet-light)', 'var(--green-turtle)', 'var(--punk-fresa)'];
const titleLines = [ "Tu equipo creativo", "sin dramas" ];
const subtitleText = "Diseño y creatividad de alto nivel, con la flexibilidad que tu proyecto necesita. Olvídate de los contratos, las contrataciones y las demoras.";
// Array con la secuencia de imágenes
const catSequenceAssets = [
  '/cat-laptop-3.svg', '/cat-laptop-1.svg', '/cat-laptop-3.svg', '/cat-laptop-1.svg',
  '/cat-laptop-3.svg', '/cat-laptop-2.svg', '/cat-laptop-3.svg', '/cat-laptop.svg'
];
// Array con las duraciones de cada imagen
const catSequenceDurations = [3, 1, 1, 1, 3, 1, 2, 5];

const CreativeHero = () => {
  const container = useRef(null);
  // Refs para nuestros DOS IMGs
  const catA_Ref = useRef(null);
  const catB_Ref = useRef(null);

  const handleNavigation = (e) => {
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
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Animación de entrada y flotación ---
      const floatingCat = [catA_Ref.current, catB_Ref.current];
      gsap.to(floatingCat, { y: -20, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });

      const entryTimeline = gsap.timeline({ delay: 0.3 });
      entryTimeline.from('.h1-word', { y: -100, opacity: 0, rotation: "random(-60, 60)", duration: 0.8, ease: "back.out(1.2)", stagger: 0.08 });
      entryTimeline.from('.subtitle-word', { y: -80, opacity: 0, rotation: "random(-40, 40)", duration: 0.6, ease: "back.out(1)", stagger: 0.04 }, "-=0.5");
      entryTimeline.from('.hero-button', { scale: 0, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.5");

      // --- EFECTO DE GRADIENTE EN MOVIMIENTO PARA LAS PATITAS ---
      // Comentado temporalmente - requiere análisis detallado de SVGs
      /*
      const applyGradientToPaws = (svgObject) => {
        if (!svgObject || !svgObject.contentDocument) {
          console.log('SVG object o contentDocument no disponible');
          return;
        }
        
        const svgDoc = svgObject.contentDocument;
        console.log('SVG document encontrado:', svgDoc);
        
        // Buscar las patitas por clase st0
        const allSt0Elements = svgDoc.querySelectorAll('path.st0');
        console.log('Elementos st0 encontrados:', allSt0Elements.length);
        
        // Filtrar solo las patitas (las que están en la parte inferior del gato)
        const paws = Array.from(allSt0Elements).filter((element, index) => {
          // Tomar solo los últimos 5 elementos st0 que probablemente sean las patitas
          return index >= allSt0Elements.length - 5;
        });
        
        console.log('Patitas filtradas:', paws.length);
        console.log('Patitas:', paws);
        
        paws.forEach((paw, index) => {
          console.log(`Aplicando gradiente a patita ${index + 1}:`, paw);
          
          // Crear gradiente único para cada patita
          const gradientId = `paw-gradient-${svgObject === catA_Ref.current ? 'A' : 'B'}-${index}`;
          let defs = svgDoc.querySelector('defs');
          
          if (!defs) {
            defs = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svgDoc.documentElement.appendChild(defs);
          }
          
          // Crear el gradiente
          const gradient = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          gradient.setAttribute('id', gradientId);
          gradient.setAttribute('x1', '0%');
          gradient.setAttribute('y1', '0%');
          gradient.setAttribute('x2', '100%');
          gradient.setAttribute('y2', '0%');
          
          // Agregar stops con los colores de la paleta
          const colors = ['#F897B4', '#F5C939', '#7AE66A', '#00C5C5', '#CA9DFE', '#F897B4']; // Colores directos
          colors.forEach((color, colorIndex) => {
            const stop = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop.setAttribute('offset', `${(colorIndex / (colors.length - 1)) * 100}%`);
            stop.setAttribute('stop-color', color);
            gradient.appendChild(stop);
          });
          
          defs.appendChild(gradient);
          
          // Aplicar el gradiente a la patita
          paw.style.fill = `url(#${gradientId})`;
          console.log(`Gradiente aplicado a patita ${index + 1}:`, paw.style.fill);
          
          // Animación del gradiente
          gsap.to(gradient, {
            attr: { x1: '100%', x2: '200%' },
            duration: 3 + index * 0.5, // Diferente velocidad para cada patita
            ease: 'none',
            repeat: -1,
            yoyo: false
          });
        });
      };
      */

      // Función para aplicar gradientes cuando el SVG esté cargado
      const setupGradientOnLoad = (svgObject) => {
        if (svgObject.contentDocument && svgObject.contentDocument.readyState === 'complete') {
          // applyGradientToPaws(svgObject);
        } else {
          svgObject.addEventListener('load', () => {
            // setTimeout(() => applyGradientToPaws(svgObject), 100); // Pequeño delay para asegurar que el SVG esté listo
          });
        }
      };

      // Aplicar gradientes inicialmente
      if (catA_Ref.current) {
        setupGradientOnLoad(catA_Ref.current);
      }
      if (catB_Ref.current) {
        setupGradientOnLoad(catB_Ref.current);
      }

      // --- TIMELINE PARA LA SECUENCIA DE GATOS (USANDO <img>) ---
      let activeCat = catA_Ref.current;
      let hiddenCat = catB_Ref.current;

      // Ocultamos el segundo gato al principio
      gsap.set(hiddenCat, { opacity: 0 });

      const catSequence = gsap.timeline({
        delay: 3.5,
        repeat: -1,
      });

      catSequenceAssets.forEach((assetPath, index) => {
        catSequence.call(() => {
          // Pre-cargamos la siguiente imagen en el gato oculto
          hiddenCat.src = assetPath;

          // Cuando la imagen esté cargada, hacemos el swap
          hiddenCat.onload = function onCatLoad() {
            gsap.set(activeCat, { opacity: 0 });
            gsap.set(hiddenCat, { opacity: 1 });
            // Intercambiamos los roles de activo y oculto
            const temp = activeCat;
            activeCat = hiddenCat;
            hiddenCat = temp;
            // Nos aseguramos de que el listener de carga se use solo una vez
            hiddenCat.onload = null;
          };
        }).to({}, { duration: catSequenceDurations[index] });
      });

    }, container);
    
    // El resto de la lógica de listeners no cambia, solo la restauramos aquí
    ctx.add(() => {
      const button = container.current.querySelector('.hero-button');
      if (button) {
        const circleFill = button.querySelector('.circle-fill');
        let lastColorIndex = -1;
        const onButtonEnter = (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          let colorIndex;
          do { colorIndex = Math.floor(Math.random() * colorPalette.length); } while (colorIndex === lastColorIndex);
          lastColorIndex = colorIndex;
          gsap.set(circleFill, { top: y, left: x, backgroundColor: colorPalette[colorIndex] });
          gsap.to(circleFill, { scale: 30, duration: 0.5, ease: 'power2.out' });
        };
        const onButtonLeave = () => { gsap.to(circleFill, { scale: 0, duration: 0.5, ease: 'power2.in' }); };
        button.addEventListener('mouseenter', onButtonEnter);
        button.addEventListener('mouseleave', onButtonLeave);
        return () => {
          button.removeEventListener('mouseenter', onButtonEnter);
          button.removeEventListener('mouseleave', onButtonLeave);
        };
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="creative-hero-section">
      <div className="creative-hero-wrapper">
        <div className="hero-svg-column">
          {/* TEMPORAL: Usar <img> en vez de <object> para depuración visual */}
          <img ref={catA_Ref} src="/cat-laptop.svg" className="hero-cat-svg" alt="Gato animado con un laptop" />
          <img ref={catB_Ref} src="/cat-laptop.svg" className="hero-cat-svg" alt="Gato animado con un laptop" />
        </div>
        
        {/* COLUMNA DERECHA COMPLETA Y RESTAURADA */}
        <div className="hero-text-column">
          <h1 className="hero-title-creative">
            {titleLines.map((line, lineIndex) => (
              <div key={lineIndex} className="h1-line-container">
                {line.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="h1-word-wrapper">
                    <span className="h1-word">{word}</span>
                  </span>
                ))}
              </div>
            ))}
          </h1>
          <p className="hero-subtitle">
            {subtitleText.split(" ").map((word, index) => (
              <span key={index} className="subtitle-word-wrapper">
                <span className="subtitle-word">{word}</span>
              </span>
            ))}
          </p>
          <button className="hero-button" onClick={handleNavigation}>
            Empezá a Flexear
            <span className="circle-fill"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreativeHero;