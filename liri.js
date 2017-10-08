// JavaScript for LIRI-Bot
// Steps to complete:
/* *Starting @ step 7*
	[x] at top of this script, write code needed to grab data from keys.js
	[] need these commands to run:
		[x] my-tweets
		[] spotify-this-song
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

// Stores command entered in terminal (ie. 'my-tweets', 'movie-this', etc.)
let command = process.argv[2];

// let twitterClient = keys.twitter;
let twitterClient = new Twitter(keys.twitter);

let spotifyClient = new Spotify(keys.spotify);




// FUNCTIONS ====================
//

// Will need functions for each command needed

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
				console.log(tweets[t].created_at);
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

	// needs to grab process.argv[3] as song... 
	// Q: what if multi word song tho......
	let thisSong = process.argv[3];
		// [] need Switch to default to "The Sign" if no argument passed**********

	let spotSearch = spotifyClient.search({
			type: 'track',
			query: thisSong,
			limit: 2
	}, function(err, data) {
			if (err) {
				return console.log('Error occured: ' + err);
			}
		
		// Drilling into returned object
		// for (var s = 0; s < data.length; s++) {
		// 	console.log(data[s]);
		// };
		console.log('-------------');
		console.log(data.tracks.items);
		console.log('-------------');
	});

};



// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility

switch (command) {

	case 'my-tweets':
		// tweets function call
		tweets();
		console.log('tweets function called');
		break;

	case 'spotify-this-song':
		// spotify function call
		songData();
		console.log('spotify-this-song called');
		break;

	case 'movie-this':
		// movie function call
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



