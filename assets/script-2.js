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
const YTkey3 = "AIzaSyCyrinmXCmS7D1f9QIrL2Cfnt-0B3pCgfY";

//click function sets everythign off
$('#searchBtn').click(function() {
    getTrack (), SearchHandler()
})
//meessage display that instructs user on how and what to search
function displayMessage() {
  let wordCount = 0;
  let msgInterval = setInterval(function () {
    if (words[wordCount] === undefined) {

      clearInterval(msgInterval);
    } else {

      messageArea.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}

// first API fetch that gets ID and track data that is used in the next requests
function getTrack () {
  let input = document.getElementById('searchInput').value
  console.log(input)
  let requestUrl = "https://us-central1-tri-auto-pub-zoom.cloudfunctions.net/krogerHack/musicxmatch/track-search?q_track_artist=" + input.split(' ').join('%20') + "&s_track_rating=desc&page_size=5&page=1&apikey=e5af0c869b4e85411e984bc6931a21e6"

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
    selectLyric (popTracks, id)
    getRelatedArtists (id)
  });
}

// select lyric funtion takes the popular track name and artist name from the original fetch call and uses that to get the lyrics from the searched song
function selectLyric(popTracks, id) { 
  let requestUrl="https://us-central1-tri-auto-pub-zoom.cloudfunctions.net/krogerHack/musicxmatch/matcher-lyrics-get?q_track=" + popTracks[0].track.track_name +"&q_artist="+ id[0].track.artist_name +"&apikey=e5af0c869b4e85411e984bc6931a21e6"

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
    let lyrics = response.message.body.lyrics.lyrics_body
    displayLyrics (lyrics)
  });
} 

// this gets the related artists with the data from the first 'getTrack; function 
function getRelatedArtists (id) { 
    let requestUrl = "https://us-central1-tri-auto-pub-zoom.cloudfunctions.net/krogerHack/musicxmatch/artist-related-get?artist_id=" + id[0].track.artist_id + "&page=1&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6"
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

// displays top 5 related artists to who we searched
function displayData (response) {
  artists.classList.remove('hide')
    $('.artistList1').text(response.message.body.artist_list[0].artist.artist_name)
    $('.artistList2').text(response.message.body.artist_list[1].artist.artist_name)
    $('.artistList3').text(response.message.body.artist_list[2].artist.artist_name)
    $('.artistList4').text(response.message.body.artist_list[3].artist.artist_name)
    $('.artistList5').text(response.message.body.artist_list[4].artist.artist_name)    
}

// displays the top bit for what song we searched
function displayTracks (popTracks) {
  tracks.classList.remove('hide')
  $('.popTrack1').text(popTracks[0].track.track_name)
  $('.popTrack2').text(popTracks[1].track.track_name)
  $('.popTrack3').text(popTracks[2].track.track_name)
  $('.popTrack4').text(popTracks[3].track.track_name)
  $('.popTrack5').text(popTracks[4].track.track_name)
}

// displays lyrics to what song we searched in the designated area
function displayLyrics (lyrics) {
  $('#lyricdisplay').text(lyrics)
}

// calls the display message function
displayMessage ()

// clickable feature to save artists in a designated area for future reference and discover
$('#artistList').click(function (event){

  console.log(event.target.textContent)
  if (!favoritesStored.includes(event.target.textContent)) {
    favoritesStored.push(event.target.textContent)
    localStorage.setItem('savedFavorites', JSON.stringify(favoritesStored))
  } 
  })
  
  // appends favorites list onto the document 
  function showFavorites () {
    var favoritesList = JSON.parse(localStorage.getItem  ('savedFavorites'))
    var list = document.getElementById('savedData')
      for (i = 0; i < favoritesList.length; i++){
      $('#savedData').each(function(){
        var createItem = document.createElement('li')
        createItem.textContent = favoritesList[i]
        list.append(createItem);
      })
      }   
    }
//asynchronysly loads the player; don't know what asynchronys means.


var player;
function onYouTubeIframeAPIReady() {
  player = new window.YT.Player('player', {
    width: '100%',
    height: 560,
    playervars :{enablejsapi: 1},
    // ^ enables the external buttons.
    videoId:'Abrn8aVQ76Q',

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
//effects the state (external buttons)
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
  var ytUrl="https://www.googleapis.com/youtube/v3/search?part=snippet"
  +"&type=video"+"&regionCode=us"+"&videoSyndicated=true"+"&q="+search+"&key="+YTkey3;
  fetch(ytUrl)
  .then(function(response) {
    return response.json();
  })//selects the top search result to shove into the player.
  .then(function(data) {
         var VideoId = data.items[0].id.videoId;
          console.log(VideoId);
          player.cueVideoById(VideoId);
          player.loadVideoById(VideoId);
  })
}

//plays the video.
 function onPlayerReady(event) {
  event.target.playVideo()
}
showFavorites();
