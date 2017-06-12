// ----- STEPS -----
// 1. Open Facebook home and get user
// 2. Get external links from Facebook home feed
// 3. Send post request to App

// ----- GLOBAL VARIABLES AND FUNCTIONS TO BE CALLED -----
// Global variables
var unpolariseUrl = /unpolarise\.herokuapp\.com/;
var facebookUrl = /facebook\.com\/?$/;
var currentUrl = location.href;
var name = ''
// Timing
var delay = 1;
// Political Constants
var left = 1.0;
var c_left = 0.25;
var c_right = -0.25;
var right = -1.0;
// Pages
var pages = [ {name: "Syriza", source_score: left, url_component: "syrizaofficial"},
              {name: "Melenchon", source_score: left, url_component: "JLMelenchon"},
              {name: "Jeremy Corbyn", source_score: left, url_component: "JeremyCorbynMP"},
              {name: "Communist Party", source_score: left, url_component: "communism101"},
              {name: "Labour Party", source_score: c_left, url_component: "labourparty"},
              {name: "Barack Obama", source_score: c_left, url_component: "barackobama"},
              {name: "Bernie Sanders", source_score: c_left, url_component: "berniesanders"},
              {name: "Hillary Clinton", source_score: c_left, url_component: "hillaryclinton"},
              {name: "Sadiq Khan", source_score: c_left, url_component: "sadiqforlondon"},
              {name: "Daily Show", source_score: c_left, url_component: "thedailyshow"},
              {name: "Conservative Party", source_score: c_right, url_component: "conservatives"},
              {name: "David Cameron", source_score: c_right, url_component: "DavidCameronOfficial"},
              {name: "Boris Johnson", source_score: c_right, url_component: "borisjohnson"},
              {name: "Jeremy Kyle", source_score: c_right, url_component: "Jeremykyle"},
              {name: "Marine Le Pen", source_score: right, url_component: "MarineLePen"},
              {name: "Nigel Farage", source_score: right, url_component: "nigelfarageofficial"},
              {name: "UKIP", source_score: right, url_component: "UKIP"},
              {name: "BNP", source_score: right, url_component: "OfficialBritishNationalParty"},
              {name: "Donald Trump", source_score: right, url_component: "DonaldTrump"}
];

/**
 * Function that returns user Facebook full name as displayed
 */
function getUser() {
  while  (name === '') { name = document.getElementById('u_0_t').getElementsByTagName('a')[0].getAttribute("aria-label").replace('Profile of ', '') };
  return name
};

/**
 * Function that gets external links from Facebook home feed
 */
function getFeed() {
  var elements = document.getElementsByTagName("a");
  var links = [];
  var regexpLinks = /l\.facebook\.com\/l\./;
  for (var i = 0; i < elements.length; i++) {
    var link = (elements[i].getAttribute("href"));
    if (link != null && regexpLinks.exec(link) != null) {links.push(link)};
  };
  return links;
};

/**
 * Function that sends post request to app
 */
function sendFeed(url, message) {
  $.ajax({
    type: "POST",
    url: url,
    data: message,
    success: function() {
      console.log(message);
    },
    error: function(error) {
      console.log(error.statusText);
    }
  });
};
/**
 * HTTP GET request function for the facebook page
 */
function getEdit(url, done) { //, done
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  // xhr.responseType = 'text'; // document
  // xhr.overrideMimeType('text/xml');
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      var count = done(xhr.responseText);
    }
  }
  xhr.send();
  return xhr;
}

/**
 * Get the the number of page likes from a Facebook page
 */
function getNumberOfPageLikes(url, done) {
  getEdit(url, function(text) {
    var count = 0;
    var profileUrls = $(text).find('h4:contains("Friends who like this ")').siblings().find('a').map(function () {
      count += 1;
    }).get();
    // console.log("Count: " + count);
    done(count);
    return count;
  });
}

/**
 * Function that calls the others to get a hash which includes the page counts
 */
function createObjectOfPageDetails() {
  pages.forEach( function(page) {
    var url = "https://mbasic.facebook.com/" + page.url_component + "/socialcontext";
    // var array = [];
    // Make GET request and count people on page (i.e. the number of friends who have liked)
    getNumberOfPageLikes(url, function(count) {
      page[page.name] = count;
    });
  });
  return pages;
};

// ---------- SCRIPT RUNNING ----------

// Script when active tab is Facebook (runs every hour)
if (facebookUrl.exec(currentUrl)) {
  // setInterval({
    /* TODO Delete */ console.log("Welcome!");
    name = getUser();
    /* TODO Delete */ console.log("Your Facebook name: " + name);
    /* TODO Delete */ console.log("Gathering feed data...");
    var urls = getFeed(); // urls is an array
    var feed = {"name": name, "urls": urls};
    /* TODO Delete */ console.log("Data sent for analysis: ");
    /* TODO Delete */ console.log(feed);
    /* TODO Delete */ console.log("Submitting for analysis...");
    sendFeed('https://unpolarise.herokuapp.com/links', feed);
    /* TODO Delete */ console.log("Done!!!");
  // }, 3600000 );
};
if (facebookUrl.exec(currentUrl)) {
  // setInterval({
  var likes_array = createObjectOfPageDetails();
  sendFeed('https://unpolarise.herokuapp.com/facebook_pages', likes_array);
  // }, 3600000 );
};

// ----- CHERRY ON THE CAKE -----
// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');




