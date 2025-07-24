document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Slider ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const nextBtn = document.querySelector('.next-slide');
        const prevBtn = document.querySelector('.prev-slide');
        const paginationContainer = document.querySelector('.slider-pagination');
        let currentSlide = 0;
        let slideInterval;

        if (slides.length > 0) {
            // Create pagination dots
            slides.forEach((slide, index) => {
                const dot = document.createElement('div');
                dot.classList.add('pagination-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                paginationContainer.appendChild(dot);
            });

            const paginationDots = paginationContainer.querySelectorAll('.pagination-dot');

            function goToSlide(slideIndex) {
                if (slides[currentSlide]) {
                    slides[currentSlide].classList.remove('active');
                }
                if (paginationDots[currentSlide]) {
                    paginationDots[currentSlide].classList.remove('active');
                }
                
                currentSlide = (slideIndex + slides.length) % slides.length;
                
                if (slides[currentSlide]) {
                    slides[currentSlide].classList.add('active');
                }
                if (paginationDots[currentSlide]) {
                    paginationDots[currentSlide].classList.add('active');
                }
                resetInterval();
            }

            function nextSlide() {
                goToSlide(currentSlide + 1);
            }

            function prevSlide() {
                goToSlide(currentSlide - 1);
            }

            function startInterval() {
                slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
            }

            function resetInterval() {
                clearInterval(slideInterval);
                startInterval();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            startInterval(); // Start the slider automatically
        }
    }

    // --- Testimonial Carousel ---
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial-item');
        let currentTestimonial = 0;
        let testimonialInterval;

        function showTestimonial(index) {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (index + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }

        function nextTestimonial() {
            showTestimonial(currentTestimonial + 1);
        }

        testimonialInterval = setInterval(nextTestimonial, 3000);

        testimonialCarousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialCarousel.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 3000);
        });
    }

    // --- Scroll Reveal Animation for Cards ---
    const cards = document.querySelectorAll('.project-card, .blog-card, .single-testimonial');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // --- Mobile Menu Toggle removed: menu now always visible ---
    
    // --- Loader (from original code) ---
    const loader = document.querySelector('.loader');
    if(loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 200);
        });
    }
});
