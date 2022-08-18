// variables
const keyOne = "e5af0c869b4e85411e984bc6931a21e6";
const keyTwo = '94f7f3b394e8942a053cfff9527a4df7'
const musixUrl = "https://api.musixmatch.com/ws/1.1/" + keyOne || keyTwo;
const album = document.getElementById('album')
const artists = document.getElementById('artists')
const lyrics = document.getElementById('lyric')
const searchBtn = document.getElementById('searchBtn')
const tracks = document.getElementById('popTracks')
const messageArea = document.getElementById('message')
const saved = document.getElementById('savedData')
var favoritesStored = JSON.parse(localStorage.getItem('savedFavorites')) || [] 
let message = 'search by artist and song name'
let words = message.split(' ');
const YTkey3 = "AIzaSyAfmhJPjuQ9Bx4x6ayWP7wbCmYlzxE6Uj8";

$('#searchBtn').click(function() {
    getTrack (), SearchHandler()
})

function displayMessage() {
  let wordCount = 0;
  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  let msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (words[wordCount] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      messageArea.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

function getTrack () {
  let input = document.getElementById('searchInput').value
  console.log(input)
  let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + input.split(' ').join('%20') + "&s_track_rating=desc&page_size=5&page=1&apikey=e5af0c869b4e85411e984bc6931a21e6"

  fetch(requestUrl,{
    cache: 'reload',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    let popTracks = response.message.body.track_list
    let id = response.message.body.track_list
    console.log(popTracks[0].track.track_name)
    console.log(id[0].track.artist_id)
    displayTracks (popTracks)
    getRelatedArtists (id)
  });
}

function getRelatedArtists (id) { 
    let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=" + id[0].track.artist_id + "&page_size=2&page=1&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6"
        fetch(requestUrl,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response);
        displayData(response)
      });
}

function displayData (response) {
  artists.classList.remove('hide')
    $('.artistList1').text(response.message.body.artist_list[0].artist.artist_name)
    $('.artistList2').text(response.message.body.artist_list[1].artist.artist_name)
    $('.artistList3').text(response.message.body.artist_list[2].artist.artist_name)
    $('.artistList4').text(response.message.body.artist_list[3].artist.artist_name)
    $('.artistList5').text(response.message.body.artist_list[4].artist.artist_name)    
}

function displayTracks (popTracks) {
  tracks.classList.remove('hide')
  $('.popTrack1').text(popTracks[0].track.track_name)
}

displayMessage ()

$('#artistList').click(function (event){

console.log(event.target.textContent)
if (!favoritesStored.includes(event.target.textContent)) {
  favoritesStored.push(event.target.textContent)
  localStorage.setItem('savedFavorites', JSON.stringify(favoritesStored))
} 
})

function showFavorites () {
  var favoritesList = JSON.parse(localStorage.getItem  ('savedFavorites'))
  var listItem = document.getElementById('savedData')
  for (i = 0; i < favoritesList.length; i++){
    var createItem = document.createElement('list')
    createItem.classList.add
    createItem.textContent = favoritesList[i]


  }
}

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
  var search = $('#searchInput').val();
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

