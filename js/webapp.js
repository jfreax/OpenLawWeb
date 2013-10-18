
/**
 * Represents a list of laws.
 * 
 * Lazy loading of 'items' elements per page
 * from 'url' via jsonp.
 * 
 * url: Server base url with optional port,
 *      but without trailing slash!
 * items: Elements per page
 */
function LawList( url, items ) {
  this.url = url;
  this.items = items;
  
  this.page = 0; // Number of pages we began to load
  this.pageFinished = 0; // Number of pages finished (incl. DOM)
  this.lastChar = "";
  
  this.initialize();
}

/*
 * Initialize and start loading first page
 */
LawList.prototype.initialize = function () {
  var self = this;
  // Get number of all law codes
  $.getJSON(this.url+'/land?callback=?', null, function (results) {
    self.count = results.data[0].count;
    // Trigger the first load
    self.loadNext();
  });
}

/*
 * Check if we need to load more entries.
 */
LawList.prototype.checkPageEnd = function () {
  var bottom = $('.listContainer').position().top + $('.listContainer').outerHeight(true);
  if ( $(window).scrollTop() + $(window).outerHeight() >= bottom * 0.8 ) {
    this.page += 1;
    
    if( this.page < this.count / this.items ) {
      this.loadNext();
    }
  }
}

/*
 * Load more entries and create DOM elements.
 */
LawList.prototype.loadNext = function() {
  var self = this;
  $.getJSON(this.url+'/land/1/laws?items='+this.items+'&page='+this.page+'&callback=?', null, function (results) {
      data = results.data;
      for(var law in data) {
        var short = data[law][0];
        
        var firstLetter = getFirstLetter(short);
        if(firstLetter != self.lastChar) {
          self.lastChar = firstLetter;
          dl = $('<dl/>').appendTo('.listContainer');
          dt = $('<dt/>', {text: firstLetter}).appendTo(dl);
        }
        $('<dd/>', {
          title: data[law][2]
        }).append("<div>"+data[law][0]+"</div><div>"+data[law][2]+"</div>").appendTo(dl);
      }
      
      // Page finished loading
      self.pageFinished += 1;
      
      // Load one more page if user scrolled enough
      self.checkPageEnd();
      
      // Approximate overall height of law list
      var loaded = self.pageFinished * self.items;
      var rest = self.count - loaded
      $('#listFrame').height(
        $('.listContainer').height() + 
        rest * ($('.listContainer').outerHeight(true) / loaded)
      );
  });
}


/**
 * Ready!
 */
$( document ).ready(function() {
  // Handle law code list
  var lawList = new LawList( 'http://127.0.0.1:5000', 200 );
  
  // Update/Load more on scrolling
  $(window).scroll($.proxy( lawList.checkPageEnd, lawList ));
});


/*
 * Return first uppercase letter of string.
 * Convert umlauts.
 */
function getFirstLetter(str) {
  first = str.substring(0, 1); //.toUpperCase();
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

