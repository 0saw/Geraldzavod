require('./views/view');
require('./views/forms');
require('./views/ripple');

$(function () {
  $('.button').ripple();

  sliders();
  forms();
});

var sliders = function() {
  $('.front-slick').slick({
    arrows: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 5,
    nextArrow: '<div class="slick-next"></div>',
    prevArrow: '<div class="slick-prev"></div>',
    responsive: [{
        breakpoint: 960,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 3,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1,
          swipeToSlide: true
        }
      }]
  });
};

var forms = function() {
  $('.form a.button, .footer a.button, .product .button').ripple();
  return $('a[href="#callForm"]').on('click', function(e) {
    e.preventDefault();
    return document.openForm('.form.modal form:eq(0)');
  });
};

document.formsResponse = function(message) {
  if (message == null) {
    message = "Ваша заявка будет рассмотрена в скором времени!</br>Мы обязательно вам перезвоним";
  }
  return $.magnificPopup.open({
    items: {
      src: $("<div class='form__response'>" + message + "</div>"),
      type: 'inline'
    },
    removalDelay: 500,
    mainClass: 'mfp-3d-unfold',
    callbacks: {
      beforeOpen: function() {}
    },
    midClick: true
  });
};

document.openForm = function(selector) {
  if (selector == null) {
    selector = ".form form:eq(1)";
  }
  return $.magnificPopup.open({
    items: {
      src: $(selector),
      type: 'inline'
    },
    removalDelay: 500,
    mainClass: 'mfp-zoom-in modal',
    callbacks: {
      beforeOpen: function() {}
    },
    midClick: true
  });
};
