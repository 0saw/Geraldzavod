(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\main.js":[function(require,module,exports){
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

},{"./views/forms":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\forms.js","./views/ripple":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\ripple.js","./views/view":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\view.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\forms.js":[function(require,module,exports){
$(function() {
  var counter, selectors;
  selectors = ['.form__field input[type="text"]', '.form__field input[type="tel"]', '.form__field textarea'];
  $(document).on('ready focus blur', selectors.join(', '), function(e) {
    var $el;
    $el = $(this).parent('span');
    if ($el.length > 0) {
      $el.toggleClass('focused', $(this).is(':focus'));
    }
    return $el.toggleClass('has-text', $(this).val().length > 0);
  });
  $(document).on('click', '.button', function(e) {
    return $(this).siblings('input[type="submit"]').trigger('click');
  });
  counter = 0;
  return $(document).on('click', '.form__right input[type="submit"]', function(e) {
    e.preventDefault();
    $(this).parent().siblings('.wpcf7-response-output').slideUp(400);
    $(this).siblings('.ajax-loader').css({
      visibility: 'visible'
    });
    return window.setTimeout((function(_this) {
      return function() {
        counter++;
        if (counter < 2) {
          $(_this).parents('form').find('.form__field:nth-last-child(n+2) input').addClass('wpcf7-not-valid');
          $(_this).parent().siblings('.wpcf7-response-output').slideDown(400);
        } else {
          $('.wpcf7-not-valid').removeClass('wpcf7-not-valid');
          $(_this).parent().siblings('.wpcf7-good').slideDown(400);
          document.formsResponse();
        }
        return $(_this).siblings('.ajax-loader').css({
          visibility: 'hidden'
        });
      };
    })(this), 700 + Math.random() * (2000 - 700));
  });
});

// ---
// generated by coffee-script 1.9.2

},{}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\ripple.js":[function(require,module,exports){
var slice = [].slice;

(function($, window) {
  var Ripple;
  Ripple = (function() {
    function Ripple(el, options) {
      this.$el = $(el);
      this.$el.on('click', (function(_this) {
        return function(e) {
          var x, y;
          e.preventDefault();
          if ($(_this).data('pressed')) {
            return false;
          }
          $(_this).data('pressed', true);
          window.setTimeout(function() {
            return $(_this).data('pressed', false);
          }, 500);
          _this.$ink = _this.$el.children('.ink');
          if (_this.$ink.length === 0) {
            _this.$el.append('<div class="ink"></div>');
          }
          _this.$ink = _this.$el.children('.ink');
          if (_this.$ink.length === 0) {
            return;
          }
          _this.$ink.removeClass("animate");
          if (!_this.$ink.height() && !_this.$ink.width()) {
            _this.d = Math.max(_this.$el.outerWidth(), _this.$el.outerHeight());
            _this.$ink.css({
              height: _this.d,
              width: _this.d
            });
          }
          if (_this.d > 0) {
            x = e.pageX - _this.$el.offset().left - _this.d / 2;
            y = e.pageY - _this.$el.offset().top - _this.d / 2;
            console.log(_this.$ink[0]);
            return _this.$ink.css({
              top: y + 'px',
              left: x + 'px'
            }).addClass("animate");
          }
        };
      })(this));
    }

    return Ripple;

  })();
  return $.fn.extend({
    ripple: function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return this.each(function() {
        return new Ripple(this);
      });
    }
  });
})(window.jQuery, window);

