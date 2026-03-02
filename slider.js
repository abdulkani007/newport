// Project Image Slider - Pure JavaScript
(function() {
    'use strict';

    class ProjectSlider {
        constructor(card) {
            this.card = card;
            this.slider = card.querySelector('.project-slider');
            this.images = card.querySelectorAll('.project-img');
            this.prevBtn = card.querySelector('.slider-btn.prev');
            this.nextBtn = card.querySelector('.slider-btn.next');
            this.dotsContainer = card.querySelector('.slider-dots');
            this.currentIndex = 0;
            this.autoSlideInterval = null;
            
            this.init();
        }

        init() {
            if (this.images.length <= 1) {
                this.prevBtn.style.display = 'none';
                this.nextBtn.style.display = 'none';
                return;
            }

            this.createDots();
            this.attachEvents();
            this.startAutoSlide();
        }

        createDots() {
            this.images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
            this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
        }

        attachEvents() {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoSlide();
            });

            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });

            this.card.addEventListener('mouseenter', () => this.pauseAutoSlide());
            this.card.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        goToSlide(index) {
            this.images[this.currentIndex].classList.remove('active');
            this.dots[this.currentIndex].classList.remove('active');
            
            this.currentIndex = index;
            
            this.images[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');
        }

        nextSlide() {
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            this.goToSlide(nextIndex);
        }

        prevSlide() {
            const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.goToSlide(prevIndex);
        }

        startAutoSlide() {
            if (this.images.length <= 1) return;
            this.autoSlideInterval = setInterval(() => this.nextSlide(), 3000);
        }

        pauseAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }

        resetAutoSlide() {
            this.pauseAutoSlide();
            this.startAutoSlide();
        }
    }

    // Initialize all project sliders
    function initSliders() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => new ProjectSlider(card));
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSliders);
    } else {
        initSliders();
    }
})();
