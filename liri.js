// JavaScript for LIRI-Bot

// Steps to complete:
/* *Starting @ step 7*
	[x] at top of this script, write code needed to grab data from keys.js
	[x] need these commands to run:
		[x] my-tweets
		[x] spotify-this-song
		[x] movie-this
		[x] do-what-it-says
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

const twitterClient = new Twitter(keys.twitter);
const spotifyClient = new Spotify(keys.spotify);

// Stores command entered in terminal (ie. 'my-tweets', 'movie-this', etc.)
let command = process.argv[2];

// Captures terminal input after command
let songSearch = '';

// Stores song search string
let thisSong = '';

// Stores movie search string
let thisMovie = '';



// FUNCTIONS ====================
//

// Triggers on 'my-tweets' command
function tweets() {

	// display last 20 tweets w/ timestamp
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

	songSearch = encodeURIComponent(process.argv.slice(3));
		// console.log('songSearch: ' + songSearch);

		// if (songSearch === undefined) {
		// 	thisSong = 'The Sign Ace of Base';
			// console.log('default song called');
		// } else {
		// 	thisSong = songSearch;
		// }

		switch (songSearch) {
			// case undefined:
			case '':
				thisSong = 'The Sign Ace of Base';
				break;
			default:
				thisSong = songSearch;
				break;
		}

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
		
				// console.log(data.tracks.items);
				// console.log(spotData);
				console.log('-------------');
				console.log('Title: ' + spotData[s].name);
				console.log('\nArtist: ' + spotData[s].artists[0].name);
				console.log('\nPreview link: ' + spotData[s].preview_url);
				console.log('\nAlt preview link: ' + spotData[s].uri);
				console.log('\nAlbum: ' + spotData[s].album.name);
				console.log('-------------');
			};
	});
	// ^^Closes callback function
};


// Triggers on 'movie-this' command
function movieThis() {

	// let thisMovie = encodeURIComponent(process.argv.slice(3));
	let movieSearch = encodeURIComponent(process.argv.slice(3));

		console.log('movieSearch is: ' + movieSearch);

	switch (movieSearch) {
			// case null:
			// case undefined:
			case '':
			thisMovie = encodeURIComponent('Mr. Nobody');
			console.log('default movie called');
			break;

		default:
			thisMovie = movieSearch;
			break;
		}

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

				// console.log(JSON.parse(body));
				// console.log('-------------');
				// console.log(JSON.stringify(body, null, 2));

				let movieData = JSON.parse(body);
				// console.log(movieData);
				console.log('-------------');
				console.log(movieData.Title);
				console.log('Released: ' + movieData.Year);
				console.log('Rated ' + movieData.Ratings[0].Value + ' by IMDB');
				console.log('Rated ' + movieData.Ratings[1].Value + ' by Rotten Tomatoes');
				console.log('Country of Origin: ' + movieData.Country);
				console.log('Language: ' + movieData.Language);
				console.log('Synopsis: "' + movieData.Plot + '"');
				console.log('Starring: ' + movieData.Actors);
				console.log('-------------');
			}
		});
};


// Triggers on 'do-what-it-says' command
function doTheThing() {

	fs.readFile('./assets/random.txt', 'utf8', function(error, data) {

		if (error) {
			console.log(error);
		}

		// Log raw file data
		console.log(data);

		// Contents of file stored in array
		let dataArray = data.split(',');
		console.log(dataArray);

		// Command string from file becomes new "command" function trigger
		command = dataArray[0];
			// console.log('New command: ' + command);

		// Controlled by new command value (as determined by file)
		switch (command) {
			case 'my-tweets':
				// tweets function call
				// Nothing to edit for this to work*************
				tweets();
				console.log('my-tweets called from file');
			break;

			case 'spotify-this-song':
				// value of dataArray[1] stored in songSearch
				songSearch = encodeURIComponent(dataArray.slice(1));
					console.log(songSearch + ' :songSearch in doTheThing');
					
				// ################New Spotify#####################
				// new spotify action
				switch (songSearch) {
					case '':
						thisSong = 'The Sign Ace of Base';
						break;
					default:
						thisSong = songSearch;
						break;
				}

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
						console.log('-------------');
						console.log('Title: ' + spotData[s].name);
						console.log('\nArtist: ' + spotData[s].artists[0].name);
						console.log('\nPreview link: ' + spotData[s].preview_url);
						console.log('\nAlt preview link: ' + spotData[s].uri);
						console.log('\nAlbum: ' + spotData[s].album.name);
						console.log('-------------');
					};
				});
				console.log('spotify-this-song called from file');
			break;

				// ################End New Spotify#####################


			case 'movie-this':
				// movie function call
				// movieThis();

				movieSearch = encodeURIComponent(dataArray.slice(1));
					console.log(movieSearch + ' :movieSearch in doTheThing');

					// ################New OMDB#####################

				switch (movieSearch) {
					case '':
					thisMovie = encodeURIComponent('Mr. Nobody');
					console.log('default movie called');
					break;

				default:
					thisMovie = movieSearch;
					break;
				}

				console.log(thisMovie);

				request('http://www.omdbapi.com/?apikey=' + keys.omdb + '&t=' + thisMovie, function(error, response, body) {
					if (!error && response.statusCode === 200) {

						let movieData = JSON.parse(body);
							console.log('-------------');
							console.log(movieData.Title);
							console.log('Released: ' + movieData.Year);
							console.log('Rated ' + movieData.Ratings[0].Value + ' by IMDB');
							console.log('Rated ' + movieData.Ratings[1].Value + ' by Rotten Tomatoes');
							console.log('Country of Origin: ' + movieData.Country);
							console.log('Language: ' + movieData.Language);
							console.log('Synopsis: "' + movieData.Plot + '"');
							console.log('Starring: ' + movieData.Actors);
							console.log('-------------');
					}
				});
				console.log('movie-this called from file');
			break;

					// ################End New OMDB#####################


			case 'do-what-it-says':
				console.log('What is this, Inception? Try a different command.');
			break;

			default:
				console.log('Invalid command from file; go fish.');
			break;
		};

	});
};


// Log entries to text file
function logData() {

	let logs = command;
	//need to store user input into var to append to file....

	// let userCommand = command;
	// 	console.log(userCommand);

	// let userQuery = '';

	// switch (userCommand) {
	// 	case 'spotify-this-song':
	// 		userQuery = 
	// }


	fs.appendFile('./assets/log.txt', logs + '\n', function(err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Content added');
		}
	});
}




// MAIN PROCESS ====================
// 

// Need switch statment (or if/else) for each command possibility



switch (command) {

	case 'my-tweets':
		// tweets function call
		tweets();
		console.log('my-tweets called');
		logData()
		break;

	case 'spotify-this-song':
		// spotify function call
		songData();
		console.log('spotify-this-song called');
		logData()
		break;

	case 'movie-this':
		// movie function call
		movieThis();
		console.log('movie-this called');
		logData()
		break;

	case 'do-what-it-says':
		// do this function call
		doTheThing();
		console.log('do-what-it-says called');
		logData()
		break;

	default:
		console.log('Invalid command; go fish');
		logData()
		break;
}
