// navigation.js - Универсальный скрипт для навигации между страницами

class SchoolWebsiteNavigation {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.highlightActivePage();
            this.setupSmoothScroll();
            this.setupMobileMenu();
            this.setupAnimations();
        });
    }

    // Подсветка активной страницы
    highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            
            // Для главной страницы
            if (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === './')) {
                link.classList.add('active');
            }
        });
    }

    // Плавная прокрутка
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Мобильное меню
    setupMobileMenu() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Создаем кнопку мобильного меню
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
        `;

        header.querySelector('.container').insertBefore(mobileMenuBtn, nav);

        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            mobileMenuBtn.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Стили для мобильного меню
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                nav ul {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #2c3e50;
                    padding: 1rem;
                }
                
                nav.mobile-open ul {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Анимации
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.feature-card, .news-card, .teacher-card, .subject-card, .achievement-card'
        );

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// Инициализация навигации
const schoolNavigation = new SchoolWebsiteNavigation();