require("dotenv").config();
let keys = require("./keys");
let axios = require("axios");
let spotify = new Spotify(keys.spotify);

let a = process.argv[2];
let b = process.argv[3];

//bands in town api command
if (a === "concert-this") {

}
//spotify api command
else if (a === "spotify-this-song") {

}
//omdb api command
else if (a === "movie-this") {

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