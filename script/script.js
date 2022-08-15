var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
//var musixUrl = "https://api.musixmatch.com/ws/1.1/" + MXkey;
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";
//var ytUrl = "https://www.googleapis.com/youtube/v3/videos/search?q=" + YTkey
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
//  search + "&key=" + {YTkey};





function SearchHandler () {
  var search = $('#userSearch').val().trim();
  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
  search + "&key=" + YTkey;

  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    for(let i = 0; i > data.length; i++) {
      //Append stuff here
    }
  })
}







var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: 640,
    height: 360,
    videoId: "",
    playerVars: {
      'playsinline': 1,
      'controls': 1,
      'showinfo': 0,
      'showsearch': 0,
      'enablejsapi': 1,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {

}

function stopVideo() {
  player.stopVideo();
}

$('#searchBtn').on('click', SearchHandler());

$(document).ready(function() {
  $.getScript("https://www.youtube.com/iframe_api", function() {
    onYouTubeIframeAPIReady();
  });
});
