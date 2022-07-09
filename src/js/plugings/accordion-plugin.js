// to make it work you need:

// 1. to add these data attributes
// data-accord-item
// data-accord-label - to toggle
// data-accord-body
// data-accord-control (optional. data-accord-label may be enough )


// 2. and to use this kind of stracture example
/*

<li class="faq__accordion-item" data-accord-item>
  <div class="faq__accordion-content">
    <div class="faq__accordion-title title02" data-accord-label></div>
    <p class="faq__accordion-text body01" data-accord-body></p>
  </div>
  <div class="faq__accordion-control" data-accord-control></div>
</li>

*/
// P.S. it adds 'open' class to data-accord-item

export default
  $('[data-accord-label], [data-accord-control]').on('click', function() {
    const currentElement = $(this)
    const accordItemSelector = '.' + currentElement.parents('[data-accord-item]').attr('class').split(' ')[0]
    const accordItem = currentElement.parents(accordItemSelector)
    const accordBody = accordItem.find('[data-accord-body]')

    if ( $(accordItemSelector).hasClass('open') ) {
      $(accordItemSelector).each(function() {
        if ( ($(this)[0] === accordItem[0]) || !$(accordItemSelector).hasClass('open') ) return

        if ( $(this).hasClass('open')) {
          $(this).removeClass('open')
          $(this).find('[data-accord-body]').slideToggle()
        }
      })
    }
  
    accordBody.slideToggle()
    accordItem.toggleClass('open')
  })
