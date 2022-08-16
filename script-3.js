//var repoList = document.querySelector('ul');
var Lyric = document.getElementById('lyricSearch');
var myApiKey = "e5af0c869b4e85411e984bc6931a21e6"; 
var searchButton = document.getElementById('searchBtn');

//getApi function is called when the fetchButton is clicked

function searchTrack() {
  // Insert the API url to get a list of your repos
  var requestUrl = "https://api.musixmatch.com/ws/1.1/artist.search?q_artist=prodigy&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6";

  // fetch(requestUrl,{mode: 'cors'})
  //   .then(function (response) { 
  //     console.log(response.json);
  //     return response.json();
  //   })
  //  // .then(function (data) {
  //     //looping over the fetch response and inserting the URL of your repos into a list
  //    // for (var i = 0; i < data.length; i++) {
  //       //Create a list element
  //      // var listItem = document.createElement('li');

  //       //Set the text of the list element to the JSON response's .html_url property
  //       listItem.textContent = data[i].html_url;

  //       //Append the li element to the id associated with the ul element.
  //       repoList.appendChild(listItem);
  //     }
   // });
  //  var requestUrl = 'https://api.github.com/users/octocat/repos';

  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=beyonce&page_size=5&apikey=e5af0c869b4e85411e984bc6931a21e6",
    {
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
    }); 
    
  }

fetchButton.addEventListener('click', searchTrack); 

function selectLyric() { 
  var yourTrack = document.getElementById("selectTrack").value
  var artist = document.getElementById("yourArtist").value
  var requestUrl="https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=" + yourTrack + "&q_artist&apikey=e5af0c869b4e85411e984bc6931a21e6",
    
      fetch(requestUrl, 
    {
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
    }); 
    

} 
searchButton.addEventListener('click', selectLyric); 
















