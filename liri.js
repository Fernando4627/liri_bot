'Liri Bot'
require("dotenv").config();
var keys = '';
var spotify = new Spotify(keys.spotify);
var command = process.argv[2].toLowerCase();
var fs = require('fs');
for (var i = 3; i < argArray.length; i++ ){
    var input = argArray[i]
}
function runLiRi(command, input) {
    switch (command) {
        case 'concert-this':
            runBandsInTown();
            break;
        case 'spotify-this-song':
            Spotify();
            break;
        case 'movie-this':
            runOMBD();
            break;
        case 'do-what-it-says':
            runRandom();
            break;
        case 'help':
            help();
            break;
        default:
            return;
    };
};
function Spotify(input) {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
};
function runBandsInTown(input) {
    var request = require('request');
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
function runOMBD(input) {
    var request2 = require('request');
    request('http://www.omdbapi.com/?apikey=[trilogy]&' + movie, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
function runRandom() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }

        console.log(data);

        var dataArr = data.split(",");

        command = dataArr[0];
        input = dataArr[1];
        runLiRi(command,input);
    });
};
function help() {
    console.log(
        'In order to run Liri please ask the following\n' +
        'For concerts around you please use the command\n' +
        'concert-this "artist", such as concert-this macklemore\n' +
        'For songs you want info about please use the command\n' +
        'spotify-this-song "song name here", such as spotify-this-song welcome to the party\n' +
        'For movies that you want to find more info about please use the command\n' +
        'movie-this "movie name", such as movie-this Deadpool 2\n' +
        'For a random command please use\n' +
        'do-what-it-says\n');
};