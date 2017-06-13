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
var pages = { "Syriza": {name: "Syriza", source_score: left, url_component: "syrizaofficial"},
              "Melenchon": {name: "Melenchon", source_score: left, url_component: "JLMelenchon"},
              "Corbyn": {name: "Jeremy Corbyn", source_score: left, url_component: "JeremyCorbynMP"},
              "Communist": {name: "Communist Party", source_score: left, url_component: "communism101"},
              "Labour": {name: "Labour Party", source_score: c_left, url_component: "labourparty"},
              "Obama": {name: "Barack Obama", source_score: c_left, url_component: "barackobama"},
              "Sanders": {name: "Bernie Sanders", source_score: c_left, url_component: "berniesanders"},
              "Clinton": {name: "Hillary Clinton", source_score: c_left, url_component: "hillaryclinton"},
              "Sadiq": {name: "Sadiq Khan", source_score: c_left, url_component: "sadiqforlondon"},
              "DailyShow": {name: "Daily Show", source_score: c_left, url_component: "thedailyshow"},
              "Conservative": {name: "Conservative Party", source_score: c_right, url_component: "conservatives"},
              "Cameron": {name: "David Cameron", source_score: c_right, url_component: "DavidCameronOfficial"},
              "Boris": {name: "Boris Johnson", source_score: c_right, url_component: "borisjohnson"},
              "Kyle": {name: "Jeremy Kyle", source_score: c_right, url_component: "Jeremykyle"},
              "LePen": {name: "Marine Le Pen", source_score: right, url_component: "MarineLePen"},
              "Farage": {name: "Nigel Farage", source_score: right, url_component: "nigelfarageofficial"},
              "UKIP": {name: "UKIP", source_score: right, url_component: "UKIP"},
              "BNP": {name: "BNP", source_score: right, url_component: "OfficialBritishNationalParty"},
              "Trump": {name: "Donald Trump", source_score: right, url_component: "DonaldTrump"}
};


/**
 * Function that returns user Facebook full name as displayed
 */
function getUser() {
  while  (name === '') { name = document.getElementById('u_0_t').getElementsByTagName('a')[0].getAttribute("aria-label").replace('Profile of ', '') };
  return name;
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
    async: false,
    success: function() {
      console.log("Wahoooooooooo!!!");
    },
    error: function(error) {
      console.log("The AJAX request failed with the following:");
      console.log(error.statusText);
    }
  });
};
/**
 * HTTP GET request function for the facebook page
 */
function getEdit(url, done) { //, done
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
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
  Object.keys(pages).forEach( function(key, index) {
    var url = "https://mbasic.facebook.com/" + pages[key].url_component + "/socialcontext";
    // var array = [];
    // Make GET request and count people on page (i.e. the number of friends who have liked)
    getNumberOfPageLikes(url, function(count) {
      pages[key]["friend_likes"] = count;
    });
  });
  return pages;
};

// ---------- SCRIPT RUNNING ----------

// // Script when active tab is Facebook (runs every hour)
// if (facebookUrl.exec(currentUrl)) {
//   // setInterval({
//     /* TODO Delete */ console.log("Welcome!");
//     name = getUser();
//     /* TODO Delete */ console.log("Your Facebook name: " + name);
//     /* TODO Delete */ console.log("Gathering feed data...");
//     var urls = getFeed(); // urls is an array
//     var feed = {"name": name, "urls": urls};
//     /* TODO Delete */ console.log("Data sent for analysis: ");
//     /* TODO Delete */ console.log(feed);
//     /* TODO Delete */ console.log("Submitting for analysis...");
//     sendFeed('https://unpolarise.herokuapp.com/links', feed);
//     /* TODO Delete */ console.log("Done!!!");
//   // }, 3600000 );
// };

$(document).ready(function () {
  if (facebookUrl.exec(currentUrl)) {
    // setInterval({
      console.log("Counting your friends' likes on certain pages.");
      name = getUser();
      /* TODO Delete */ console.log("Your Facebook name: " + name);
      var likes_hash = createObjectOfPageDetails();
      var feed = {"name": name, "likes_array": likes_hash };
      console.log("Data sent for analysis: ");
      console.log(feed);
      // sendFeed('http://testing.unpolarise.ultrahook.com', feed); // For local testing the deployed version
      sendFeed('https://unpolarise.herokuapp.com/facebook_pages', feed);
    // }, 3600000 );
  };
});

// ----- CHERRY ON THE CAKE -----
// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');
