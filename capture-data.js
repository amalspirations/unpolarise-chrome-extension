/**
 * HTTP GET request function for the facebook page
 */
function getEdit(url, done) { //, done
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  // xhr.responseType = 'text'; // document
  // xhr.overrideMimeType('text/xml');
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      var count = done(xhr.responseText);
    }
  }
  xhr.send();
  return xhr;
}

/**
 * Get the the number of page likes from a Facebook page
 */
function getNumberOfPageLikes(url, done) {
  getEdit(url, function(text) {
    var count = 0;
    var profileUrls = $(text).find('h4:contains("Friends who like this ")').siblings().find('a').map(function () {
      count += 1;
    }).get();
    // console.log("Count: " + count);
    done(count);
    return count;
  });
}

/**
 * Main code that is run when the button is pressed
 */
document.getElementById("btn-collect").addEventListener('click', () => {
  console.log("Scraping specified page...");
  var url = "https://mbasic.facebook.com/thedailyshow/socialcontext";
  var array = [];
  // Make GET request and count people on page (i.e. the number of friends who have liked)
  var test2 = getNumberOfPageLikes(url, function(count) {
    array.push(count);
  });
  console.log(array);
});
