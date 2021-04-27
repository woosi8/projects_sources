'use strict'

//////////////////////////////// Nav////////////////////////////////

const NavElem = document.querySelector('.navbar')
const NavCon = document.querySelector('.nav-con')
const NavT = document.querySelector('.navbar i')

function NavClick(e) {
    NavCon.classList.toggle('nav-contents')
    e.preventDefault()
}

NavElem.addEventListener('click', NavClick)

NavElem.addEventListener('click', function () {
    NavT.classList.toggle('nav-tran')
})

// NavElem.addEventListener('click',XClick);

//////////////////////////////// End Nav////////////////////////////////

//////////////////////////////// Slide////////////////////////////////

const sliders = document.querySelector('.sliders')
const sliderList = document.querySelector('.slider-list')
const slideElem = document.querySelectorAll('.slide')
//the number of slideElem
const slideCount = slideElem.length
let currentIndex = 0
let topheight = 0
let navPrev = document.querySelector('#prev')
let navNext = document.querySelector('#next')

// check topheight of current slide
// put topehight value that has one of the highest value into parent div and ul
function calculateTallestSlide() {
    for (var i = 0; i < slideCount; i++) {
        // compare who has highest height value
        if (slideElem[i].offsetHeight > topheight) {
            topheight = slideElem[i].offsetHeight
        }
    }
    sliderList.style.height = topheight + 'px'
    sliders.style.height = topheight + 'px'
}
calculateTallestSlide()

// place slide in the order of left value
function slideLeft() {
    // from 0% to 200%
    for (var i = 0; i < slideCount; i++) {
        slideElem[i].style.left = i * 100 + '%'
    }
}
slideLeft()

function goToSlide(idx) {
    // move parent(slidelist) to (idx*-100%)value for showing children(slide)
    sliderList.style.left = idx * -100 + '%'
    // checking what idx is now
    currentIndex = idx
    // for transition
    sliderList.classList.add('animated')
}

// when you click navPrev button, bring currentIndex value to function goToslide
navPrev.addEventListener('click', function (event) {
    event.preventDefault()

    if (currentIndex != 0) {
        goToSlide(currentIndex - 1)
    } else {
        goToSlide(slideCount - 1)
    }
})
navNext.addEventListener('click', function (event) {
    event.preventDefault()
    if (currentIndex < slideCount - 1) {
        goToSlide(currentIndex + 1)
    } else {
        // if the slide is the last slide, go back to 0
        goToSlide(0)
    }
})
goToSlide(0)

//////////////////////////////// End Slide////////////////////////////////

//////////////////////////////// Scroll Triger////////////////////////////////

$(function () {
    var trigger = new ScrollTrigger({
        toggle: {
            visible: 'active',
            hidden: 'inactive',
        },
        offset: {
            x: 0,
            y: 300,
        },
        once: true,
    })
})

//////////////////////////////// End Scroll Triger////////////////////////////////

//////////////////////////////// Isotope////////////////////////////////
/* jshint browser: true, unused: true, undef: true */
/* globals imagesLoaded: false */

var grid = document.querySelector('.grid')
var msnry

imagesLoaded(grid, function () {
    // init Isotope after all images have loaded
    msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
    })
})

var iso = new Isotope('.grid', {
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
})

// filter functions
var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function (itemElem) {
        var number = itemElem.querySelector('.number').textContent
        return parseInt(number, 30) > 50
    },
    // show if name ends with -ium
    ium: function (itemElem) {
        var name = itemElem.querySelector('.name').textContent
        return name.match(/ium$/)
    },
}

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group')
filtersElem.addEventListener('click', function (event) {
    // only work with buttons
    if (!matchesSelector(event.target, 'button')) {
        return
    }
    var filterValue = event.target.getAttribute('data-filter')
    // use matching filter function
    filterValue = filterFns[filterValue] || filterValue
    iso.arrange({ filter: filterValue })
})

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group')
for (var i = 0, len = buttonGroups.length; i < len; i++) {
    var buttonGroup = buttonGroups[i]
    radioButtonGroup(buttonGroup)
}

function radioButtonGroup(buttonGroup) {
    buttonGroup.addEventListener('click', function (event) {
        // only work with buttons
        if (!matchesSelector(event.target, 'button')) {
            return
        }
        buttonGroup.querySelector('.is-checked').classList.remove('is-checked')
        event.target.classList.add('is-checked')
    })
}

//////////////////////////////// End Isotope////////////////////////////////

////////////////////////////////  BxSlider////////////////////////////////

$(document).ready(function () {
    $('.slider-bx').bxSlider({
        minslideElem: 1,
        maxslideElem: 1,
        moveslideElem: 1,
        slideWidth: 500.5,
        // slideMargin: 30,
        controls: true,
        pager: true,
        nextSelector: '.controls #next',
        prevSelector: '.controls #prev',
        nextText: '<i class="fas fa-chevron-right arrow"></i>',
        prevText: '<i class="fas fa-chevron-left arrow"></i>',
    })
})

////////////////////////////////  End BxSlider////////////////////////////////

//////////////////////////////// Top Button////////////////////////////////
;(function () {
    const ilbuniElem = document.querySelector('.features')
    const topElem = document.querySelector('.top-arrow')
    const btt = document.querySelector('#back-to-top')
    let scrollPos

    function showValue() {
        let posY = ilbuniElem.getBoundingClientRect().top

        if (posY < window.innerHeight * 0.5) {
            topElem.classList.add('visible')
        } else {
            topElem.classList.remove('visible')
        }
    }

    window.addEventListener('scroll', function () {
        showValue()
    })

    btt.addEventListener('click', function (e) {
        e.preventDefault()
        scrollTop()
    })

    function scrollTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -50)
            setTimeout(scrollTop, 0)
        }
    }
})()

//////////////////////////////// End Top Button////////////////////////////////
