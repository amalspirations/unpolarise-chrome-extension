// ----- STEPS -----
// 1. Open Facebook home and get user id
// 2. Get external links from Facebook home feed
// 3. Send post request to App

// ----- FUNCTIONS TO BE CALLED -----

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

// Function that gets
$(document).ready(function() {

  $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '226017737902942',
      version: 'v2.9' // or v2.1, v2.2, v2.3, ...
    });
    FB._domain = {
  api : 'https://api.facebook.com/',
  cdn : 'https://s-static.ak.fbcdn.net/',
  www : 'https://www.facebook.com/'
};
    FB.getLoginStatus(function() {
      console.log('sfdnsfdsnfjkdsf')
    });
  });

});

// Facebook documentation sources:
// Setup: https://developers.facebook.com/docs/javascript/quickstart
// Login: https://developers.facebook.com/docs/facebook-login/web#checklogin
// Facebook app id: '226017737902942'

// Function that initializes Facebook app
FB.init({
  appId            : '226017737902942',
  autoLogAppEvents : true,
  status           : true,
  xfbml            : true,
  version          : 'v2.9'
});
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// Function that retrieves Facebook user id
FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    // the user is logged in and has authenticated the app
    var uid = response.authResponse.userID;
    console.log('You are logged in.');
  } else {
    console.log('You need to login to Facebook.');
    FB.login();
  }
 });

// ----- SCRIPT RUNNING BELOW -----

/* TODO Delete */ console.log("Welcome!");

/* TODO Delete */ console.log("Searching Facebook user ID...");

// TODO Call function that searches Facebook ID

/* TODO Delete */ console.log("Gathering feed data...");

var urls = getFeed(); // urls is an array

var feed = {"uid": "10155031040388001", "urls": urls};
// // TODO Replace uid with actual uid

/* TODO Delete */ console.log("Submitting for analysis...");

sendFeed();

/* TODO Delete */ console.log("Done!!!");

// TODO prepend in home feed $('#stream_pagelet').prepend('link to app');

