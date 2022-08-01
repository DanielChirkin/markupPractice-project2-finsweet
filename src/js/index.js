import * as $ from 'jquery'
import mixitup from 'mixitup'
import slick from 'slick-carousel'
import { Fancybox } from "@fancyapps/ui"

import "@fancyapps/ui/dist/fancybox.css"
import "slick-carousel/slick/slick.css"
import "@/scss/style.scss"

import faqAccordion from './plugings/accordion-plugin.js'
// import initMap from "./utils/contacts-google-maps.js"
function initMap() {
  const ADDRESS = {lat: 40.7048195, lng: -74.0106324}

  const options = {
    center: ADDRESS,
    zoom: 13,
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7a7a7"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3d3d3"
            }
        ]
    }
    ]
  }

  const map = new google.maps.Map(document.getElementById('map'), options);
}

$(function() {
  // burger
  $('[data-header-burger], .header__nav-item a').on('click', function() {
    if ( $('[data-header-burger]').css('display') === 'none' ) return

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

  // google maps
  initMap()
})