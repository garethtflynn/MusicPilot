var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
//var musixUrl = "https://api.musixmatch.com/ws/1.1/" + MXkey;
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";

var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: 640,
    height: 360,
    playerVars: {
      'playsinline': 1,
      'autoplay': 1,
      'controls': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,

    }
  });
}
function onPlayerReady(event) {
  event.setVolume(100);
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}

function stopVideo() {
  player.stopVideo();
}

