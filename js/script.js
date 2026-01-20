document.addEventListener('DOMContentLoaded', function() {
    // --- Скрытие/показ навигации при прокрутке ---
    const navbar = document.querySelector('.navbar');
    const navbarHeight = 90;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Добавляем/убираем класс scrolled при прокрутке
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Скрываем/показываем навигацию при прокрутке вниз/вверх
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Прокрутка вниз - скрываем
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх или в начале страницы - показываем
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // --- Обработка формы ---
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Сбрасываем ошибки
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('messageError').textContent = '';
            
            let isValid = true;
            
            // Валидация имени
            if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Имя должно быть не менее 2 символов';
                isValid = false;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Введите корректный email';
                isValid = false;
            }
            
            // Валидация сообщения
            if (message.length < 5) {
                document.getElementById('messageError').textContent = 'Сообщение должно быть не менее 5 символов';
                isValid = false;
            }
            
            // Если все проверки пройдены
            if (isValid) {
                alert('Заявка отправлена! Я свяжусь с вами в ближайшее время.');
                form.reset();
            }
        });
    }
    
    // --- Анимация портфолио ---
    const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
    
    const imageSets = [
        // Набор 1 (должен совпадать с начальными изображениями в HTML)
        [
            { src: 'img/A1.jpg', title: '2019', alt: 'фото 1' },
            { src: 'img/O2.jpg', title: '2020', alt: 'фото 2' },
            { src: 'img/R1.jpg', title: '2021', alt: 'фото 3' },
            { src: 'img/R2.jpg', title: '2022', alt: 'фото 4' },
            { src: 'img/W.jpg', title: '2023', alt: 'фото 5' },
            { src: 'img/F.jpg', title: '2024', alt: 'фото 6' }
        ],
        // Набор 2
        [
            { src: 'img/A2.jpg', title: '2019', alt: 'фото 7' },
            { src: 'img/C2.jpg', title: '2020', alt: 'фото 8' },
            { src: 'img/E.jpg', title: '2021', alt: 'фото 9' },
            { src: 'img/K1.jpg', title: '2022', alt: 'фото 10' },
            { src: 'img/O1.jpg', title: '2023', alt: 'фото 11' },
            { src: 'img/K2.jpg', title: '2024', alt: 'фото 12' }
        ],
        // Набор 3
        [
            { src: 'img/A3.jpg', title: '2019', alt: 'фото 13' },
            { src: 'img/D1.jpg', title: '2020', alt: 'фото 14' },
            { src: 'img/E1.jpg', title: '2021', alt: 'фото 15' },
            { src: 'img/O.jpg', title: '2022', alt: 'фото 16' },
            { src: 'img/L1.jpg', title: '2023', alt: 'фото 17' },
            { src: 'img/L2.jpg', title: '2024', alt: 'фото 18' }
        ]
    ];
    
    let currentSet = 0;
    let animationInterval;
    
    function changePortfolioImages() {
        const nextSet = (currentSet + 1) % imageSets.length;
        console.log('Changing to set:', nextSet);
        
        portfolioItems.forEach((item, index) => {
            const img = item.querySelector('.portfolio-img');
            const overlay = item.querySelector('.portfolio-overlay h5');
            
            if (!img || !overlay || index >= imageSets[nextSet].length) {
                return;
            }
            
            const newImageData = imageSets[nextSet][index];
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                img.src = newImageData.src;
                img.alt = newImageData.alt;
                overlay.textContent = newImageData.title;
                
                img.onload = () => {
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                };
                
                img.onerror = () => {
                    console.error('Error loading image:', newImageData.src);
                    img.style.opacity = '1';
                };
                
            }, 500);
        });
        
        currentSet = nextSet;
    }
    
    function startAnimation() {
        if (!animationInterval) {
            animationInterval = setInterval(changePortfolioImages, 3000);
        }
    }
    
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                clearInterval(animationInterval);
                animationInterval = null;
            });
            
            item.addEventListener('mouseleave', () => {
                startAnimation();
            });
        });

        startAnimation();
    }
});