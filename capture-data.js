/**
 * HTTP GET request function for the facebook page
 */
function get(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  // xhr.onreadystatechange = function (e) {
  //   if (xhr.readyState == 4) {
  //     done(xhr.responseText);
  //   }
  // }
  // If specified, responseType must be empty string or "document"
  xhr.responseType = 'document';
  // overrideMimeType() can be used to force the response to be parsed as XML
  xhr.overrideMimeType('text/xml');
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.response);
      }
    }
  };

  xhr.send();
  return xhr;
}

/**
 * Main code that is run when the button is pressed
 */
document.getElementById("btn-collect").addEventListener('click', () => {
  console.log("A");
  var url = "https://mbasic.facebook.com/thedailyshow/socialcontext";
  // getPageLikesDirect();
  var test = get(url)
  // console.log(test.responseXML());
});

/**
 * Get the page likes from a Facebook page
 */
// function getPageLikesDirect() {
//   // The url of the page whose like's we want
//   var url = "https://mbasic.facebook.com/thedailyshow/socialcontext";
//   console.log("B");
//   // GET request - jQuery.get( url [, data ] [, success ] [, dataType ] )
//   // data: A plain object or string that is sent to the server with the request.
//   get (url, function(text) {
//     console.log("C");
//     var profileUrls = $(text).find('h4:contains("Friends who like this ")').siblings().find('a').map(function () {
//       return {
//         href: $(this).attr('href'), // We want to count - not keep track of names so this can be changed
//         name: $(this).text(),
//       };
//     }).get();
//     onFetch();
//     done(profileUrls);
//   });
// }
