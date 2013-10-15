// Responsiveslides.js
$("#slider").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        timeout: 10000,
        namespace: "phone-slide",
        navContainer: "#phone-holder"
});

// Green seperator
$.fn.followTo = function (pos, height, id) {
    var $this = this,
        $window = $(window);
        
    if( pos == -1 ) {
        id.css({
            'border-bottom':''
        });
        $window.scroll(function (e) {});
        return;
    }

    $window.scroll(function (e) {
        var top = $window.scrollTop();
        if (top > pos && top < pos+height) {
            id.css({
                'border-bottom': '15px solid #1abc9c'
            });
        } else {
            var diff = 15 - (top - (pos+height));
            if (top > pos+height && diff > 0) {
                id.css({
                    'border-bottom': (diff)+'px solid #1abc9c'
                });
            } else {
                id.css({
                    'border-bottom':''
                });
            }
        }
    });
};

$( document ).ready(function() {
    setupSeperator();
});

// Reset on window resize event
$(window).resize(function() {
    setupSeperator();
});

// Setup green seperator tracking
function setupSeperator() {
    if( window.innerWidth <= 768 ) {
        $('#features').followTo(-1, -1);
    } else {
        var outerHeight = $('#header').outerHeight();
        var id = $("#header");
        if( window.innerHeight < 796 ) {
        } else {
            outerHeight += $('#download-header').outerHeight();
            id = $("#download-header");
        }
        $('#features').followTo(
            $('#head').outerHeight() - outerHeight,
            $('#features').outerHeight(),
            id
        );
    }
    $(window).trigger("scroll");
}

// Inview
$('.fadeIn').css({
  'opacity': 0,
  'filter': 'alpha(opacity=0)'
});
$('.fadeIn').bind('inview', function(event, visible) {
      if (visible) {
          $(this).stop().animate({ opacity: 1 }, 600);
      }
});

// Touch events
phone = $("#phone-holder").hammer();

phone.on("dragstart", function(ev) {
  ev.preventDefault();
});


phone.on("dragend", function(ev) {
  var angle = ev.gesture.angle + 180;
  var trigger = $(".phone-slide_nav"),
      prev = trigger.filter(".prev"),
      next = trigger.filter(".next");

  if( angle > 150 && angle < 210 ) {
    next.trigger('click');
  } else if ( angle < 30 || angle > 330 ) {
    prev.trigger('click');
  }
  
  ev.stopPropagation();
});
