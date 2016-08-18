function carouselStairs() {
  var $status = $('.carousel-stairs-navs .status');
  var $slickElement = $('.carousel-stairs');

  $slickElement.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      // var currentSlide = 1;
      var i = (nextSlide ? nextSlide : 0) + 1;
      $status.html('<span class="current">'+i+'</span>' + '<span class="large">/</span>' + '<span class="total">'+slick.slideCount+'</span>');

  });

  $slickElement.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var eq = nextSlide;
    $('.carousel-stairs-price').html($('.carousel-stairs .slide').eq(eq).attr('data-price') + '<span> руб.</span>');
  });

  $slickElement.on('init reInit', function(event, slick, currentSlide, nextSlide){
    $('.carousel-stairs-price').html($('.carousel-stairs .slide').eq(0).attr('data-price') + '<span> руб.</span>');
  });

  $slickElement.slick({
      arrows: true,
      dots: false,
      fade: true,
      infinite: false,
      appendArrows: $('.carousel-stairs-navs')
  });
};
carouselStairs();