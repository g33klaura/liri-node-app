// JavaScript for LIRI-Bot
// Steps to complete:
/* *Starting @ step 7*
	[] at top of this script, write code needed to grab data from keys.js
	[] need these commands to run:
		[] my-tweets
		[] spotify-this-song
		[] movie-this
		[] do-what-it-says
	[] check evernote list for what each command needs to do
	[] 


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


// FUNCTIONS ====================
//

// Will need functions for each command needed
function tweets() {
	// display last 20 tweets w/ timestamp
	// not sure about exclude_replies=true part....
	let myTweets = twitterClient.get('https://api.twitter.com/1.1/statuses/home_timeline.json', {count: 5}, function(error, tweets, response) {
			if (error) throw error;
			// console.log(tweets);
			// console.log(response);
			for (var t = 0; t < tweets.length; t++) {
				console.log(tweets[t].created_at);
				console.log(tweets[t].text);
				console.log('-------------');
			};
			

			// Gets a "twitterClient.get is not a function".....  ~fixed? Got a whole fuckload of data back... whoops....
	});
};



// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility

switch (command) {
	case 'my-tweets':
		tweets();
		console.log('tweets function called');
		break;
	case 'spotify-this-song':
		console.log('spotify-this-song');
		break;
	case 'movie-this':
		console.log('movie-this');
		break;
	case 'do-what-it-says':
		console.log('do-what-it-says');
		break;
	default:
		console.log('Invalid command');
		break;
}



