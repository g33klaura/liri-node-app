// JavaScript for LIRI-Bot
// Steps to complete:
/* *Starting @ step 7*
	[x] at top of this script, write code needed to grab data from keys.js
	[] need these commands to run:
		[x] my-tweets
		[x] spotify-this-song
		[] movie-this
		[] do-what-it-says
	[] check evernote list for what each command needs to do

*/



// REQUIREMENTS ====================
// 

const keys = require('./assets/keys.js');
	// console.log(keys.twitter.consumer_key);

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');

const fs = require('fs');




// VARIABLES ====================
// 

let twitterClient = new Twitter(keys.twitter);
let spotifyClient = new Spotify(keys.spotify);

// Stores command entered in terminal (ie. 'my-tweets', 'movie-this', etc.)
let command = process.argv[2];

// Stores song search string
let thisSong = '';

let thisMovie = '';



// FUNCTIONS ====================
//

// [] Will need functions for each command needed

// Triggers on 'my-tweets' command
function tweets() {
	// display last 20 tweets w/ timestamp
	// not sure about exclude_replies part....

	let myTweets = twitterClient.get('https://api.twitter.com/1.1/statuses/home_timeline.json', {
			count: 10, 
			exclude_replies: true
	}, function(error, tweets, response) {
			if (error) throw error;
			// console.log(tweets);
			// console.log(response);
			for (var t = 0; t < tweets.length; t++) {
				console.log('\n' + tweets[t].created_at);
				console.log(tweets[t].text);
				console.log('-------------');
			};
		});
	// Trying to see why exclude_replies isn't working
				// console.log('-------------');
				// console.log(myTweets);
				// console.log('-------------');
};


// Triggers on 'spotify-this-song' command
function songData() {

	let songSearch = process.argv[3];
		// console.log('songSearch: ' + songSearch);

		if (songSearch === undefined) {
			thisSong = 'The Sign Ace of Base';
			// console.log('default song called');
		} else {
			thisSong = songSearch;
		}

	// Can I even get an undefined to log??? ~It DOES, so why the eff won't 'the-sign' become the default search term?!! :(
	// ~FIXED!!!!
	// console.log('thisSong: ' + thisSong);

	let spotSearch = spotifyClient.search({
			type: 'track',
			query: thisSong,
			limit: 1			
	}, function(err, data) {
			if (err) {
				return console.log('Error occured: ' + err);
			}
		
		let spotData = data.tracks.items;
		
		// Drilling into returned object
		for (var s = 0; s < spotData.length; s++) {
			// console.log(spotData[s]);
		
		// console.log('-------------');
		// console.log(data.tracks.items);
		// console.log(spotData);
		console.log('-------------');
		console.log('Title: ' + spotData[s].name);

		console.log('\nArtist: ' + spotData[s].artists[0].name);

		console.log('\nPreview link: ' + spotData[s].preview_url);
			// ^^Not all tracks have preview_url?????
			// Maybe can get fancy and do if/else for null preview_url

		console.log('\nAlt preview link: ' + spotData[s].uri);

		console.log('\nAlbum: ' + spotData[s].album.name);
		console.log('-------------');
		
		// console.log('\nTitle: ${spotData[s].name} \nArtist: ${spotData[s].artists[0].name}');
			// Trying cleaned up way Dave did....

		};
	});
	// ^^Closes callback function
};


// Triggers on 'movie-this' command
function movieThis() {

	/*
	Needs to log:
	[] title
	[] year
	[] imdb rating
	[] rotten tomatoes rating
	[] country produced
	[] language
	[] plot
	[] actors
	*/
	// let movieArgs = encodeURIComponent(process.argv.slice(3));
	let thisMovie = encodeURIComponent(process.argv.slice(3));

		console.log(thisMovie);
		// console.log(encodeURI(movieArgs));

		// thisMovie = movieArgs.join('-');
		// console.log(thisMovie);

		// thisMovie = encodeURI(movieArgs);
		// console.log(thisMovie);

		// for (var m = 3; m < movieArgs.length; m++) {
		// 	thisMovie = encodeURI(movieArgs);
		// }

	// let titleSearch = encodeURI(process.argv[m])

	request('http://www.omdbapi.com/?apikey=' + keys.omdb + '&t=' + thisMovie, function(error, response, body) {
			if (!error && response.statusCode === 200) {

				console.log(JSON.parse(body));
				// console.log('-------------');
				// console.log(JSON.stringify(body, null, 2));

			}
	})

};




// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility

switch (command) {

	case 'my-tweets':
		// tweets function call
		tweets();
		console.log('my-tweets called');
		break;

	case 'spotify-this-song':
		// spotify function call
		songData();
		console.log('spotify-this-song called');
		break;

	case 'movie-this':
		// movie function call
		movieThis();
		console.log('movie-this called');
		break;

	case 'do-what-it-says':
		// do this function call
		console.log('do-what-it-says called');
		break;

	default:
		console.log('Invalid command; go fish');
		break;
}



