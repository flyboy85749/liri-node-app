require("dotenv").config();

// need for later use
var fs = require("fs");

// require our keys file
var keys = require("./keys.js");

// make sure we have axios
var axios = require("axios");

// bring in omdb
// var omdb = require('omdb');

// const newLocal = new Omdb(keys.omdb);
// var omdb = newLocal;

// add bands in town
var bandsintown = require('bandsintown');

// First, let's work on the spotify info
var Spotify = require('node-spotify-api').default;

// need credentials
var spotify = new Spotify(keys.spotify);

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
spotifyThis();

var doWhatItSays = function () {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;

    var dataArr = data.split(',');

    if (dataArr.length == 2) {
      choice(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      choice(dataArr[0]);
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
    case 'concert-this':
      concertThis(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
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


// function movieThis() {
//   var movieName = process.argv[3];
//   axios.get("http://www.omdbapi.com/?apikey= " + omdb + "&t=" + movieName).then(
//     function (response) {
//       // If the axios was successful...
//       // Then log the body from the site!
//       var movies = response.data;

//       for (let i = 1; i < movies.length; i++) {
//         console.log(i);
//         console.log(`Movie Name: ${movies[i].Title}`);
//         console.log(`Year Relesed: ${movies[i].Released}`);
//         console.log(`Rated: ${movies[i].Rating}`);
//         console.log(`Poster: ${movies[i].Poster}`);
//         console.log("*******************************************************************************************");
//       }

//     },

//     function (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     })

// }
// movieThis();

// function concertThis() {
//   var artist = process.argv[3];

//   axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
//     function (response) {
//       var concert = response.data;

//       for (let i = 1; i < concert.length; i++) {
//         console.log(i);
//       console.log(`${artist} will be playing at: 
//       ${concert[i].venue.name}, 
//       in ${concert[i].venue.city}, 
//       ${concert[i].venue.region} on ${concert[i].datetime}
//       ********************************************`);
//       }

//       // console.log(concert.venue.datetime);
//       // }
//       // console.log(response.venue.region);
//     },
//     function (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     });
// }
// concertThis();
