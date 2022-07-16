$(document).ready(function(){
    $('.watch__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/leftarrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/rightarrow.png"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    });  
    $(function() {
  
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
          $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });
        
      });  
      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-card__content').eq(i).toggleClass('catalog-card__content_active');
                $('.catalog-card__back').eq(i).toggleClass('catalog-card__back_active');
            })
        });
    };

    toggleSlide('.catalog-card__link');
    toggleSlide('.catalog-card__linkback')

    $('[data-modal=consulting]').on('click', function() {
        $('.overlay, #consulting').fadeIn('0.3s');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consulting, #thanks, #order').fadeOut('0.3s');
    });

    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__subheader').text($('.catalog-card__title').eq(i).text());
            $('.overlay, #order').fadeIn('0.3s');
        });
    });

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                tel: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                tel: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('.consultation form');
    validateForms('#consulting form');
    validateForms('#order form');

    $('input[name=tel]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).validate()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consulting, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
    
  });
  
