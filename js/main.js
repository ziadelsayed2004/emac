(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 120) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    
    // Blogs carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


document.querySelectorAll('.service-item').forEach(item => {
    const tapIcon = item.querySelector('.tap-indicator');
  
    item.addEventListener('click', () => {
      if (tapIcon) tapIcon.style.display = 'none';
    });
  
    item.addEventListener('mouseenter', () => {
      if (tapIcon) tapIcon.style.display = 'none';
    });
  
    item.addEventListener('mouseleave', () => {
      if (tapIcon) tapIcon.style.display = 'block';
    });
});

  
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'cube',
    speed: 500,
});

{
const container = document.getElementById('sliderContainer');
const track = document.getElementById('sliderTrack');
let isDown = false;
let startX;
let scrollLeft;
let scrollSpeed = 2;
let isScrolling = true;
const isRTL = getComputedStyle(container).direction === 'rtl';
container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollSpeed = 1.5;
});
container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);
container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
});
container.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollSpeed = 1.5;
});
container.addEventListener('touchend', () => isDown = false);
container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
});
let autoScroll;
function startAutoScroll() {
    autoScroll = setInterval(() => {
        if (isScrolling) {
            container.scrollLeft += isRTL ? -scrollSpeed : scrollSpeed;
            const maxScroll = track.scrollWidth / 2;

            if (!isRTL && container.scrollLeft >= maxScroll) {
                container.scrollLeft = 0;
            } else if (isRTL && container.scrollLeft <= 0) {
                container.scrollLeft = maxScroll;
            }
        }
    }, 16);
}
function stopAutoScroll() {
    clearInterval(autoScroll);
    isScrolling = false;
    scrollSpeed = 1;
    startAutoScroll();
    isScrolling = true;
}
container.addEventListener('mouseenter', () => {
    stopAutoScroll();
    scrollSpeed = 1;
});
container.addEventListener('mouseleave', () => {
    isScrolling = true;
    startAutoScroll();
    scrollSpeed = 2;
});
container.addEventListener('touchstart', () => {
    stopAutoScroll();
    scrollSpeed = 1;
});
container.addEventListener('touchend', () => {
    isScrolling = true;
    startAutoScroll();
    scrollSpeed = 2;
});
startAutoScroll();
}