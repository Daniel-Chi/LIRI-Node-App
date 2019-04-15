//node and keys module setup
require("dotenv").config();
let keys = require("./keys");
let axios = require("axios");
let moment = require("moment");
let NodeGeocoder = require("node-geocoder");
let options = {
    provider: "mapquest",
    apiKey: "IzlTGWTE7IniSptaCFTuUE8NKK6sLk0m"
};
let geocoder = NodeGeocoder(options);
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//command line arguments, a is command type, b is search term
let a = process.argv[2];
let arrb = [];
for (i = 3; i < process.argv.length; i++) {
    arrb.push(process.argv[i]);
};
let b = arrb.join(" ");

//bands in town api command
if (a === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + b + "/events?app_id=codingbootcamp")
        .then(function (res) {
            for (i = 0; i < res.data.length; i++) {
                let name = res.data[i].venue.name;
                let date = moment(res.data[i].datetime).format("MM/DD/YYYY");
                geocoder.reverse({ lat: res.data[i].venue.latitude, lon: res.data[i].venue.longitude },
                    function (err, data) {
                        if (err) { return console.log("Error occurred: " + err); };
                        console.log("\n" + data[0].streetName + ", " + data[0].city + " " + data[0].stateCode + ", " + data[0].countryCode);
                    }).then(function () {
                        console.log(name);
                        console.log(date);
                    });
            };
        });
}
//spotify api command
else if (a === "spotify-this-song") {
    //set default
    if (b.length === 0) {
        b = "The Sign Ace of Base";
    };
    spotify.search({ type: "track", query: b }, function (err, data) {
        if (err) { return console.log("Error occurred: " + err); };
        let track = data.tracks.items[0]
        console.log("\nTrack: " + track.name)
        console.log("Album: " + track.album.name);
        console.log("Artist: " + track.artists[0].name);
        console.log("Link: " + track.external_urls.spotify);
    });
}
//omdb api command
else if (a === "movie-this") {
    //set default
    if (b.length === 0) {
        b = "Mr. Nobody";
    };
    axios.get()
}
//reads random.txt for command
else if (a === "do-what-it-says") {
    //bands in town api command
    if (a === "concert-this") {

    }
    //spotify api command
    else if (a === "spotify-this-song") {

    }
    //omdb api command
    else if (a === "movie-this") {

    }
    else {
        console.log("Error: invalid command given")
    };
}
else {
    console.log("Please give a valid command.\nconcert-this <...>\nspotify-this-song <...>\nmovie-this <...>\ndo-what-it-says")
};