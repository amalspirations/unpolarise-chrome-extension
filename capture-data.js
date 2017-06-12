// Constants
var left = 1.0
var c_left = 0.25
var c_right = -0.25
var right = -1.0
// Pages
var pages = [//{name: "Syriza", source_score: left, url_component: "syrizaofficial"},
//               {name: "Melenchon", source_score: left, url_component: "JLMelenchon"},
              // {name: "Jeremy Corbyn", source_score: left, url_component: "JeremyCorbynMP"},
              // {name: "Communist Party", source_score: left, url_component: "communism101"},
              // {name: "Labour Party", source_score: c_left, url_component: "labourparty"},
              // {name: "Barack Obama", source_score: c_left, url_component: "barackobama"},
              // {name: "Bernie Sanders", source_score: c_left, url_component: "berniesanders"},
              // {name: "Hillary Clinton", source_score: c_left, url_component: "hillaryclinton"},
              // {name: "Sadiq Khan", source_score: c_left, url_component: "sadiqforlondon"},
              // {name: "Daily Show", source_score: c_left, url_component: "dailyshow"},
              // {name: "Conservative Party", source_score: c_right, url_component: "conservatives"},
              // {name: "David Cameron", source_score: c_right, url_component: "DavidCameronOfficial"},
              // {name: "Boris Johnson", source_score: c_right, url_component: "borisjohnson"},
              // {name: "Jeremy Kyle", source_score: c_right, url_component: "Jeremykyle"},
              // {name: "Marine Le Pen", source_score: right, url_component: "MarineLePen"},
              // {name: "Nigel Farage", source_score: right, url_component: "nigelfarageofficial"},
              // {name: "UKIP", source_score: right, url_component: "UKIP"},
              // {name: "BNP", source_score: right, url_component: "OfficialBritishNationalParty"},
              {name: "Donald Trump", source_score: right, url_component: "DonaldTrump"}
];

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
  pages.forEach( function(page) {
    var url = "https://mbasic.facebook.com/" + page.url_component + "/socialcontext";
    // var array = [];
    // Make GET request and count people on page (i.e. the number of friends who have liked)
    var test2 = getNumberOfPageLikes(url, function(count) {
      // array.push(count);
      pages[page.name] = count;
    });
  });
  console.log("This is the counts: " + array);
});
