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

// Function that returns user Facebook full name as displayed
function getUser() {
  while  (name === '') { name = document.getElementById('u_0_t').getElementsByTagName('a')[0].getAttribute("aria-label").replace('Profile of ', '') };
  return name
};

// Function that gets external links from Facebook home feed
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

// Function that sends post request to app
function sendFeed() {
  $.ajax({
    type: "POST",
    url: 'https://unpolarise.herokuapp.com/links',
    data: feed,
    success: function() {
      console.log(feed);
    },
    error: function(error) {
      console.log(error.statusText);
    }
  });
};

// ----- SCRIPT RUNNING -----

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
    sendFeed();
    /* TODO Delete */ console.log("Done!!!");
  // }, 3600000 );
};


// ----- CHERRY ON THE CAKE -----
// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');




