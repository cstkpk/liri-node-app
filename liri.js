require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

console.log("LIRI is loaded");

// OMDB
if (process.argv[2] === "movie-this") {
    var movieName = "";

    for (i = 3; i < process.argv.length; i++) {
        var movieName = movieName + process.argv[i] + "+";
    }

    if (!process.argv[3]) {
        var movieName = "Mr+Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryURL);

    axios
    .get(queryURL)
    .then(function(response) {
        // console.log(response);
        console.log("Title: " + response.data.Title);
        console.log("Year produced: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Bands in Town
else if (process.argv[2] === "concert-this") {
    console.log("Bands in Town is running");
    var bandName = "";

    for (i = 3; i < process.argv.length; i++) {
        var bandName = bandName + process.argv[i] + "+";
    }

    if (!process.argv[3]) {
        var bandName = "Backstreet+Boys";
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios
    .get(queryURL)
    .then(function(response) {
        // console.log(response);
        // console.log(response.status);
        // console.log(response.data.venue.name);
        // console.log(response.data.venue.city + ", " + response.venue.country);
        // console.log(moment(response.data.datetime).format("LLL"));
        console.log(response.data);
        console.log(response.data.offers.type);
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Spotify
else if (process.argv[2] === "spotify-this-song") {
    console.log("Spotify is running");
    var songName = "";

    for (i = 3; i < process.argv.length; i++) {
        var songName = songName + process.argv[i] + "+";
    }

    if (!process.argv[3]) {
        var songName = "The+Sign";
    }
    
    spotify
    .search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}