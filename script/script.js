var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";
var YTkey2 = "AIzaSyABsJT9M2cE0YeNKNhK1EVlhfYteoR5unk";
search = "";
var resultUrl = "./SearchResults.html";
var player = $('#player');
var results = $('#results');
//  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
//  search + "&key=" + {YTkey};


var player= $('#player');
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: 480,
    height: 360,
    videoId: 'AdwkPTNnpA0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
}

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {
  player.loadVideoById();
  event.target.playVideo();
};


function onPlayerStateChange(event) {

}

function playVideo (player) {

}

function stopVideo() {
  player.stopVideo();
}


// $(document).ready(function() {
//   $.getScript("https://www.youtube.com/iframe_api", function() {
//     onYouTubeIframeAPIReady();
//   });
// });


function SearchHandler (event) {
  event.preventDefault();
  var search = $('#userSearch').val().trim();
  console.log(search)
  var ytUrl="https://www.googleapis.com/youtube/v3/search?part=snippet&q="
  +search+"&key="+YTkey;
  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (let i=0; i < data.items.length; i++) {
      $('#results').each(function() {
        var titleEl = data.items[i].snippet.title;
        var VideoId = data.items[i].id.videoId;
        var descr = data.items[i].snippet.description;
        var thumbnail = data.items[i].snippet.thumbnails.medium.url;
        var channelTitle = data.items[i].snippet.channelTitle;
        //var channelId = data.items[i].snippet.channelId;
        console.log(VideoId)
         var resultHTML=`
           <div class="p-2">
            <h2 class="bg-stone-600 text-white">${titleEl}</h2>
              <ul class="p-1 bg-slate-300 text-black">
                 <li class = "#"><img src="${thumbnail}"></li>
                 <span>${descr}</span>
                 <li>${channelTitle}</li>
              </ul>
           </div>`;
           resultHTML+=`</div>`;
           $('#results').append(resultHTML)
        })
      }
    })
}


$('#searchBtn').on('click', SearchHandler,);

