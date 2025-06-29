import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FAQ.css'; // CORRECCIÓN: La ruta ahora es correcta

const faqData = [
    {
        question: "¿De donde salen los creativos que trabajan en Fleximy?",
        answer: "Reclutamos talentos creativos de todo Latinoamerica para satisfacer las diversas necesidades de diseño de nuestros clientes. Todos nuestros miembros son empleados a tiempo completo con salarios y beneficios competitivos."
    },
    {
        question: "¿Qué tan rápido es el tiempo de respuesta de Fleximy?",
        answer: "Todos los planes generalmente te darán una respuesta el mismo día. Sin embargo, las tareas complejas como ilustraciones personalizadas, diseño web/app, landings, infografías, folletos de varias páginas y presentaciones pueden llevar más tiempo, pero de todas formas respondemos mas rápido que cualquier freelancer o diseñador del mercado, hemos terminado websites completos en menos de una semana!. La mayoría de las revisiones sencillas se pueden completar en un día."
    },
    {
        question: "¿Cuántas horas al mes trabajará mi diseñador?",
        answer: "Fleximy no factura por hora. Nuestro modelo de facturación de tarifa fija te ofrece proyectos de diseño ilimitados sin limitaciones. Crea un proyecto y te asignaremos un diseñador al instante. Tan pronto como un proyecto se marque como finalizado, comenzaremos el proyecto siguiente el mismo día."
    },
    {
        question: "¿Cuántos diseños puedo obtener en un mes?",
        answer: "Fleximy ofrece una velocidad líder en la industria sin comprometer la calidad. La cantidad de diseños que podemos completar para ti cada mes depende de la complejidad del proyecto y de tu capacidad de bajar una tarea de manera clara y de tus respuestas a las preguntas y comentarios."
    },
    {
        question: "¿Cómo funcionan las revisiones?",
        answer: "Hacer revisiones es simple con Fleximy. Nuestra herramienta Point & Click te permite marcar las correcciones directamente en el diseño. Se acabaron las capturas de pantalla desordenadas o los problemas para describir tus ediciones."
    },
    {
        question: "¿Qué sucede si no me gusta mi diseño?",
        answer: "Si un diseño no te gusta, marca tus correcciones directamente en el diseño utilizando nuestra herramienta Point & Click. Tu diseñador será notificado y hará los ajustes de inmediato. Cada proyecto viene con revisiones ilimitadas, así que no descansaremos hasta que estés encantado."
    },
    {
        question: "¿Qué software de diseño usan en Fleximy?",
        answer: "Principalmente usamos productos de Adobe. Para presentaciones, podemos usar Google Slides. Aunque nos adaptamos a muchos softwares, Figma, utilizamos herramientas como Github, Netlify entre muchas otras."
    },
    {
        question: "¿Cómo funciona la garantía de devolución de dinero de 7 días de Fleximy?",
        answer: "Te devolvemos tu dinero en caso que el servicio no te guste, dentro de la primera semana de trabajo. Hacemos que cancelar tu suscripción sea simple. Puedes solicitar la cancelación contactandote con nosotros. Hacemos que las cancelaciones sean sencillas porque confiamos en la calidad de nuestro servicio para mantenerte, no en la letra pequeña."
    },
    {
        question: "¿Qué significa diseño gráfico ilimitado?",
        answer: "Diseño gráfico ilimitado significa que no tenes que pagar por hora o por proyecto. Crea tantos proyectos de diseño como necesites, y los completaremos en el orden que establezcas. Una vez que se completa un proyecto, comenzaremos el siguiente en tu fila el mismo día."
    }
    
    
];

const FAQItem = ({ item, isOpen, onClick }) => {
    const answerRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        // Animación del ícono +/-
        gsap.to(iconRef.current.querySelector('.horizontal'), {
            rotation: isOpen ? 0 : 90,
            duration: 0.3,
            ease: 'power2.inOut'
        });

        // Animación del acordeón
        if (isOpen) {
            gsap.to(answerRef.current, {
                height: 'auto',
                duration: 0.6,
                ease: 'elastic.out(1, 0.75)'
            });
        } else {
            gsap.to(answerRef.current, {
                height: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    }, [isOpen]);

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={onClick}>
                <h3>{item.question}</h3>
                <div ref={iconRef} className="faq-icon">
                    <div className="faq-icon-line vertical"></div>
                    <div className="faq-icon-line horizontal"></div>
                </div>
            </div>
            <div ref={answerRef} className="faq-answer-wrapper">
                <div className="faq-answer">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="faq-section">
            <div className="faq-wrapper">
                <div className="faq-left">
                    <div className="faq-image-container">
                        <img 
                            src="/faq-fleximy-img.webp" 
                            alt="FAQ Fleximy" 
                            className="faq-image"
                        />
                    </div>
                </div>
                <div className="faq-right">
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
