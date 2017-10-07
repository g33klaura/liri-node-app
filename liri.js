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
	// console.log(keys);

// const fs = require('fs');





// VARIABLES ====================
// 

// Stores command entered (ie. 'my-tweets', 'movie-this', etc.)
let command = process.argv[2];



// FUNCTIONS ====================
//

// Will need functions for each command needed


// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility

switch (command) {
	case 'my-tweets':
		// do this;
		break;
	case 'spotify-this-song':
		// do this;
		break;
	case 'movie-this':
		// do this;
		break;
	case 'do-what-it-says':
		// do this;
		break;
	default:
		console.log('Invalid command');
		break;
}



