import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FAQ.css'; // CORRECCIÓN: La ruta ahora es correcta

const faqData = [
    {
        question: "Lorem ipsum dolor sit amet, consectetur?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        question: "Duis aute irure dolor in reprehenderit?",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        question: "Excepteur sint occaecat cupidatat non proident?",
        answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        question: "Nemo enim ipsam voluptatem quia voluptas?",
        answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
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
