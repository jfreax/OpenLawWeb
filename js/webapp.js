
/**
 * Represents a list of laws.
 * 
 * Lazy loading of 'items' elements per page
 * from 'url' via jsonp.
 * 
 * url: Server base url with optional port, but without a trailing slash!
 * container: CSS selector of div to which new elements are added to
 * items: Elements per page
 */
function LawList( url, container, items ) {
  this.url = url;
  this.container = $(container);
  this.containerName = container;
  this.items = items;
  
  this.parent = this.container.parent();
  this.page = 0; // Number of pages we began to load
  this.pageFinished = 0; // Number of pages finished (incl. DOM)
  this.lastChar = undefined;
  
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
  var bottom = this.container.position().top + this.container.outerHeight(true);
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
        // Begin new sublist with new letter as header
        if(firstLetter != self.lastChar) {
          self.lastChar = firstLetter;
          dl = $('<dl/>').appendTo(self.container);
          dt = $('<dt/>', {text: firstLetter}).appendTo(dl);
        }
        
        dd = $('<dd/>', {
          title: data[law][2]
        }).append("<div>"+data[law][0]+"</div><div>"+data[law][2]+"</div>").appendTo(dl);
        
        dd.data('slug', data[law][1]);
        dd.click($.proxy(self.click, self));
      }
      
      // Page finished loading
      self.pageFinished += 1;
      
      // Load one more page if user scrolled enough
      self.checkPageEnd();
      
      // Approximate overall height of law list
      var loaded = self.pageFinished * self.items;
      var rest = self.count - loaded
      self.parent.height(
        self.container.height() + 
        rest * (self.container.outerHeight(true) / loaded)
      );
  });
}

/**
 * Handle click
 */
LawList.prototype.click = function(event) {
  if(this.headlineList != undefined) {
    this.headlineList.load($(event.currentTarget).data('slug'));
  }
}

/**
 * Represents a list of law headline.
 * 
 * url: Server base url with optional port, but without trailing slash!
 * container: CSS selector of div to which new elements are added to
 */
function HeadlineList( url, container ) {
  this.url = url;
  this.containerName = container;
  this.container = $(container);
}

/**
 * Load list of headlines and render them
 * 
 * slug: Slug for jsonp url
 */
HeadlineList.prototype.load = function(slug) {
  var self = this;
  
  $.getJSON(this.url+'/land/1/laws/'+slug+'?callback=?', null, function (results) {
    // Clear old headlines
    self.container.empty();
    
    var data = results.data;
    for(var id in data) {
        var name = data[id].name;
        
        newDiv = $('<div/>', {
          text: name
        }).appendTo(self.container);
    }
  });
}


/**
 * Ready!
 */
$( document ).ready(function() {
  var url = 'http://127.0.0.1:5000';
  
  // Handle law code list
  var lawList = new LawList(url, '.listContainer', 200);
  var lawHeadline = new HeadlineList(url, '.headlineContainer');
  lawList.headlineList = lawHeadline;
  
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

