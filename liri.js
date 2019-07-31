require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');

//var spotify = new Spotify(keys, spotify);

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