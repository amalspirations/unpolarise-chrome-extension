// ----- STEPS -----
// 1. Open Facebook home and get user id
// 2. Get external links from Facebook home feed
// 3. Send post request to App

// ----- GLOBAL VARIABLES AND FUNCTIONS TO BE CALLED -----

// Global variables
var email = 'dummy' // Facebook ID
var unpolariseUrl = /unpolarise\.herokuapp\.com/;
var facebookUrl = /facebook\.com/;
var currentUrl = location.href;

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
    url: 'https://unpolarise.herokuapp.com/links', // DEVELOPMENT: use 'https://requestb.in/'
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

// ----- POP UP USER JOURNEYS -----
var x = document.getElementById('submit');
x.onclick = function() {
  email = document.getElementById('user-email').value;
  console.log(email);
}

// Link to sign up on unpolarize if not registered
if (email === 'dummy') { $("#btn").html('<a href="https://unpolarise.herokuapp.com/users/sign_up">Sign up to unpolarise</a>') }
// Link to get analysis if logged in on Facebook
else { $("#form").empty();
   if (facebookUrl.exec(currentUrl)) { $("#btn").html('<a href="https://unpolarise.herokuapp.com/analytics">Get Facebook Feed Analytics</a>') }
  // Link to open Facebook when registered on website
  else { $("#btn").html('<a href="https://www.facebook.com/">Screen Facebook Feed</a>') }
};

// Script when active tab is Facebook (runs every hour)
if (email != 'dummy' && facebookUrl.exec(currentUrl)) {
  // setInterval({
    /* TODO Delete */ console.log("Welcome!");
    /* TODO Delete */ console.log("Your Facebook ID: " + email);
    /* TODO Delete */ console.log("Gathering feed data...");
    var urls = getFeed(); // urls is an array
    var feed = {"email": email, "urls": urls};
    /* TODO Delete */ console.log("Submitting for analysis...");
    sendFeed();
    /* TODO Delete */ console.log("Done!!!");
  // }, 3600000 );
};


// ----- CHERRY ON THE CAKE -----
// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');




