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



// FUNCTIONS ====================
//

// Will need functions for each command needed
const myTweets = () => {
	// display last 20 tweets w/ timestamp
};



// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility

switch (command) {
	case 'my-tweets':
		console.log('my-tweets');
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



