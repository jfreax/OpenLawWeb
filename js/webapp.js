$( document ).ready(function() {

  $.getJSON('http://127.0.0.1:5000/laws?callback=?', null, function (results) {
      var dl = $();
      var dt = $();
      
      var lastChar = "";
      for (var law in results) {
        var short = results[law][0];
        
        var firstLetter = short.substring(0, 1);
        if( firstLetter != lastChar) {
          lastChar = firstLetter;
          dl = $('<dl/>').appendTo('.listContainer');
          dt = $('<dt/>', {text: firstLetter}).appendTo(dl);
        }
        $('<dd/>', {text: results[law][0]}).appendTo(dl);
      }
  });

  
});

