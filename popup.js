// ----- POP UP USER JOURNEYS -----

chrome.tabs.getSelected(null, function(tab) {
  var currentUrl = tab.url;
  var facebookUrl = /facebook\.com\/?$/;

  if (facebookUrl.exec(currentUrl)) {
  // Link to get analysis if tab open is facebook
    $("#animation").html('<img id="gif" src="animation.svg">');
    $("#btn").html('<a href="https://unpolarise.co.uk/analytics">Get Feed Analytics</a>');
    $("#btn").on("click", function() {
      window.open("https://unpolarise.co.uk/home", '_blank')
    });
  } else {
  // Link to open Facebook home and launch analysis
    $("#btn").html('<a href="https://www.facebook.com">Screen Facebook Feed</a>');
    $("#btn").on("click", function() {
      window.open("https://www.facebook.com", '_blank');
    });
  };
});



