// STEPS
// 1. Open Facebook home and get user id
// 2. Get links from Facebook home feed
// 3. Filter out ads / sponsored content / internal links
// 4. Post request to App

/* TODO Delete */ console.log("Welcome!");

// 1. Open Facebook home and get user id
// TODO

// 2. Get links from Facebook home feed
function getFeed() {
  var elements = document.getElementsByTagName("a");
  var links = [];
  for (var i = 0; i < elements.length; i++) {
    links.push(elements[i].getAttribute("href"))
  };
  return links;
};
/* TODO Delete */ console.log("Gathering feed data...");
var links = getFeed();

// 3. Filter out ads / sponsored content / internal links
// TODO


// 4. Post request to App
var feed = {"user_id": "To be updated", "links": links};
var data = JSON.stringify(feed);

/* TODO Delete */ console.log("Submitting for analysis...");

// Post request to website
function sendFeed() {
  $.ajax({
    type: "POST",
    url: '', // To be updated, temporarily use: https://requestb.in/
    data: data,
    success: function() {
      console.log(data);
    },
    error: function(error) {
      console.log(error.statusText);
    }
  });
};

sendFeed();

/* TODO Delete */ console.log("Done!!!");

/* TODO Delete */ console.log("Searching Facebook user ID");
// Get Facebook User Id
// Setup: https://developers.facebook.com/docs/javascript/quickstart
// window.fbAsyncInit = function() {
//   FB.init({
//     appId            : '226017737902942',
//     autoLogAppEvents : true,
//     xfbml            : true,
//     version          : 'v2.9'
//   });
//   FB.AppEvents.logPageView();
// };
// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
// // Get user id function
// FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     var uid = response.authResponse.userID;
//   } else if (response.status === 'not_authorized') {
//     // ---- TODO: Link to website: 'sign up with Facebook'
//   } else {
//     // ---- TODO: Show "You need to be logged in"
//     // ---- TODO: Link to Facebook: 'Log in to Facebook'
//   }
// });
// console.log(uid);

// TEST: prepending in home feed $('#stream_pagelet').prepend('link to app');

