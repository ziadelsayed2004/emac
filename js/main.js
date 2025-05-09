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
    
    
    $(document).ready(function () {
        var itemsToShow = 3;
        var currentFilter = '*';
        var $container = $('.portfolio-container');
        var $btn = $('.load-more .btn');
        var isExpanded = false;
    
        var portfolioIsotope = $container.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
    
        function showItems(filter, expand = false) {
            var $allItems = $container.find('.portfolio-item');
            var $filteredItems = (filter === '*') ? $allItems : $allItems.filter(filter);
    
            if (expand) {
                $allItems.hide();
                $filteredItems.show();
                $btn.text('View Less');
                isExpanded = true;
            } else {
                $allItems.hide();
                $filteredItems.slice(0, itemsToShow).show();
                if ($filteredItems.length <= itemsToShow) {
                    $btn.hide();
                } else {
                    $btn.show().text('Load More');
                }
                isExpanded = false;
            }
    
            portfolioIsotope.isotope('layout');
        }
    
        $('#portfolio-flters li').on('click', function () {
            $('#portfolio-flters li').removeClass('filter-active');
            $(this).addClass('filter-active');
            currentFilter = $(this).data('filter');
            showItems(currentFilter, false);
        });
    
        $btn.on('click', function (e) {
            e.preventDefault();
            if (isExpanded) {
                showItems(currentFilter, false);
            } else {
                showItems(currentFilter, true);
            }
        });
    
        showItems(currentFilter);
    });
    

    
})(jQuery);

{ // TAP HOVER
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
}

{ // ISO SLIDER
    const slidesWrapper = document.querySelector('.about-img .slides-wrapper');
    const slides = document.querySelectorAll('.about-img .slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const isRTL = document.body.classList.contains('rtl');
    
    let currentIndex = 0;
    let interval;
    
    function showSlide(index) {
      if (index >= slides.length) index = 0;  
      if (index < 0) index = slides.length - 1; 
      currentIndex = index;
      const offset = -index * 100; 
      slidesWrapper.style.transform = `translateX(${isRTL ? -offset : offset}%)`;
    }
    
    function nextSlide() {
        if(currentIndex === 2) {  
            showSlide(0); 
          } else {
            showSlide(currentIndex + 1); 
          }
    }
    
    function prevSlide() {
        if(currentIndex === 0) { 
            showSlide(2);
          } else {
            showSlide(currentIndex - 1);
          }    
    }
    
    function startAutoplay() {
      interval = setInterval(() => {
        if(currentIndex === 2) {  
          showSlide(0);
        } else {
          showSlide(currentIndex + 1); 
        }
      }, 2500); 
    }
    
    function stopAutoplay() {
      clearInterval(interval);
    }
    
    nextBtn.addEventListener('click', () => {
      stopAutoplay();  
      nextSlide();     
      startAutoplay(); 
    });
    
    prevBtn.addEventListener('click', () => {
      stopAutoplay();  
      prevSlide();    
      startAutoplay();
    });
    
    showSlide(0);       
    startAutoplay();  

}

{ // PARTNERS SLIDER 
    const container = document.getElementById('sliderContainer');
    const track = document.getElementById('sliderTrack');
    let isDown = false;
    let startX;
    let scrollLeft;
    let scrollSpeed = 2;
    const isRTL = getComputedStyle(container).direction === 'rtl';
    
    let autoScroll;
    
    function startAutoScroll() {
        if (autoScroll) return;
        autoScroll = setInterval(() => {
            container.scrollLeft += isRTL ? -scrollSpeed : scrollSpeed;
            const maxScroll = track.scrollWidth / 2;
    
            if (!isRTL && container.scrollLeft >= maxScroll) {
                container.scrollLeft = 0;
            } else if (isRTL && container.scrollLeft <= 0) {
                container.scrollLeft = maxScroll;
            }
        }, 16);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = null;
    }
    
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollSpeed = 1.5;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseup', () => {
        isDown = false;
        scrollSpeed = 2;
    });
    container.addEventListener('mouseleave', () => {
        isDown = false;
        scrollSpeed = 2;
    });
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
    
    container.addEventListener('touchstart', (e) => {
        isDown = true;
        scrollSpeed = 1.5;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    container.addEventListener('touchend', () => {
        isDown = false;
        scrollSpeed = 2;
    });
    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
    
    container.addEventListener('mouseenter', () => {
        scrollSpeed = 1;
    });
    container.addEventListener('mouseleave', () => {
        scrollSpeed = 2;
    });
    
    startAutoScroll();
}
    
{ //TOGGLE ?
    document.addEventListener('DOMContentLoaded', function () {
        const buttons = document.querySelectorAll('.toggle-overlay');
    
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                let container, overlaySelector;
    
                if (this.closest('.service-item')) {
                    container = this.closest('.service-item');
                    overlaySelector = '.service-overlay';
                } else if (this.closest('.portfolio-item')) {
                    container = this.closest('.portfolio-item');
                    overlaySelector = '.portfolio-overlay';
                } else {
                    return;
                }
    
                const overlay = container.querySelector(overlaySelector);
                const isActive = overlay.classList.contains('active');
    
                document.querySelectorAll(overlaySelector).forEach(o => {
                    o.classList.remove('active');
                });
    
                document.querySelectorAll('.toggle-overlay i').forEach(icon => {
                    icon.className = 'fas fa-info';
                });
    
                if (!isActive) {
                    overlay.classList.add('active');
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.className = 'fa-solid fa-circle-xmark';
                    }
                }
            });
        });
    });
    
}

