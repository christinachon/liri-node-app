require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

switch (action) {
    case "concert-this":
        var artist = process.argv[3]
        concert();
        break;

    case "spotify-this-song":
        var song = process.argv[3];
        spotifyThis();
        break;

    case "movie-this":
        var movie = process.argv[3]
        movie();
        break;

    case "do-what-it-says":
        fs.readFile('random.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var action = data.split(",");
            console.log(action[0]);
            if (action[0] === "concert-this") {
                var artist = action[1];
                var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
                axios.get(url).then(function (result) {
                    for (var i = 0; i < result.data.length; i++) {
                        console.log("Venue Name: " + result.data[i]["venue"]["name"])
                        console.log("City: " + result.data[i]["venue"]["city"] + ", " + result.data[i]["venue"]["country"])
                        console.log("Date: " + moment(result.data[i]["datetime"]).format("MMM D, YYYY"))
                        console.log("----")
                    }
                })
            } else if (action[0] === "spotify-this-song") {
                var song = action[1];
                spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    };
                    for (var i = 0; i < data.tracks.items.length; i++) {
                        console.log("Artist: " + data.tracks.items[i].artists[0].name);
                        console.log("Song Name: " + data.tracks.items[i].name);
                        console.log("Album Name: " + data.tracks.items[i].album.name);
                        console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
                        console.log("----")
                    }
                });
            } else if (action[0] === "movie-this") {
                var movie = action[1];
                var url = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`
                axios.get(url).then(function (result) {
                    console.log("Title: " + result.data.Title);
                    console.log("Year Released: " + result.data.Year);
                    console.log("IMDB Rating: " + result.data.Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: " + result.data.Ratings[1].Value);
                    console.log("Country: " + result.data.Country);
                    console.log("Language: " + result.data.Language);
                    console.log("Plot: " + result.data.Plot);
                    console.log("Actors: " + result.data.Actors);
                })
            }
        })
        break;
}

function concert() {
    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    axios.get(url).then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
            console.log("Venue Name: " + result.data[i]["venue"]["name"])
            console.log("City: " + result.data[i]["venue"]["city"] + ", " + result.data[i]["venue"]["country"])
            console.log("Date: " + moment(result.data[i]["datetime"]).format("MMM D, YYYY"))
            console.log("----")
        }
    })
}

function spotifyThis() {
    if (song === undefined) {
        song = "the sign ace of base";
    }
    spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("----")
        }
    });
}

function movie() {
    if (movie === undefined) {
        movie = "mr nobody";
    }
    var url = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`
    axios.get(url).then(function (result) {
        console.log("Title: " + result.data.Title);
        console.log("Year Released: " + result.data.Year);
        console.log("IMDB Rating: " + result.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + result.data.Ratings[1].Value);
        console.log("Country: " + result.data.Country);
        console.log("Language: " + result.data.Language);
        console.log("Plot: " + result.data.Plot);
        console.log("Actors: " + result.data.Actors);
    })
}