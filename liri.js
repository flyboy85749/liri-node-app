/***********************************************/
/***************** REQUIRED *******************/
/***********************************************/
require("dotenv").config();

// require our keys file
var keys = require("./keys.js");

// First, let's work on the spotify info
var Spotify = require('node-spotify-api');

// need credentials
var spotify = new Spotify(keys.spotify);

// make sure we have axios
var axios = require("axios");

// bring in omdb
// var omdb = require('omdb');

// const newLocal = new Omdb(keys.omdb);
// var omdb = newLocal;

// add bands in town
var bandsintown = require('bandsintown');

// need for later use
var fs = require("fs");

/***********************************************/
/***************** VARIABLES*******************/
/***********************************************/


















/***********************************************/
/***************** FUNCTIONS *******************/
/***********************************************/

/********************SPOTIFY CODE *************/

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
      default: console.log("LIRI Doesn't Recognize That");
    }
  }

  // make it so, number 2
var run = function (arg1, arg2) {

  // call choice and pass in user input
    choice(arg1, arg2);
  }
  
  // capture user input. 
  run(process.argv[2], process.argv[3]);

  /**************END SPOTIFY CODE ***********/

  /************** MOVIE THIS CODE  **********/



















/***********************************************/
/***************** PROCESSES *******************/
/***********************************************/