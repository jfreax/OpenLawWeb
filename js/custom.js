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
$.fn.followTo = function (pos, height) {
    var $this = this,
        $window = $(window);
        
    if( pos == -1 ) {
        $("#header").css({
            'border-bottom':''
        });
        $window.scroll(function (e) {});
        return;
    }

    $window.scroll(function (e) {
        var top = $window.scrollTop();
        if (top > pos && top < pos+height) {
            $("#header").css({
                'border-bottom': '15px solid #1abc9c'
            });
        } else {
            var diff = 15 - (top - (pos+height));
            if (top > pos+height && diff > 0) {
                $("#header").css({
                    'border-bottom': (diff)+'px solid #1abc9c'
                });
            } else {
                $("#header").css({
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
        $('#features').followTo(
            $('#head').outerHeight() - $('#header').outerHeight(),
            $('#features').outerHeight()
        );
    }
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
