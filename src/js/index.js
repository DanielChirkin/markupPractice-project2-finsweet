import * as $ from 'jquery'
import mixitup from 'mixitup'
import slick from 'slick-carousel'
import { Fancybox } from "@fancyapps/ui"

import "@fancyapps/ui/dist/fancybox.css"
import "slick-carousel/slick/slick.css"
import "@/scss/style.scss"

import faqAccordion from './plugings/accordion-plugin.js'
import initMap from "./utils/contacts-google-maps.js"


// google maps
window.initMap = initMap

$(function() {
  // smooth scrolling
  $('a[href^=\\#]').on('click', function(event){     
    event.preventDefault()

    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
  });

  //  ====== mixItUp ======
  // blog
  var config = {
    debug: {
      enable: true,
      showWarnings: true
    },
    animation: {
      queueLimit:5,
      animateResizeTargets: true,
    }
  }

  var mixer = mixitup('.blog__card-box', config)

  // ====== slick ======
  // tesimonial
  $('.testimonial__slide-box').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    appendArrows: '.testimonial__controls',
    appendDots: '.testimonial__controls-dots',
    prevArrow: '.testimonial__arrow.slick-prev',
    nextArrow: '.testimonial__arrow.slick-next',
    responsive: [
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      }
    ]
  })

  // contacts form
  // input
  $('.contacts__input').on('focus', function(e) {    
    $(this).parent('.contacts__form-item').addClass('active')
  } )

  $('.contacts__input').on('focusout', function(e) {
    if ( $(this).val() && $(this).val() !== 'empty'  ) return

    $(this).parent('.contacts__form-item').removeClass('active')
  } )

  // form
  function onSubmit(e) {
    e.preventDefault()

    const formSelectors = $('.contacts__form input,.contacts__form select, .contacts__form textarea')
    const formData = formSelectors.serializeArray()
    console.log(formData)

    $(this).trigger('reset')
    
    $('.contacts__input').parent('.contacts__form-item').removeClass('active')
  }

  $('.contacts__form').on('submit', onSubmit)

  // burger
  $('.header__top-burger, .header__nav-item a').on('click', function() {
    if ( $('.header__top-burger').css('display') === 'none' ) return

    $('.header__top').toggleClass('header__top--open')

    if (TopScrollState)
    $('[data-header-burger]').toggleClass('header__top-burger--follow')
  })

  // burger scroll efferct
  let TopScrollState = false

  setInterval(() => {
    if ( TopScrollState === false && $(window).scrollTop() > 1 && !($('[data-header-top]').hasClass('header__top--open')) ) {
      $('[data-header-burger]').addClass('header__top-burger--follow')

      TopScrollState = true
    }
    else if ( (TopScrollState === true && $(window).scrollTop() === 0) ) {
      $('[data-header-burger]').removeClass('header__top-burger--follow')
      TopScrollState = false
    }
  }, 0)
})