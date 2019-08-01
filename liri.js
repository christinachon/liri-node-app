require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

if (action === "concert-this") {
    var artist = process.argv[3]
    var axios = require('axios');
    var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`

    axios.get(url).then(function (result) {
        for (var i=0; i < result.data.length; i ++){
        console.log("Venue Name: " + result.data[i]["venue"]["name"])
        console.log("City: " + result.data[i]["venue"]["city"] + ", " + result.data[i]["venue"]["country"])
        console.log("Date: " + moment(result.data[i]["datetime"]).format("MMM D, YYYY"))
        console.log("----")
        }

    })
}

if (action === "spotify-this-song"){
    var song = process.argv[3];

    spotify.search({ type: 'track', query: song, limit:5}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        for (var i=0; i < data.tracks.items.length; i++){
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("----")
        }
       
      });
}