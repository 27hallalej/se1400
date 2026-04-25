document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const fullscreenBtn = carousel.querySelector('.fullscreen-btn');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = carousel.querySelectorAll('.indicator');

    // Initialize carousel to first slide
    updateCarousel();

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
                
        // Update indicators
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
        if (carousel.classList.contains('fullscreen')) {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            carousel.classList.remove('fullscreen');
            fullscreenBtn.innerHTML = '&#x26F6;';
        } else {
            // Reset to first slide before entering fullscreen
            currentIndex = 0;
            updateCarousel();
            
            // Enter fullscreen
            carousel.classList.add('fullscreen');
            if (carousel.requestFullscreen) {
                carousel.requestFullscreen();
            } else if (carousel.webkitRequestFullscreen) {
                carousel.webkitRequestFullscreen();
            } else if (carousel.mozRequestFullScreen) {
                carousel.mozRequestFullScreen();
            } else if (carousel.msRequestFullscreen) {
                carousel.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '&#x2715;';
        }
    });

    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            carousel.classList.remove('fullscreen');
            fullscreenBtn.innerHTML = '&#x26F6;';
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (carousel.classList.contains('fullscreen')) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'Escape') {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    });
});