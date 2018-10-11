'Liri Bot'
require("dotenv").config();
var keys = require('./keys');
var moment = require('moment');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var argArray = [];
var input;
for (var i = 3; i < argArray.length; i++) {
    input = argArray[i]
}
console.log(input);
runLiRi(command, input);
function runLiRi(command, input) {
    switch (command) {
        case 'concert-this':
            runBandsInTown(input);
            break;
        case 'spotify-this-song':
            Spotify(input);
            break;
        case 'movie-this':
            runOMBD(input);
            break;
        case 'do-what-it-says':
            runRandom(command, input);
            break;
        case 'help':
            help();
            break;
        default:
            console.log('If your having trouble type in help')
            return;
    };
};
function Spotify(input) {
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            data = data.tracks.item[0];
            console.log(
                '\n\nArtist: ' + data.artists[0].name + '\nSong: ' + data.name
                + '\nPreview Link: ' + data.preview_url + '\nAlbum: ' +
                data.album.name+ '\n\n'
            );
        }
    });
};
function runBandsInTown(input) {
    var request = require('request');
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
};
function runOMBD(input) {
    var request2 = require('request');
    request2('http://www.omdbapi.com/?apikey=[trilogy]&' + input, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
};
function runRandom(command, input) {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error)
        }
        data = data.split('"')
        var dataArr = data.split(",");

        command = dataArr[0];
        input = dataArr[1];
        runLiRi(command, input);
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