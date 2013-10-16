$( document ).ready(function() {

  $.getJSON('http://127.0.0.1:5000/laws?callback=?', null, function (results) {
      var dl = $();
      var dt = $();
      
      var lastChar = "";
      for (var law in results) {
        var short = results[law][0];
        
        var firstLetter = getFirstLetter(short);
        if( firstLetter != lastChar) {
          lastChar = firstLetter;
          dl = $('<dl/>').appendTo('.listContainer');
          dt = $('<dt/>', {text: firstLetter}).appendTo(dl);
        }
        $('<dd/>', {
          title: results[law][2]
        }).append("<div>"+results[law][0]+"</div><div>"+results[law][2]+"</div>").appendTo(dl);
      }
  });

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
});

