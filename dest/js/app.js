$(function() {
    $('a[href="#"]').click(function(e){ e.preventDefault(); });

    // Polyfill to remove click delays on browsers with touch UIs
    FastClick.attach(document.body);

    $(".scroll-down").click(function() {
        $('html, body').animate({
            scrollTop: $(".m_s2").offset().top
        }, 1000);
    });

    // Detect if the user's browser IE
    function detectIE() {
      var BrowserDetect = {
              init: function () {
                  this.browser = this.searchString(this.dataBrowser) || "Other";
                  this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
              },
              searchString: function (data) {
                  for (var i = 0; i < data.length; i++) {
                      var dataString = data[i].string;
                      this.versionSearchString = data[i].subString;

                      if (dataString.indexOf(data[i].subString) !== -1) {
                          return data[i].identity;
                      }
                  }
              },
              searchVersion: function (dataString) {
                  var index = dataString.indexOf(this.versionSearchString);
                  if (index === -1) {
                      return;
                  }

                  var rv = dataString.indexOf("rv:");
                  if (this.versionSearchString === "Trident" && rv !== -1) {
                      return parseFloat(dataString.substring(rv + 3));
                  } else {
                      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                  }
              },

              dataBrowser: [
                  {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
                  {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
                  {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
                  {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
                  {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
                  {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

                  {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
                  {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
              ]
          };

          BrowserDetect.init();
          if (BrowserDetect.browser == 'Explorer') {
            $('html').addClass('IE');
          };
    };
    detectIE();

    // Mask for form's input
    function inputMask() {
      $(".mask-date").mask("99.99.9999",{placeholder:"__.__.____"});
      $(".mask-year").mask("9999",{placeholder:""});
      $(".mask-tel").mask("+7 (999) 999-99-99");
    };
    inputMask();

    // Маска для телефона

    $("[name=tel]").mask("+7 999 999 99 99");

    

    $('[name="hours"], [name="minutes"]').keydown(function (e) {

      // Allow: backspace, delete, tab, escape, enter and .

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||

           // Allow: Ctrl+A, Command+A

          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||

           // Allow: home, end, left, right, down, up

          (e.keyCode >= 35 && e.keyCode <= 40)) {

               // let it happen, don't do anything

               return;

      }

      // Ensure that it is a number and stop the keypress

      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {

          e.preventDefault();

      }

    });

    

    

    $('[name="hours"]').on('keyup', function(){

      if ( $(this).val() > 23 ) {

        $(this).val(23);

      }

    });

    $('[name="minutes"]').on('keyup', function(){

      if ( $(this).val() > 59 ) {

        $(this).val(59);

      }

    });

    

    // Обработка форма на AJAX

    $.validator.addMethod("minlenghtphone", function (value, element) {

        return value.replace(/\D+/g, '').length > 10;

    }, "Введите полный номер.");

    $.validator.addMethod("requiredphone", function (value, element) {

        return value.replace(/\D+/g, '').length > 1;

    }, "Это поле необходимо заполнить.");

    

    $("form").each(function(){

      $(this).validate({

        rules: {

          name: { required: true, },

          tel: {

              requiredphone: true,

              minlenghtphone: true

          }

        },

        submitHandler: function(form, event){

          event = event || window.event;

          $(form).ajaxSubmit({

            error: function(){

              $('.form-input').val('');

              $('#success').trigger('click');

            },

            success: function(responseText, statusText, xhr){

              $('.form-input').val('');

              $('#success').trigger('click');

              // Появление "спасибо"

              //setTimeout(function(){ }, 5 * 1000)

            }

          });

          return false;

        }

      });

    });

    

    

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

    

    

    function modal() {

        $('.popup-with-zoom-anim').magnificPopup({

            type: 'inline',

    

            fixedContentPos: false,

            fixedBgPos: true,

    

            overflowY: 'auto',

    

            closeBtnInside: true,

            preloader: false,

    

            midClick: true,

            removalDelay: 300,

            mainClass: 'my-mfp-zoom-in'

        });

    };

    modal();

    

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
});