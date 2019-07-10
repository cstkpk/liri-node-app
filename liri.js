require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

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
        // var bandName = bandName + process.argv[i] + "+";
        if (i > 3 && i < process.argv.length) {
            bandName = bandName + "+" + process.argv[i];
          } else {
            bandName += process.argv[i];
          }
    }

    if (!process.argv[3]) {
        bandName = "Backstreet+Boys";
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios
    .get(queryURL)
    .then(function(response) {
        // console.log(response);
        // console.log(response.status);
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log("Time of concert: " + moment(response.data[0].datetime).format("LLL"));
        // console.log(response.data);
        // console.log(response.data[0]);
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
        songName = songName + process.argv[i] + "+";
    }

    if (!process.argv[3]) {
        songName = "The+Sign";
    }
    
    spotify
    .search({ type: 'track', query: songName, limit: 1 })
    .then(function(response) {
    //   console.log(response);
      console.log(JSON.stringify(response.tracks.items[0], null, 2)); 
      console.log("Artist name: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song name: " + response.tracks.items[0].name);
      console.log("Album name: " + response.tracks.items[0].album.name);
      console.log("Preview link: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// fs
else if (process.argv[2] === "do-what-it-says") {
    console.log("Do what it says is running");


fs.readFile("random.txt", "utf-8", (err, random) => {
    if (err) throw err;
    console.log(random);

    var randomArr = random.split(",");
    console.log(randomArr);
    var command = randomArr[0];
    var item = randomArr[1];
    

  });
};