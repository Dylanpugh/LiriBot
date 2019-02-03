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
        console.log("Artist: " + response.tracks.items[0].artists[0].name + "\nName of Song: " + response.tracks.items[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nURL: " + response.tracjs.items[0].preview_url + divider);
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
        console.log("Movie Title: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes: " +response.data.Ratings[2].Value + "\nCountry: " + response.data.Country + "\nSummary: " + response.data.Plot + "\nActors/Actresses: " + response.data.Actors);

    });
}

if(command === "concert-this") {
    if(!item) {
        item = "Blink-182";
    }

    axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            console.log("Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\nDate: " + moment(response.data[i].datetime).format("LLLL") + divider);
        }
    })
}