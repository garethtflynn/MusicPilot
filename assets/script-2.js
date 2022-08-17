// variables
const MXkey = "e5af0c869b4e85411e984bc6931a21e6";
const keyTwo = '94f7f3b394e8942a053cfff9527a4df7'
const musixUrl = "https://api.musixmatch.com/ws/1.1/" + MXkey;
const album = document.getElementById('album')
const artists = document.getElementById('artists')
const lyrics = document.getElementById('lyric')
const searchBtn = document.getElementById('searchBtn')
const tracks = document.getElementById('popTracks')
$('#searchBtn').click(function() {
    getTrack ()
    getArtist ()
})

function getTrack () {
  let input = document.getElementById('searchInput').value
  console.log(input)
  let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + input.split(' ').join('%20') + "&s_track_rating=desc&page_size=5&page=1&apikey=94f7f3b394e8942a053cfff9527a4df7"

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
    console.log(popTracks[0].track.track_name)
    displayTracks (popTracks)
  });
}


function getArtist () {
    const artist = document.getElementById('searchInput').value
    let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=" + artist.split(' ').join('%20') + "&page_size=5&apikey=94f7f3b394e8942a053cfff9527a4df7"
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
          // console.log(response.message.body.artist_list[0].artist.artist_id)
          let id = response.message.body.artist_list[0].artist.artist_id
          getRelatedArtists (id)
        });   
}

function getRelatedArtists (id) { 
    let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=" + id + "&page_size=2&page=1&page_size=5&apikey=94f7f3b394e8942a053cfff9527a4df7"
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
  // popTracks[0].track.track_name

  $('.popTrack1').text(popTracks[0].track.track_name)
  $('.popTrack2').text(popTracks[1].track.track_name)
  $('.popTrack3').text(popTracks[2].track.track_name)
  $('.popTrack4').text(popTracks[3].track.track_name)
  $('.popTrack5').text(popTracks[4].track.track_name)
}