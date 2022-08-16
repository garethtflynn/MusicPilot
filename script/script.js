var MXkey = "e5af0c869b4e85411e984bc6931a21e6";
var YTkey  = "AIzaSyCdpNay1bVFASd8Cw1s_VRNpRNmtjsJ23E";
var YTkey2 = "AIzaSyABsJT9M2cE0YeNKNhK1EVlhfYteoR5unk";
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
//  search + "&key=" + {YTkey};


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: 640,
    height: 360,
    videoId: "d3x4orESCnY",
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


$(document).ready(function() {
  $.getScript("https://www.youtube.com/iframe_api", function() {
    onYouTubeIframeAPIReady();
  });
});


function SearchHandler () {
  var search = $('#userSearch').val().trim();
  console.log(search)
  var ytUrl ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ 
  search + "&key=" + YTkey2;
  console.log(ytUrl)
  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response)
    for(let i = 0; i < response.items.length; i++) {
      var titleEl = response.items[i].snippet.title;
      //var videoId = response.items[i].Id.videoId;
      var descr = response.items[i].snippet.description;
      var thumbnail = response.items[i].snippet.thumbnails.default.url;
      var channelTitle = response.items[i].snippet.channelTitle;
      //var channelId = response.items[i].snippet.channelId;

      

       var resultHTML = `
       <div>
          <ul class "p-1 text-white">
            <li>${titleEl}</li>
            <li class = "#"><img src="${thumbnail}"></li>
            <li>${descr}</li>
            <li>${channelTitle}</li>
          </ul>
        </div>`;  
    }
    resultHTML += `</div>`;
    $('#results').html(resultHTML);
  })
}

$('#searchBtn').on('click', SearchHandler);



      // var resultHTML = `
      // <div class = "">
      //   <ul class "p-1 text-white">
      //     <li>${data.items[i].snippet.title}</li>
      //     <li class = "#"><img src="${data.snippet[i].snippet.thumbnails.default}"></li>
      //     <li>${data.items[i].snippet.description;}</li>
      //     <li>${data.items[i].snippet.channelId;}</li>
      //   </ul>
      // </div>`;

