require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var keys = require("./keys.js");
// console.log(keys.spotify);

var spotify = new Spotify(keys.spotify);

// Variable to hold the user's search input
var userSearch = "";
for (i = 3; i < process.argv.length; i++) {
    // userSearch = userSearch + process.argv[i] + "+";
    if (i > 3 && i < process.argv.length) {
        userSearch = userSearch + "+" + process.argv[i];
      } else {
        userSearch += process.argv[i];
      }
}

// OMDB function
function omdbRun(userSearch) {

    var queryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    console.log(queryURL);

    axios
    .get(queryURL)
    .then(function(response) {
      var movieArr = [
        "Title: " + response.data.Title,
        "Year produced: " + response.data.Year,
        "IMDB rating: " + response.data.imdbRating,
        "Rotten Tomatoes rating: " + response.data.Ratings[1].Value,
        "Country produced: " + response.data.Country,
        "Language: " + response.data.Language,
        "Plot: " + response.data.Plot,
        "Actors: " + response.data.Actors,
        "--------------------------\n"
      ].join("\n");
      fs.appendFile("log.txt", movieArr, function(err) {
        if (err) {
            console.log(err);
        }
        // else {
        //     console.log("Content added!");
        // }
      });
      console.log(movieArr);
    })
    .catch(function(err) {
        console.log(err);
        console.log("Whoops! Looks like there was a problem with your search. Please try another!");
        console.log("--------------------------");
    });
};

// Bands in Town function
function bandsRun(userSearch) {

    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios
    .get(queryURL)
    .then(function(response) {
      var bandsArr = [
        "Venue: " + response.data[0].venue.name,
        "Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.country,
        "Time of concert: " + moment(response.data[0].datetime).format("LLL"),
        "--------------------------\n"
      ].join("\n");
      fs.appendFile("log.txt", bandsArr, function(err) {
        if (err) {
            console.log(err);
        }
        // else {
        //     console.log("Content added!");
        // }
      });
    console.log(bandsArr);
    })
    .catch(function(err) {
        console.log(err);
        console.log("Whoops! Looks like that band doesn't have any concerts coming up. Please try another!");
        console.log("--------------------------");
    });
};

// Spotify function
function spotifyRun(pancakes) {
    
    spotify
    .search({ type: 'track', query: pancakes, limit: 1 })
    .then(function(response) {
     var spotifyArr = [   
      "Artist name: " + response.tracks.items[0].album.artists[0].name,
      "Song name: " + response.tracks.items[0].name,
      "Album name: " + response.tracks.items[0].album.name,
      "Preview link: " + response.tracks.items[0].album.artists[0].external_urls.spotify,
      "--------------------------\n"
     ].join("\n");
     fs.appendFile("log.txt", spotifyArr, function(err) {
        if (err) {
            console.log(err);
        }
        // else {
        //     console.log("Content added!");
        // }
      });
    console.log(spotifyArr);
    })
    .catch(function(err) {
      console.log(err);
      console.log("Whoops! Looks like there was a problem with your search. Please try another!");
      console.log("--------------------------");
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
else if (!process.argv[2] || process.argv[2] === "help") {
    console.log("Welcome to LIRI Bot! \nI can do the following functions for you: \nType 'movie-this' followed by the name of a movie for information about that movie. \nType 'concert-this' followed by the name of a band to find information about the next concert that band is playing. \nType 'spotify-this-song' followed by the name of a song for information about that song. \nOr, type 'do-what-it-says' for a mystery search!");
    console.log("--------------------------");
}
else {
    console.log("Please enter a valid command! \nOr, type 'help' for the menu of commands.");
    console.log("--------------------------");
};