// variables
const MXkey = "e5af0c869b4e85411e984bc6931a21e6";
const keytwo = '94f7f3b394e8942a053cfff9527a4df7'
var musixUrl = "https://api.musixmatch.com/ws/1.1/" + MXkey;
const album = document.getElementById('album')
const artists = document.getElementById('artists')
const lyrics = document.getElementById('lyric')
const searchBtn = document.getElementById('searchBtn')

$('#searchBtn').click(function() {
    getTrack ()
})

function getTrack () {
  let input = document.getElementById('searchInput').value
  let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q=" + input.split(' ').join('%20') + "&s_track_rating&page_size=5&page=1&s_track_rating=asc&apikey=94f7f3b394e8942a053cfff9527a4df7"

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
    getArtist (response)
  });
}

// function getArtist () {
//     let artist = document.getElementById('searchInput').value
//     let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=" + artist.split(' ').join('%20') + "&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6"
//     fetch(requestUrl,{
//         cache: 'reload',
//         method: "GET",
//         headers: {
//         "Content-Type": "application/json",
//         },
//         }
//       )
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (response) {
//           console.log(response);
//           // console.log(response.message.body.artist_list[0].artist.artist_id)
//           var id = response.message.body.artist_list[0].artist.artist_id
//           getRelatedArtists (id)
//         });
        
// }

// function getRelatedArtists (id) { 
//     var requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.related.get?artist_id=" + id + "&page_size=2&page=1&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6"
//         fetch(requestUrl,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (response) {
//         console.log(response);
//         displayData(response)
//         getTrack(id)
//       });
// }

// function displayData (response) {

//     $('.artistList1').text(response.message.body.artist_list[0].artist.artist_name)
//     $('.artistList2').text(response.message.body.artist_list[1].artist.artist_name)
//     $('.artistList3').text(response.message.body.artist_list[2].artist.artist_name)
//     $('.artistList4').text(response.message.body.artist_list[3].artist.artist_name)
//     $('.artistList5').text(response.message.body.artist_list[4].artist.artist_name) 
    
// }









// function getAlbum () {

//     const album = document.getElementById('searchInput').value
//     let requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_album=" + album + "&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6"
//     fetch(requestUrl,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (response) {
//         console.log(response);
//       });
// } 