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
    uid = response.authResponse.userID;
  } else {
    console.log('You need to login to Facebook.');
    FB.login();
  }
 });
