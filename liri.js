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

require("node-spotify-api");
// let spotify = new Spotify(keys.spotify);

let a = process.argv[2];
let b = process.argv[3];

//bands in town api command
if (a === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + b + "/events?app_id=codingbootcamp")
        .then(function (res) {
            for (i = 0; i < res.data.length; i++) {
                let name = res.data[i].venue.name;
                let date = moment(res.data[i].datetime).format("MM/DD/YYYY");
                geocoder.reverse({lat: res.data[i].venue.latitude, lon: res.data[i].venue.longitude}, 
                    function (err, resp){
                        console.log("\n"+resp[0].streetName+", "+resp[0].city+" "+resp[0].stateCode+", "+resp[0].countryCode);
                    }).then(function(){
                        console.log(name);
                        console.log(date);
                    });
            };
        });
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