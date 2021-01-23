
window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    // tabs
    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);
    
        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
    
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
    
        header.addEventListener('click', (e) => {
            const target = e.target;
            if(target &&
                (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
                tab.forEach((item, i) => {
                    if(target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    };

    //slider
    const sliders = (slides, dir, prev, next) => {
        let slideIndex = 1,
            paused = false;
        const items = document.querySelectorAll(slides);
              
    
        function showSlides(n) {
            if (n > items.length) {
                slideIndex = 1;
            }
    
            if (n < 1) {
                slideIndex = items.length;
            }
    
            items.forEach(item => {
                item.classList.add('animated');
                item.style.display = 'none';
            });
    
            items[slideIndex - 1].style.display = 'flex';
        }
    
        showSlides(slideIndex);
    
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
    
        try {
            const prevBtn = document.querySelector(prev),
                  nextBtn = document.querySelector(next);
    
            prevBtn.addEventListener('click', () => {
                plusSlides(-1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            });
            nextBtn.addEventListener('click', () => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            });
    
        } catch(e){}
        function activateAnimation() {
            if(dir === 'horizontal') {
                paused = setInterval(function() {
                    plusSlides(1);
                    items[slideIndex - 1].classList.add('slideInLeft');
                }, 3000);
            } else {
                paused = setInterval(function() {
                    plusSlides(1);
                    items[slideIndex - 1].classList.remove('slideInRight');
                    items[slideIndex - 1].classList.add('slideInLeft');
                }, 3000);
            }
        }
        activateAnimation();
    
    };
    //pageup

    const scrolling = (upSelector) => {
        const upElem = document.querySelector(upSelector);
        window.addEventListener('scroll', () => {
            if(document.documentElement.scrollTop > 1300) {
                upElem.classList.add('animated', 'fadeIn');
                upElem.classList.remove('fadeOut');
            } else {
                upElem.classList.add('fadeOut');
                upElem.classList.remove('fadeIn');
            }
        });
    
        // scrolling with raf
    
        let links = document.querySelectorAll('[href^="#"]'),
            speed = 0.3;
    
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
    
                let widthTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    start = null;
    
                requestAnimationFrame(step);
    
                function step(time) {
                    if(start === null) {
                        start = time;
                    }
    
                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
    
                        document.documentElement.scrollTo(0, r);
    
                    if(r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        });
    };

    //hamburger
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__items'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
      });
  });

    scrolling('.pageup');
    tabs('.heading__titles', '.heading__title', '.heading__tab', 'active');
    sliders('.slider__item_group', 'horizontal', '.prev__btn', '.next__btn');
    
    
});

//slider1 auto

   let slides1 = document.querySelectorAll('#slides1 .slide1');
    let dots = document.getElementsByClassName("slider-dots1_item");
    let slideInterval = setInterval(nextSlide,2000);
    let currentSlide = 0;
    nextSlide(currentSlide);
    
    function nextSlide() {
        slides1[currentSlide].className = 'slide1';
        currentSlide = (currentSlide+1)%slides1.length;
        slides1[currentSlide].className = 'slide1 showing';
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        };
        dots[currentSlide - 0].className += " active";
    };