{ // VIDEO
    let player;
    let lastTime = 0;
    const btnPlay = document.querySelector(".btn-play");
    const videoWrapper = document.querySelector(".embed-responsive");

    let userIsSeeking = false;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '360',
            width: '640',
            videoId: '_BWlj35lCAM',
            playerVars: {
                autoplay: 0,
                modestbranding: 1,
                rel: 0,
                controls: 1,
                showinfo: 0,
                fs: 0,
                iv_load_policy: 3,
                disablekb: 0
            },
            events: {
                onReady: function (event) {
                    // Do nothing on ready
                },
                onStateChange: function (event) {
                    if (event.data === YT.PlayerState.ENDED) {
                        videoWrapper.style.display = "none";
                        btnPlay.style.display = "inline-block";
                    }
                }
            }
        });
    }

    // Load YouTube API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    // Play Button
    btnPlay.addEventListener("click", function () {
        videoWrapper.style.display = "block";
        btnPlay.style.display = "none";

        if (player && player.playVideo) {
            player.seekTo(lastTime);
            player.playVideo();
        }
    });

    // Detect Pause by user (but ignore if it's from seeking)
    let lastCheckTime = 0;

    setInterval(() => {
        if (player && player.getPlayerState) {
            const state = player.getPlayerState();
            const currentTime = player.getCurrentTime();
    
            // Detect if user is seeking (sudden jump in time)
            if (Math.abs(currentTime - lastCheckTime) > 1.5) {
                userIsSeeking = true;
                setTimeout(() => userIsSeeking = false, 1500);
            }
    
            lastCheckTime = currentTime;
    
            if (state === YT.PlayerState.PAUSED && !userIsSeeking) {
                lastTime = currentTime;
                videoWrapper.style.display = "none";
                btnPlay.style.display = "inline-block";
            }
        }
    }, 500);

    // Detect seeking (click or touch)
    const startSeeking = () => {
        userIsSeeking = true;
        setTimeout(() => userIsSeeking = false, 1000); // short buffer time to prevent hiding
    };

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('#yt-player')) {
            startSeeking();
        }
    });

    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('#yt-player')) {
            startSeeking();
        }
    });
}
