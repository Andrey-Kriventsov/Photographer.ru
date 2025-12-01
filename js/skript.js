document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Имя должно быть не менее 2 символов';
        return;
    }
    
    // Здесь будет отправка на сервер
    alert('Заявка отправлена! Я свяжусь с вами в ближайшее время.');
    this.reset();
});


document.addEventListener('DOMContentLoaded', function() {
        const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
        
        // Массив наборов изображений
        const imageSets = [
            // Набор 1
            [
                { src: 'img/A.jpg', title: '2019', alt: 'Портретная съемка' },
                { src: 'img/C1.jpg', title: '2020', alt: 'Портретная съемка' },
                { src: 'img/D2.jpg', title: '2021', alt: 'Love Story съемка' },
                { src: 'img/E2.jpg', title: '2022', alt: 'Love Story съемка' },
                { src: 'img/F2.jpg', title: '2023', alt: 'Уличная съемка' },
                { src: 'img/K.jpg', title: '2024', alt: 'Уличная съемка' }
            ],
            // Набор 2
            [
                { src: 'img/A2.jpg', title: '2019', alt: 'Портретная съемка' },
                { src: 'img/C2.jpg', title: '2020', alt: 'Портретная съемка' },
                { src: 'img/E.jpg', title: '2021', alt: 'Love Story съемка' },
                { src: 'img/K1.jpg', title: '2022', alt: 'Love Story съемка' },
                { src: 'img/O1.jpg', title: '2023', alt: 'Уличная съемка' },
                { src: 'img/K2.jpg', title: '2024', alt: 'Уличная съемка' }
            ],
            // Набор 3
            [
                { src: 'img/A3.jpg', title: '2019', alt: 'Портретная съемка' },
                { src: 'img/D1.jpg', title: '2020', alt: 'Портретная съемка' },
                { src: 'img/E1.jpg', title: '2021', alt: 'Love Story съемка' },
                { src: 'img/O.jpg', title: '2022', alt: 'Love Story съемка' },
                { src: 'img/L1.jpg', title: '2023', alt: 'Уличная съемка' },
                { src: 'img/L2.jpg', title: '2024', alt: 'Уличная съемка' }
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
});