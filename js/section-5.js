  document.querySelectorAll('.slider').forEach(slider => {
    const track = slider.querySelector('.slide-track');
    const slides = Array.from(track.children);

    // Clonar todas las imágenes y agregarlas al final
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
  });
