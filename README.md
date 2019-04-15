# LIRI-Node-App
This is a simple Language Interpretation Recognition Interface demo.
Demonstrates use of Node.js.
Uses DotEnv to hide api keys.
Uses axios for api calls.
Uses node-spotify-api for Spotify-specific api calls.
Uses moment for date formatting.
Uses node-geocoder for reverse geocoding.
App takes command line arguments. First argument determines the type of api call.
Subsequent arguments are combined into a string that functions as a search term.
If no search term is provided, then defaults are given instead.
Api calls print information about searched concerts/song/movie.
"do-what-it-says" command argument uses filesystem to perform a search based on terms given in a separate text file.
All api calls are logged in log.txt.
See demo folder for screenshots of functionality.