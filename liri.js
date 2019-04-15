//node and keys module setup
let fs = require("fs");
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
let log = a + ":" + b + ",";

//declaring functions
//bands in town api function
let searchBands = function (b) {
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
                        console.log(name + "\n" + date);
                    });
            };
        });
}
//spotify api function
let searchSongs = function (b) {
    //set default
    if (b.length === 0) {
        b = "The Sign Ace of Base";
    };
    spotify.search({ type: "track", query: b }, function (err, data) {
        if (err) { return console.log("Error occurred: " + err); };
        let track = data.tracks.items[0]
        console.log("\nTrack: " + track.name +
            "\nAlbum: " + track.album.name +
            "\nArtist: " + track.artists[0].name +
            "\nLink: " + track.external_urls.spotify);
    });
}
//omdb api function
let searchMovies = function (b) {
    //set default
    if (b.length === 0) {
        b = "Mr. Nobody";
    };
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + b)
        .then(function (res) {
            let movie = res.data
            console.log("\nTitle: " + movie.Title +
                "\nYear: " + movie.Year +
                "\nIMDB: " + movie.imdbRating +
                "\nRotten Tomatoes: " + movie.Ratings[1].Value +
                "\nCountry: " + movie.Country +
                "\nLanguage: " + movie.Language +
                "\nActors: " + movie.Actors +
                "\nPlot: " + movie.Plot);
        });
}
//log function
let appendLog = function () {
    fs.appendFile("log.txt", log, function () { });
}

//bands in town api call
if (a === "concert-this") {
    searchBands(b);
    appendLog();
}
//spotify api call
else if (a === "spotify-this-song") {
    searchSongs(b);
    appendLog();
}
//omdb api call
else if (a === "movie-this") {
    searchMovies(b);
    appendLog();
}
//reads random.txt for command arguments
else if (a === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) { return console.log("Error occurred: " + err); };
        let arg = data.split(",");
        let c = arg[0];
        let d = arg[1];
        log = c + ":" + d + ",";
        appendLog();
        //bands in town api command
        if (c === "concert-this") {
            searchBands(d);
        }
        //spotify api command
        else if (c === "spotify-this-song") {
            searchSongs(d);
        }
        //omdb api command
        else if (c === "movie-this") {
            searchMovies(d);
        }
        else {
            console.log("Error: invalid command found")
        };
    });
}
else {
    console.log("Please give a valid command.\nconcert-this <...>\nspotify-this-song <...>\nmovie-this <...>\ndo-what-it-says")
};