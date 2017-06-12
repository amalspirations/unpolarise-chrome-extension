// ----- POP UP USER JOURNEYS -----
// Link to sign up on unpolarize if not registered
$("#btn").html('<a href="https://unpolarise.herokuapp.com/users/sign_up">Sign up to unpolarise</a>') };
// Link to get analysis if logged in on Facebook
var currentUrl = location.href;
var facebookUrl = /facebook\.com\/?$/;
if (facebookUrl.exec(currentUrl)) { $("#btn").html('<a href="https://unpolarise.herokuapp.com/analytics">Get Facebook Feed Analytics</a>') }
// Link to open Facebook when registered on website
else { $("#btn").html('<a href="https://www.facebook.com/">Screen Facebook Feed</a>') };
