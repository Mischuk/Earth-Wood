var viewport = $(window).height() + 100;
$(window).scroll(function(){
  var $header = $('.m_header');

  if ($(this).scrollTop() > viewport) {
      $header.addClass('fixed');
  } else {
      $header.removeClass('fixed');
  }
});



function mobileMenu() {
  $('.mobile-menu-trigger').on('click', function(){
    $(this).toggleClass('open');
    $('.m_header .nav').toggleClass('open');
  });
};
mobileMenu();
