// Responsiveslides.js
$("#slider").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        timeout: 10000,
        namespace: "phone-slide"
});


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
            $("#header").css({
              'border-bottom': ''
            });
        }
    });
};

$('#features').followTo(
  $('#head').outerHeight() - $('#header').outerHeight(),
  $('#features').outerHeight()
);