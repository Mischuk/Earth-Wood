function carousel() {
  var $status = $('.carousel-info .status');
  var $slickElement = $('.carousel');

  $slickElement.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      // var currentSlide = 1;
      var i = (nextSlide ? nextSlide : 0) + 1;
      $status.html('<span class="current">'+i+'</span>' + '<span class="large">/</span>' + '<span class="total">'+slick.slideCount+'</span>');

  });

  $slickElement.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var eq = nextSlide;
    $('.carousel-slide-desc').text($('.carousel .slide').eq(eq).attr('data-desc'));
  });

  $slickElement.on('init reInit', function(event, slick, currentSlide, nextSlide){
    $('.carousel-slide-desc').text($('.carousel .slide').eq(0).attr('data-desc'));
  });

  $slickElement.slick({
      arrows: true,
      dots: false,
      fade: true,
      infinite: false,
      appendArrows: $('.carousel-info')
  });
};
carousel();

function gallery() {
  $('.gallery-item').magnificPopup({
    type: 'image',
    mainClass: 'm_examples',
    gallery:{
      enabled:true,
      tCounter: '<span class="curr">%curr%</span><span class="large">/</span>%total%',
      tPrev: 'Предыдущая работа',
      tNext: 'Следующая работа'
    },
    image: {
      markup: '<div class="mfp-figure">'+
                '<div class="frame"><div class="lines"></div></div>'+
                '<div class="mfp-top-bar">'+
                  '<div class="mfp-title"></div>'+
                  '<div class="mfp-close"></div>'+
                '</div>'+
                '<div class="mfp-img"></div>'+
                '<div class="mfp-bottom-bar">'+
                  '<div class="mfp-columns">'+
                    '<div class="column">'+
                      '<div class="column-title">Дизайн проект:</div>'+
                      '<div class="column-desc">'+'<span class="slide-design"></span>'+'</div>'+
                    '</div>'+
                    '<div class="column">'+
                      '<div class="column-title">Стоимость всего:</div>'+
                      '<div class="column-desc">'+'<span class="slide-price"></span>'+'</div>'+
                    '</div>'+
                    '<div class="column">'+
                      '<div class="column-title">Время изготовления:</div>'+
                      '<div class="column-desc">'+'<span class="slide-time"></span>'+'</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="mfp-navs">'+
                    '<div class="mfp-prev mfp-custom-arrows"></div>'+
                    '<div class="mfp-counter"></div>'+
                    '<div class="mfp-next mfp-custom-arrows"></div>'+
                  '</div>'+
                '</div>'+
              '</div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'data-title',
      verticalFit: true,
      tError: '<a href="%url%">Изображение</a> не загружено.'
    },
    callbacks : {
        change : function(){
          var mp = $.magnificPopup.instance,
              t = $(mp.currItem.el[0]);

          var design = t.data('design');
          var price = t.data('price');
          var time = t.data('time');
          console.log(design, price, time);
          var content = mp.content.find('.mfp-columns');
          content.find('.slide-design').text(design);
          content.find('.slide-price').text(price);
          content.find('.slide-time').text(time);

        }
    }
  });

  var magnificPopup = $.magnificPopup.instance;

  $('body').on('click', '.mfp-prev', function() {
      magnificPopup.prev();
  });
  $('body').on('click', '.mfp-next', function() {
      magnificPopup.next();
  });
};
gallery();