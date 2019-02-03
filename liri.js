require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var item = process.argv[3];
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

if(command === "spotify-this-song") {
    if(!item) {
        item = "First Date";
    }

    var divider = "\n------------------------------------\n";

    spotify.search({type: "track", query: item})
    .then(function(response) {
        var song = "Artist: " + response.tracks.items[0].artists[0].name + "\nName of Song: " + response.tracks.items[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nURL: " + response.tracjs.items[0].preview_url + divider;
        console.log(song);

        writeToLog(song);

    }).catch(function(err) {
        console.log(err);
    });
}

if(command === "movie-this") {
    if(!item) {
        item = "Avengers";
    }

    axios.get("http://www.omdbapi.com/?t=" + item + "&y=&plot+short&apikey=trilogy")
    .then(function(response) {
        var movie = "Movie Title: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes: " +response.data.Ratings[2].Value + "\nCountry: " + response.data.Country + "\nSummary: " + response.data.Plot + "\nActors/Actresses: " + response.data.Actors;
        console.log(movie);

        writeToLog(movie);

    });
}

if(command === "concert-this") {
    if(!item) {
        item = "Blink-182";
    }

    axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            var concert = "Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\nDate: " + moment(response.data[i].datetime).format("LLLL") + divider
            console.log(concert);

            writeToLog(concert);
            
        }
    });
}

if(command === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(error, data) {

        if(error) {
            return console.log(error);
        }

        var array = data.split(",");

        name = array[1]

        spotify.search({type: "track", query: name, limit: 1}, function(err, data) {
            if(err) {
                return console.log("Error ocurred: " + err);
            }

            var track = data.tracks.items[0];

            var randSong = "Song Title: " + name + "\nArtist: " + track.artists[0].name + "\nAlbum: " + track.album.name + "\nLink: " + track.preview_url + divider;

            console.log(randSong);

            writeToLog(randSong);

        })

    })
}

function writeToLog(printInfo) {
	fs.appendFile("log.txt", printInfo, function(err) {

		// If the code experiences any errors it will log the error to the console.
		if (err) {
			return console.log(err);
		}

	})}