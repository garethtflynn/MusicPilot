var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";
var YTkey2 = "AIzaSyABsJT9M2cE0YeNKNhK1EVlhfYteoR5unk";
var YTkey3 = "AIzaSyAfmhJPjuQ9Bx4x6ayWP7wbCmYlzxE6Uj8";
search = "";
VideoId="";
var resultUrl = "./SearchResults.html";
var player = $('#player');
var results = $('#results');
//  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
//  search + "&key=" + {YTkey};

var player;
function onYouTubeIframeAPIReady() {
  player = new window.YT.Player('player', {
    width: 480,
    height: 360,
    // loadPlaylist:{
    //   listType: "playlist",
    //   list: "",
    // },
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

function onPlayerStateChange(event) {

}



function stopVideo() {
  player.stopVideo();
}


// $(document).ready(function() {
//   $.getScript("https://www.youtube.com/iframe_api", function() {
//     onYouTubeIframeAPIReady();
//   });
// });


function SearchHandler () {
  var search = $('#userSearch').val().trim();
  console.log(search)
  var ytUrl="https://www.googleapis.com/youtube/v3/search?part=snippet&q="
  +search+"&key="+YTkey3;
  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
         var VideoId = data.items[0].id.videoId;

          console.log(VideoId);
          player.loadVideoById(VideoId);

  })
}


function onPlayerReady(event) {
  // event.target.loadPlaylist()
  event.target.playVideo();
};

$('#searchBtn').on('click', SearchHandler);
        // var titleEl = data.items[i].snippet.title;
        // var descr = data.items[i].snippet.description;
        // var thumbnail = data.items[i].snippet.thumbnails.medium.url;
        // var channelTitle = data.items[i].snippet.channelTitle;
        //var channelId = data.items[i].snippet.channelId;
        //  var resultHTML=`
        //    <div class="p-2">
        //     <h2 class="bg-stone-600 text-3xl text-white">${titleEl}</h2>
        //       <ul class="p-1 bg-slate-300 text-black text-lg">
        //          <li class = "#"><img src="${thumbnail}"></li>
        //          <span>${descr}</span>
        //          <li>${channelTitle}</li>
        //       </ul>
        //    </div>`;
        //    resultHTML+=`</div>`;
        //    $('#results').append(resultHTML)