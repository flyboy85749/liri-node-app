// require our keys file
var keys = require("./keys.js");

// make sure we have axios
var axios = require("axios");

// First, let's work on the spotify info
var Spotify = require('node-spotify-api');

// need credentials
var spotify = new Spotify({
  id: '20fb3a4b2d444377bc3025117cf7fc1d',
  secret: 'ac337dafc1a249b7aa4da9b803f9ff39'
});

// pretty self explanatory. 
let artistName = function (artist) {
  return artist.name;
}

// pass the song name entered by user into the search function
let spotifyThis = function (songName) {
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // This all the information we want to display
    var songs = data.tracks.items;

    for (let i = 1; i < songs.length; i++) {
      console.log(i);
      console.log(`artist(s): ${songs[i].artists.map(artistName)}`);
      console.log(`song name: ${songs[i].name}`);
      console.log(`album: ${songs[i].album.name}`);
      console.log(`song preview: ${songs[i].preview_url}`);
      console.log("*******************************************************************************************");
    }
  });
}

// set up a switch statement to manage user choices
var choice = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      spotifyThis(functionData);
      break;
    case 'movie-this':
      movieThis(functionData);
      break;
    default: console.log("LIRI Doesn't Recognize That");
  }
}

// make it so, number 2
var run = function (arg1, arg2) {
  choice(arg1, arg2);
}

// capture user input. 
run(process.argv[2], process.argv[3]);



// 3. To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

//    * [Axios](https://www.npmjs.com/package/axios)

//      * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

//    * [Moment](https://www.npmjs.com/package/moment)

//    * [DotEnv](https://www.npmjs.com/package/dotenv)
const API_KEY = '1abe8770';
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
function movieThis() {
  axios.get("http://www.omdbapi.com/?apikey=1abe8770&t=secondhand+lions").then(
    function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(response.data);

  // for (let i = 1; i < movies.length; i++) {
  //   console.log(i);
  //   console.log(`Movie Name: ${movies[i].Title}`);
  //   console.log(`Year Relesed: ${movies[i].Released}`);
  //   console.log(`Rated: ${movies[i].Rating}`);
  //   console.log(`Poster: ${movies[i].Poster}`);
  //   console.log("*******************************************************************************************");
  // }

    },

    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    })

  




}
movieThis();
