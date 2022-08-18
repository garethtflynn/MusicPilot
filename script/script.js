var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";
var YTkey2 = "AIzaSyABsJT9M2cE0YeNKNhK1EVlhfYteoR5unk";
var YTkey3 = "AIzaSyAfmhJPjuQ9Bx4x6ayWP7wbCmYlzxE6Uj8";

//var play=$('#playBtn');
var pause=$('#pauseBtn');
var play=$('#playBtn');

search = "";
VideoId="";


//asynchronysly loads the player; don't know what asynchronus means.
var player;
function onYouTubeIframeAPIReady() {
  player = new window.YT.Player('player', {

    width: 480,
    height: 360,
    videoId:'EDE-wuSTbPM',
    playervars :{enablejsapi: 1},

    width: 0,
    height: 0,
    videoId:'gwlNun99fKk',

    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
}
//more of the asynchronus stuff the google demi-gods sent.
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//effects the state
function onPlayerStateChange(event) {
  $('#playBtn').on('click',function(){
    if (event.data !== YT.PlayerState.PLAYING){
      $('#playBtn').on('click',player.playVideo())
    } else return;
  })
  $('#pauseBtn').on('click',function(){
    if (event.data == YT.PlayerState.PLAYING){
      $('#pauseBtn').on('click',player.pauseVideo())
    } else return;
  })
}

//stops the player I don't call this anywhere.
//stops the player.
function stopVideo() {
  player.stopVideo();
}

//takes the search input and plays the first result.
function SearchHandler () {
  var search = $('#userSearch').val().trim();
  console.log(search)
  var ytUrl="https://www.googleapis.com/youtube/v3/search?part=snippet&q="
  +search+"&type=video"+"&videoEmbeddable=true"+"&key="+YTkey3;
  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })//selects the top search result to shove into the player.
  .then(function(data) {
         var VideoId = data.items[0].id.videoId;
          console.log(VideoId);
          player.loadVideoById(VideoId);
  })
}

//plays the video.
 function onPlayerReady(event) {
  event.target.playVideo();
};

$('#searchBtn').on('click', SearchHandler);
