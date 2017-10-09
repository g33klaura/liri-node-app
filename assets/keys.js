console.log('keys.js loaded');

// Keys for Twitter
const twitterKeys = {
	consumer_key: 'S8stx48K48Rf8AXx4Gv8YT0Zl',
	consumer_secret: '4dc443Pbygr6dQsLwwaDYPlZrC9IePRhmPcqDnPPxnTuszCCIQ',
	access_token_key: '916407260955369472-wi7lWSKFPSaMP01YAHNuPOVyEHrMMBu',
	access_token_secret: 'MpTPXL5HEoFFAzrwyPVQwYyjBxIvuc44P5gOdrdEVvlTa'
};


// Keys for Spotify
const spotifyKeys = {
	id: 'dd899244750342789b75a7b5ff6375d9',
	secret: '2b7f04a1739b49bbb19f4b8947a118ed'
};


// Keys for OMDB
const omdbKey = '40e9cece';


// Export object
// Q: OK THESE AREN'T BOTH SAME LABELS???  ~seems to be ok....
module.exports = {
	twitter: twitterKeys,
	spotify: spotifyKeys,
	omdb: omdbKey
}
