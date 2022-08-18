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

$('#searchBtn').click(function() {
    getTrack ()
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
    selectLyric (popTracks, id)
    getRelatedArtists (id)
  });
}

function selectLyric(popTracks, id) { 
  let requestUrl="https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=" + popTracks[0].track.track_name +"&q_artist="+ id[0].track.artist_name +"&apikey=e5af0c869b4e85411e984bc6931a21e6"

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

function displayLyrics (lyrics) {
  $('#lyricdisplay').text(lyrics)

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
    createItem.classList.add('savedData')
    createItem.textContent = favoritesList[i]
  }
}