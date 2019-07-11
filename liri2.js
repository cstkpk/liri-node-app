require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var keys = require("./keys.js");
// console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

// console.log("LIRI is loaded");

// Variable to hold the user's search input
var userSearch = "";
for (i = 3; i < process.argv.length; i++) {
    userSearch = userSearch + process.argv[i] + "+";
}

// OMDB function
function omdbRun(userSearch) {

    var queryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
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
        console.log("--------------------------");
    })
    .catch(function(err) {
        console.log(err);
    });
};

// Bands in Town function
function bandsRun(userSearch) {

    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
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
        console.log("--------------------------");
    })
    .catch(function(err) {
        console.log(err);
    });
};

// Spotify function
function spotifyRun(userSearch) {
    
    spotify
    .search({ type: 'track', query: userSearch, limit: 1 })
    .then(function(response) {
    //   console.log(response);
    //   console.log(JSON.stringify(response.tracks.items[0], null, 2)); 
      console.log("Artist name: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song name: " + response.tracks.items[0].name);
      console.log("Album name: " + response.tracks.items[0].album.name);
      console.log("Preview link: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
      console.log("--------------------------");
    })
    .catch(function(err) {
      console.log(err);
    });
};

// Do What It Says function
function whatRun() {

fs.readFile("random.txt", "utf-8", (err, random) => {
    if (err) throw err;
    console.log(random);

    var randomArr = random.split(",");
    console.log(randomArr);
    var command = randomArr[0];
    var item = randomArr[1];
    
    if (command === "movie-this") {
        omdbRun(item);
    }
    else if (command === "concert-this") {
        bandsRun(item);
    }
    else if (command === "spotify-this-song") {
        spotifyRun(item);
    }

  });
};

// Conditional statements for user's argv[2] to run the correspondng function
if (process.argv[2] === "movie-this") {
    if (userSearch) {
        omdbRun(userSearch);
    }
    else if (!userSearch) {
        userSearch = "Mr+Nobody";
        console.log("Whoops! You forgot to choose a movie. We're searching Mr. Nobody for you.");
        omdbRun(userSearch); 
    }
}
else if (process.argv[2] === "concert-this") {
    if (userSearch) {
        bandsRun(userSearch);
    }
    else if (!userSearch) {
        userSearch = "Backstreet+Boys";
        console.log("Whoops! You forgot to choose a song. We're searching Backstreet Boys for you.");
        bandsRun(userSearch);
    }
}
else if (process.argv[2] === "spotify-this-song") {
    if (userSearch) {
        spotifyRun(userSearch);
    }
    else if (!userSearch) {
        userSearch = "The+Sign";
        console.log("Whoops! You forgot to choose a song. We're searching The Sign for you.");
        spotifyRun(userSearch);
    }
}
else if (process.argv[2] === "do-what-it-says") {
    whatRun();
}
else {
    console.log("Please enter a valid command!");
};