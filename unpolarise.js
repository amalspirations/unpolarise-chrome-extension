// ----- STEPS -----
// 1. Open Facebook home and get user id
// 2. Get external links from Facebook home feed
// 3. Send post request to App

// ----- GLOBAL VARIABLES AND FUNCTIONS TO BE CALLED -----

// Global variables
var uid = 'dummy' // Facebook ID
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

// Facebook documentation sources:
// Setup: https://developers.facebook.com/docs/javascript/quickstart
// Login: https://developers.facebook.com/docs/facebook-login/web#checklogin
function getFacebookId() {
  var apiLoaded = false;

  window.fbAsyncInit = function() {
    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    FB.init({
      appId      : '226017737902942',
      status     : true,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.9'
    });

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // the user is logged in and has authenticated the app
        console.log('You are logged in.');
        uid = response.authResponse.userID;
      } else {
        console.log('You need to login to Facebook.');
        FB.login();
      }
     });
  };
};

// ----- SCRIPT RUNNING -----

// Script when active tab is unpolarise (runs until uid received)
// while (uid === 'dummy') {
  if (unpolariseUrl.exec(currentUrl)) {
    /* TODO Delete */ console.log("Requesting your Facebook user ID...");
    // setTimout(
      getFacebookId()
      // , 3000);
  };
// };

// Script when active tab is Facebook (runs every hour)
if (uid != 'dummy' && facebookUrl.exec(currentUrl)) {
  // setInterval({
    /* TODO Delete */ console.log("Welcome!");
    /* TODO Delete */ console.log("Your Facebook  ID: " + uid);
    /* TODO Delete */ console.log("Gathering feed data...");
    var urls = getFeed(); // urls is an array
    var feed = {"uid": uid, "urls": urls};
    /* TODO Delete */ console.log("Submitting for analysis...");
    sendFeed();
    /* TODO Delete */ console.log("Done!!!");
  // }, 3600000 );
};

// ----- POP UP USER JOURNEYS -----
// Link to sign up on unpolarize if not registered
if (uid === 'dummy') { $("#btn").html('<a href="https://unpolarise.herokuapp.com/users/sign_up">Sign up to unpolarise</a>') }
// Link to get analysis if logged in on Facebook
else if (facebookUrl.exec(currentUrl)) { $("#btn").html('<a href="https://unpolarise.herokuapp.com/analytics">Get Facebook Feed Analytics</a>') }
// Link to open Facebook when registered on website
else { $("#btn").html('<a href="https://www.facebook.com/">Screen Facebook Feed</a>') };

// ----- CHERRY ON THE CAKE -----
// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');




