var keys = require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var input = process.argv[2];

var secondInput = process.argv[3];

if (input === "my-tweets"){
	myTweets();
}
else if (input === "spotify-this-song"){
	spotifyThisSong();
}
else if (input === "movie-this"){
	movieThis();
}
else if (input === "do-what-it-says"){
	doWhatItSays();
}


function myTweets(){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: 'nathancoder45'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		console.log('"' + tweets[i].text  + '" Created at: ' + tweets[i].created_at);
  	}
    
  }

  return error
});
}




function spotifyThisSong(){
	
 
	var spotify = new Spotify({
	  id: keys.spotifyKeys.client_id,
	  secret: keys.spotifyKeys.client_secret
	});

	if (secondInput){
		spotify.search({ type: 'track', query: secondInput }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	// console.log(JSON.stringify(data, null, 2));
		console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].external_urls.spotify + "\n");
		});

	}

	else {
		spotify.search({ type: 'track', query: 'the sign ace of base' }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
		console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].external_urls.spotify + "\n");
		});
	}	

}


function movieThis(){

	if (secondInput){
		request('http://www.omdbapi.com/?apikey=trilogy&t=' + secondInput, function (error, response, body) {
		  console.log('\nTitle: ' + JSON.parse(body).Title);
		  console.log('Year: ' + JSON.parse(body).Year);
		  console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
		  console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
		  console.log('Country: ' + JSON.parse(body).Country);
		  console.log('Language: ' + JSON.parse(body).Language);
		  console.log('Plot: ' + JSON.parse(body).Plot);
		  console.log('Actors: ' + JSON.parse(body).Actors + "\n");

		});
	}
	else {
		request('http://www.omdbapi.com/?apikey=trilogy&t=mr_nobody', function (error, response, body) {
		  console.log('\nTitle: ' + JSON.parse(body).Title);
		  console.log('Year: ' + JSON.parse(body).Year);
		  console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
		  console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
		  console.log('Country: ' + JSON.parse(body).Country);
		  console.log('Lanuage: ' + JSON.parse(body).Language);
		  console.log('Plot: ' + JSON.parse(body).Plot);
		  console.log('Actors: ' + JSON.parse(body).Actors + "\n");

		});
	}

	
}


function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

	  var dataArr = data.split(",")

	 if (dataArr[0] === "spotify-this-song"){
	 	var spotify = new Spotify({
		  id: keys.spotifyKeys.client_id,
		  secret: keys.spotifyKeys.client_secret
		});

	 	spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
	 		
			console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview: " + data.tracks.items[0].preview_url.spotify + "\n");
		});
	 }

	 if (dataArr[0] === "my-tweets"){
	 	myTweets();
	 }

	 if (dataArr[0] === "movie-this"){
	 	request('http://www.omdbapi.com/?apikey=trilogy&t=' + dataArr[1], function (error, response, body) {
		  console.log('\nTitle: ' + JSON.parse(body).Title);
		  console.log('Year: ' + JSON.parse(body).Year);
		  console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
		  console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].value);
		  console.log('Country: ' + JSON.parse(body).Country);
		  console.log('Language: ' + JSON.parse(body).Language);
		  console.log('Plot: ' + JSON.parse(body).Plot);
		  console.log('Actors: ' + JSON.parse(body).Actors + "\n");

		});
	 }


 
  

	});


}




