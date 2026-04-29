document.addEventListener('DOMContentLoaded', function() {
    // Select ALL carousels on the page
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        // Scoped selection: search ONLY inside the current carousel
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const fullscreenBtn = carousel.querySelector('.fullscreen-btn');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        // 1. Create indicators locally
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = carousel.querySelectorAll('.indicator');

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // 2. Local Event Listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // 3. Robust Fullscreen Logic
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                carousel.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // 4. Update UI based on fullscreen state
        carousel.addEventListener('fullscreenchange', () => {
            const isFull = !!document.fullscreenElement;
            carousel.classList.toggle('fullscreen', isFull);
            fullscreenBtn.innerHTML = isFull ? '&#x2715;' : '&#x26F6;';
        });

        // 5. Keyboard Navigation (scoped to the active fullscreen carousel)
        document.addEventListener('keydown', (e) => {
            if (document.fullscreenElement === carousel) {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            }
        });

        // Initialize
        updateCarousel();
    });
});