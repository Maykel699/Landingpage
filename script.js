document.addEventListener('DOMContentLoaded', () => {
    const blogBoxes = document.querySelectorAll('.blog-box');
    const images = document.querySelectorAll('.image-container');
    let animationDisabled = false; // Controla si las animaciones están activas

    // Intersection Observer configurado para rendimiento
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Activar la animación cuando se vea al menos el 20% del elemento
    };

    const observer = new IntersectionObserver((entries) => {
        if (animationDisabled) return; // No realizar animaciones si están desactivadas

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Mostrar animación
            } else {
                entry.target.classList.remove('visible'); // Ocultar para reutilizar la animación
            }
        });
    }, observerOptions);

    // Aplicar el observer a las cajas de blog y las imágenes
    blogBoxes.forEach((box) => observer.observe(box));
    images.forEach((img) => observer.observe(img));

    // 2. requestAnimationFrame para el efecto parallax y scroll más fluido
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const header = document.querySelector('header');
                header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;

                const titleSection = document.querySelector('.title-section');
                const rect = titleSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    titleSection.classList.add('visible');
                } else {
                    titleSection.classList.remove('visible');
                }

                // Verificar si estamos al final de la página
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                    disableAnimations(); // Desactivar animaciones al llegar al final
                }

                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    // 3. Lazy Loading para imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
        img.addEventListener('load', () => {
            img.classList.add('loaded'); // Indicar que la imagen se cargó correctamente
        });
    });

    // Desactivar animaciones al final de la página
    function disableAnimations() {
        animationDisabled = true;
        // Asegurar que todas las cajas e imágenes sean visibles sin animación
        blogBoxes.forEach((box) => box.classList.add('visible'));
        images.forEach((img) => img.classList.add('visible'));
        // Desconectar el observer para evitar más observaciones
        observer.disconnect();
    }
});
const video = document.getElementById('video');
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');

// Asegura que el video tenga volumen
video.volume = 1.0;

// Alterna entre reproducción y pausa al hacer clic en el botón
playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playIcon.src = "pngtree-vector-pause-icon-png-image_966642 (1).jpg"; // Cambia a ícono de pausa
    } else {
        video.pause();
        playIcon.src = "png-transparent-triangle-circle-brand-play-button-angle-text-internet.png"; // Cambia a ícono de reproducción
    }
});
