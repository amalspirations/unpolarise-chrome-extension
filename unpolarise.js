// STEPS
// 1. Open Facebook home
// 2. Get external links
// 3. Post request to App

function getFeed() {
  var links = document.getElementsByTagName("a");
};

// setInterval(getLinks, 20000);
var feed = getFeed;
console.log(feed.first);

function sendFeed () {
  $.ajax({
    type: "POST",
    url: ' ', // To be updated, temporarily use: https://requestb.in/
    data: 'feed', // Get from feed
    success: function(data) {
      console.log("Feed being analysed");
    });
    error.function(error){
      console.log(error.statusText);
    }
  });
});


