
const sliderWrapper = document.querySelector('.container'),
      sliderContainer = document.querySelector('.slider-container'),
      slides = document.querySelectorAll('.slide')
      slideCount = slides.length;
let currentIndex = 0,
    topheight = 0,
    navPrev = document.querySelector('#prev'),
    navNext = document.querySelector('#next');

    //1 가장 높은 li값 구하여 지정하지
    function calculateTallestSlide() {
      for (var i = 0; i < slideCount; i++) {
        if (slides[i].offsetHeight > topheight) {
            topheight = slides[i].offsetHeight ;
        }
      };
      sliderWrapper.style.height = topheight + 'px';
      sliderContainer.style.height = topheight + 'px';
    };
    calculateTallestSlide();

    //2 container기준으로 ul 위치 지정
    function slideLeft() {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.left = (i+1) *50 +'%';
        // slides[0].style.left = 1 *50 +'%';
      }
    };
    slideLeft();

  function goToSlide(idx) {
    sliderContainer.style.left = idx*-50 + '%';
    currentIndex = idx;
    sliderContainer.classList.add('animated');
    updateNav();
  }
  goToSlide();


  navPrev.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentIndex != 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slideCount - 1);
    }
  })

  navNext.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentIndex < slideCount - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  })

goToSlide(0);



  function updateNav() {
    if (currentIndex == 0) {
      navPrev.classList.add('disabled')
    } else {
      navPrev.classList.remove('disabled')
    }
    // if (currentIndex == slideCount - 1) {
    //   navNext.classList.add('disabled')
    // } else {
    //   navNext.classList.remove('disabled')
    // }
  };
