(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

FB.init({
  appId            : '226017737902942',
  autoLogAppEvents : true,
  status           : true,
  xfbml            : true,
  version          : 'v2.9'
});

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    // the user is logged in and has authenticated the app
    console.log('You are logged in.');
    var uid = response.authResponse.userID;
  } else {
    console.log('You need to login to Facebook.');
    FB.login();
  }
 });


//

function loadFB(code) { // loads FB script asynchronously
      var script = document.createElement('script');
      script.async = true;
      script.src = '//connect.facebook.net/en_US/all.js';
      script.onload = code;
      document.head.appendChild(script);
  }
  console.log("I am here 1")
  function facebookInit() {
    // sometimes FB is still not available after facebookInit is called, it's safer to call it just in time
    console.log("I am here 2")
    FB.init({ appId: '226017737902942', cookie: true, status: true, xfbml: true, oauth: true, version: 'v2.9' });
    console.log("I am here 3")
    FB.getLoginStatus(function(response) {
      console.log("I am here 4")
      if (response.status === 'connected') {
        // the user is logged in and has authenticated the app
        console.log('You are logged in.');
        uid = response.authResponse.userID;
        console.log('Your Facebook user ID: '+ uid);
      } else {
        console.log('You need to login to Facebook.');
        FB.login();
      };
    });
  };
  loadFB(facebookInit); // load FB scripts, then call facebookInit

// ---------------

  // console.log('getFacebookId');
  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "//connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));

  // window.fbAsyncInit = function() {

  //   // Function that retrieves Facebook user id
  //   FB.getLoginStatus(function(response) {
  //     if (response.status === 'connected') {
  //       // the user is logged in and has authenticated the app
  //       console.log('You are logged in.');
  //       uid = response.authResponse.userID;
  //       console.log('Your Facebook user ID: '+ uid);
  //     } else {
  //       console.log('You need to login to Facebook.');
  //       FB.login();
  //     }
  //   });

  //   // Function that initializes Facebook app
  //   console.log('fbAsyncInit');

  //   FB.init({
  //     appId            : '226017737902942',
  //     autoLogAppEvents : true,
  //     status           : true,
  //     xfbml            : true,
  //     version          : 'v2.9'
  //   });


