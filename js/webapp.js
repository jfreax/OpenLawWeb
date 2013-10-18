var items = 10;
var count = 0;
var page = 0;

$( document ).ready(function() {
  $.getJSON('http://127.0.0.1:5000/land?callback=?', null, function (results) {
    count = results.data[0].count;
  });
  
  listAdapter(page);
  
  $(window).scroll(function() {
    loadMore();
  });
});


var lastChar = "";
var dl = $();
var dt = $();
function listAdapter(page) {
  
  $.getJSON('http://127.0.0.1:5000/land/1/laws?items='+items+'&page='+page+'&callback=?', null, function (results) {
      data = results.data;
      for(var law in data) {
        var short = data[law][0];
        
        var firstLetter = getFirstLetter(short);
        if(firstLetter != lastChar) {
          lastChar = firstLetter;
          dl = $('<dl/>').appendTo('.listContainer');
          dt = $('<dt/>', {text: firstLetter}).appendTo(dl);
        }
        $('<dd/>', {
          title: data[law][2]
        }).append("<div>"+data[law][0]+"</div><div>"+data[law][2]+"</div>").appendTo(dl);
      }
      
      // Load one more page if user scrolled enough
      loadMore();
      
      // Approximate new overall height of law list
      var rest = count - (page*items+items)
      $('#listFrame').height($('.listContainer').height() + rest * ($('div.listContainer').outerHeight(true) / ((page+1)*items)));
  });
}

function loadMore() {
  var bottom = $('.listContainer').position().top + $('.listContainer').outerHeight(true);
  if ( $(window).scrollTop() >= bottom * 0.8 ) {
    page += 1;
    
    if( page < count / items ) {
      listAdapter(page)
    }
  }
}

function getFirstLetter(str) {
  first = str.substring(0, 1);
  switch(first) {
    case 'Ä':
      return 'A';
      break;
    case 'Ö':
      return 'Ö';
      break;
    case 'Ü':
      return 'Ü';
      break;
    default:
      return first;
  }
}