// ---
// generated by coffee-script 1.9.2

},{}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\views\\view.js":[function(require,module,exports){
(function() {
  var sequenceElement = document.getElementById("sequence1");
  if (sequenceElement == null) {
    return;
  }

  var options = {
    animateCanvas: false,
    keyNavigation: true,
    fadeStepWhenSkipped: false,
    reverseWhenNavigatingBackwards: true,
    nextButton: '#sequence1 .seq-prev',
    prevButton: '#sequence1 .seq-next',
    preloader: '#sequence1 .seq-preloader',
    // reverseTimingFunctionWhenNavigatingBackwards: true,
  }

  var mySequence = sequence(sequenceElement, options);
})();

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\geralzavod.ru\\responsive-2\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZm9ybXMuanMiLCJzcmMvc2NyaXB0cy92aWV3cy9yaXBwbGUuanMiLCJzcmMvc2NyaXB0cy92aWV3cy92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vdmlld3MvdmlldycpO1xucmVxdWlyZSgnLi92aWV3cy9mb3JtcycpO1xucmVxdWlyZSgnLi92aWV3cy9yaXBwbGUnKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICQoJy5idXR0b24nKS5yaXBwbGUoKTtcblxuICBzbGlkZXJzKCk7XG4gIGZvcm1zKCk7XG59KTtcblxudmFyIHNsaWRlcnMgPSBmdW5jdGlvbigpIHtcbiAgJCgnLmZyb250LXNsaWNrJykuc2xpY2soe1xuICAgIGFycm93czogdHJ1ZSxcbiAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgIGNlbnRlclBhZGRpbmc6ICc2MHB4JyxcbiAgICBzbGlkZXNUb1Nob3c6IDUsXG4gICAgbmV4dEFycm93OiAnPGRpdiBjbGFzcz1cInNsaWNrLW5leHRcIj48L2Rpdj4nLFxuICAgIHByZXZBcnJvdzogJzxkaXYgY2xhc3M9XCJzbGljay1wcmV2XCI+PC9kaXY+JyxcbiAgICByZXNwb25zaXZlOiBbe1xuICAgICAgICBicmVha3BvaW50OiA5NjAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgY2VudGVyUGFkZGluZzogJzUwcHgnLFxuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICBzd2lwZVRvU2xpZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNTBweCcsXG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgIHN3aXBlVG9TbGlkZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XVxuICB9KTtcbn07XG5cbnZhciBmb3JtcyA9IGZ1bmN0aW9uKCkge1xuICAkKCcuZm9ybSBhLmJ1dHRvbiwgLmZvb3RlciBhLmJ1dHRvbiwgLnByb2R1Y3QgLmJ1dHRvbicpLnJpcHBsZSgpO1xuICByZXR1cm4gJCgnYVtocmVmPVwiI2NhbGxGb3JtXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZG9jdW1lbnQub3BlbkZvcm0oJy5mb3JtLm1vZGFsIGZvcm06ZXEoMCknKTtcbiAgfSk7XG59O1xuXG5kb2N1bWVudC5mb3Jtc1Jlc3BvbnNlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBpZiAobWVzc2FnZSA9PSBudWxsKSB7XG4gICAgbWVzc2FnZSA9IFwi0JLQsNGI0LAg0LfQsNGP0LLQutCwINCx0YPQtNC10YIg0YDQsNGB0YHQvNC+0YLRgNC10L3QsCDQsiDRgdC60L7RgNC+0Lwg0LLRgNC10LzQtdC90LghPC9icj7QnNGLINC+0LHRj9C30LDRgtC10LvRjNC90L4g0LLQsNC8INC/0LXRgNC10LfQstC+0L3QuNC8XCI7XG4gIH1cbiAgcmV0dXJuICQubWFnbmlmaWNQb3B1cC5vcGVuKHtcbiAgICBpdGVtczoge1xuICAgICAgc3JjOiAkKFwiPGRpdiBjbGFzcz0nZm9ybV9fcmVzcG9uc2UnPlwiICsgbWVzc2FnZSArIFwiPC9kaXY+XCIpLFxuICAgICAgdHlwZTogJ2lubGluZSdcbiAgICB9LFxuICAgIHJlbW92YWxEZWxheTogNTAwLFxuICAgIG1haW5DbGFzczogJ21mcC0zZC11bmZvbGQnLFxuICAgIGNhbGxiYWNrczoge1xuICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7fVxuICAgIH0sXG4gICAgbWlkQ2xpY2s6IHRydWVcbiAgfSk7XG59O1xuXG5kb2N1bWVudC5vcGVuRm9ybSA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3RvciA9PSBudWxsKSB7XG4gICAgc2VsZWN0b3IgPSBcIi5mb3JtIGZvcm06ZXEoMSlcIjtcbiAgfVxuICByZXR1cm4gJC5tYWduaWZpY1BvcHVwLm9wZW4oe1xuICAgIGl0ZW1zOiB7XG4gICAgICBzcmM6ICQoc2VsZWN0b3IpLFxuICAgICAgdHlwZTogJ2lubGluZSdcbiAgICB9LFxuICAgIHJlbW92YWxEZWxheTogNTAwLFxuICAgIG1haW5DbGFzczogJ21mcC16b29tLWluIG1vZGFsJyxcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge31cbiAgICB9LFxuICAgIG1pZENsaWNrOiB0cnVlXG4gIH0pO1xufTtcbiIsIiQoZnVuY3Rpb24oKSB7XG4gIHZhciBjb3VudGVyLCBzZWxlY3RvcnM7XG4gIHNlbGVjdG9ycyA9IFsnLmZvcm1fX2ZpZWxkIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJywgJy5mb3JtX19maWVsZCBpbnB1dFt0eXBlPVwidGVsXCJdJywgJy5mb3JtX19maWVsZCB0ZXh0YXJlYSddO1xuICAkKGRvY3VtZW50KS5vbigncmVhZHkgZm9jdXMgYmx1cicsIHNlbGVjdG9ycy5qb2luKCcsICcpLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyICRlbDtcbiAgICAkZWwgPSAkKHRoaXMpLnBhcmVudCgnc3BhbicpO1xuICAgIGlmICgkZWwubGVuZ3RoID4gMCkge1xuICAgICAgJGVsLnRvZ2dsZUNsYXNzKCdmb2N1c2VkJywgJCh0aGlzKS5pcygnOmZvY3VzJykpO1xuICAgIH1cbiAgICByZXR1cm4gJGVsLnRvZ2dsZUNsYXNzKCdoYXMtdGV4dCcsICQodGhpcykudmFsKCkubGVuZ3RoID4gMCk7XG4gIH0pO1xuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5zaWJsaW5ncygnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gIH0pO1xuICBjb3VudGVyID0gMDtcbiAgcmV0dXJuICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZm9ybV9fcmlnaHQgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5zaWJsaW5ncygnLndwY2Y3LXJlc3BvbnNlLW91dHB1dCcpLnNsaWRlVXAoNDAwKTtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCcuYWpheC1sb2FkZXInKS5jc3Moe1xuICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gICAgfSk7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIGlmIChjb3VudGVyIDwgMikge1xuICAgICAgICAgICQoX3RoaXMpLnBhcmVudHMoJ2Zvcm0nKS5maW5kKCcuZm9ybV9fZmllbGQ6bnRoLWxhc3QtY2hpbGQobisyKSBpbnB1dCcpLmFkZENsYXNzKCd3cGNmNy1ub3QtdmFsaWQnKTtcbiAgICAgICAgICAkKF90aGlzKS5wYXJlbnQoKS5zaWJsaW5ncygnLndwY2Y3LXJlc3BvbnNlLW91dHB1dCcpLnNsaWRlRG93big0MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy53cGNmNy1ub3QtdmFsaWQnKS5yZW1vdmVDbGFzcygnd3BjZjctbm90LXZhbGlkJyk7XG4gICAgICAgICAgJChfdGhpcykucGFyZW50KCkuc2libGluZ3MoJy53cGNmNy1nb29kJykuc2xpZGVEb3duKDQwMCk7XG4gICAgICAgICAgZG9jdW1lbnQuZm9ybXNSZXNwb25zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkKF90aGlzKS5zaWJsaW5ncygnLmFqYXgtbG9hZGVyJykuY3NzKHtcbiAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSkodGhpcyksIDcwMCArIE1hdGgucmFuZG9tKCkgKiAoMjAwMCAtIDcwMCkpO1xuICB9KTtcbn0pO1xuXG4vLyAtLS1cbi8vIGdlbmVyYXRlZCBieSBjb2ZmZWUtc2NyaXB0IDEuOS4yXG4iLCJ2YXIgc2xpY2UgPSBbXS5zbGljZTtcblxuKGZ1bmN0aW9uKCQsIHdpbmRvdykge1xuICB2YXIgUmlwcGxlO1xuICBSaXBwbGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gUmlwcGxlKGVsLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLiRlbCA9ICQoZWwpO1xuICAgICAgdGhpcy4kZWwub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgdmFyIHgsIHk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmICgkKF90aGlzKS5kYXRhKCdwcmVzc2VkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChfdGhpcykuZGF0YSgncHJlc3NlZCcsIHRydWUpO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICQoX3RoaXMpLmRhdGEoJ3ByZXNzZWQnLCBmYWxzZSk7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICBfdGhpcy4kaW5rID0gX3RoaXMuJGVsLmNoaWxkcmVuKCcuaW5rJyk7XG4gICAgICAgICAgaWYgKF90aGlzLiRpbmsubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBfdGhpcy4kZWwuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaW5rXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzLiRpbmsgPSBfdGhpcy4kZWwuY2hpbGRyZW4oJy5pbmsnKTtcbiAgICAgICAgICBpZiAoX3RoaXMuJGluay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgX3RoaXMuJGluay5yZW1vdmVDbGFzcyhcImFuaW1hdGVcIik7XG4gICAgICAgICAgaWYgKCFfdGhpcy4kaW5rLmhlaWdodCgpICYmICFfdGhpcy4kaW5rLndpZHRoKCkpIHtcbiAgICAgICAgICAgIF90aGlzLmQgPSBNYXRoLm1heChfdGhpcy4kZWwub3V0ZXJXaWR0aCgpLCBfdGhpcy4kZWwub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgICBfdGhpcy4kaW5rLmNzcyh7XG4gICAgICAgICAgICAgIGhlaWdodDogX3RoaXMuZCxcbiAgICAgICAgICAgICAgd2lkdGg6IF90aGlzLmRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX3RoaXMuZCA+IDApIHtcbiAgICAgICAgICAgIHggPSBlLnBhZ2VYIC0gX3RoaXMuJGVsLm9mZnNldCgpLmxlZnQgLSBfdGhpcy5kIC8gMjtcbiAgICAgICAgICAgIHkgPSBlLnBhZ2VZIC0gX3RoaXMuJGVsLm9mZnNldCgpLnRvcCAtIF90aGlzLmQgLyAyO1xuICAgICAgICAgICAgY29uc29sZS5sb2coX3RoaXMuJGlua1swXSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuJGluay5jc3Moe1xuICAgICAgICAgICAgICB0b3A6IHkgKyAncHgnLFxuICAgICAgICAgICAgICBsZWZ0OiB4ICsgJ3B4J1xuICAgICAgICAgICAgfSkuYWRkQ2xhc3MoXCJhbmltYXRlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmlwcGxlO1xuXG4gIH0pKCk7XG4gIHJldHVybiAkLmZuLmV4dGVuZCh7XG4gICAgcmlwcGxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBvcHRpb247XG4gICAgICBvcHRpb24gPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmlwcGxlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn0pKHdpbmRvdy5qUXVlcnksIHdpbmRvdyk7XG5cbi8vIC0tLVxuLy8gZ2VuZXJhdGVkIGJ5IGNvZmZlZS1zY3JpcHQgMS45LjJcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIHNlcXVlbmNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VxdWVuY2UxXCIpO1xuICBpZiAoc2VxdWVuY2VFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBhbmltYXRlQ2FudmFzOiBmYWxzZSxcbiAgICBrZXlOYXZpZ2F0aW9uOiB0cnVlLFxuICAgIGZhZGVTdGVwV2hlblNraXBwZWQ6IGZhbHNlLFxuICAgIHJldmVyc2VXaGVuTmF2aWdhdGluZ0JhY2t3YXJkczogdHJ1ZSxcbiAgICBuZXh0QnV0dG9uOiAnI3NlcXVlbmNlMSAuc2VxLXByZXYnLFxuICAgIHByZXZCdXR0b246ICcjc2VxdWVuY2UxIC5zZXEtbmV4dCcsXG4gICAgcHJlbG9hZGVyOiAnI3NlcXVlbmNlMSAuc2VxLXByZWxvYWRlcicsXG4gICAgLy8gcmV2ZXJzZVRpbWluZ0Z1bmN0aW9uV2hlbk5hdmlnYXRpbmdCYWNrd2FyZHM6IHRydWUsXG4gIH1cblxuICB2YXIgbXlTZXF1ZW5jZSA9IHNlcXVlbmNlKHNlcXVlbmNlRWxlbWVudCwgb3B0aW9ucyk7XG59KSgpO1xuIl19
