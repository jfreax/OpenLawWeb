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

setupSeperator();
$(window).resize(function() {
    setupSeperator();
});

function setupSeperator() {
    $('#features').followTo(
      $('#head').outerHeight() - $('#header').outerHeight(),
      $('#features').outerHeight()
    );
}


// Inview
$('.fadeIn').bind('inview', function(event, visible) {
      if (visible) {
        $(this).stop().animate({ opacity: 1 }, 600);
      }
});
