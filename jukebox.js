//object constructor 
function JukeBox(){
	SC.initialize({
    	client_id: 'f665fc458615b821cdf1a26b6d1657f6'
 	});
//sets initial values 
 	this.playlist = null;
 	_this = this;
 	this.currentSongIndex = 0;
 	this.playstream = null; 

//gets the tracks 
 	SC.get("/tracks",{    
 		q: "mayer "   
 	}).then(function(response) {       
 		console.log( response );
 		_this.playlist = response;
 		_this.playstream = SC.stream('/tracks/' + _this.playlist[_this.currentSongIndex].id);
 	});
//plays tracks
	this.play = function(){
		this.playstream.then(function(player){
			player.play();
		});
	}
//pauses tracks
	this.pause = function(){
		this.playstream.then(function(player){
			player.pause();
		});
	}
//displays music detail information
	this.info = function(){
		var songInfo = this.playlist[this.currentSongIndex];
		$('#artwork').attr("src", songInfo.artwork_url);
		$('#song-title').text(songInfo.title);
		$('#song-description').text(songInfo.description);
		$('#genre').text(songInfo.genre);	
		var releaseDate = (songInfo.release_month) + " / " + (songInfo.release_day) + " / " + (songInfo.release_year);
		$('#release').text(releaseDate);
	}
//goes back to the previous song
	this.previous = function(){
		this.currentSongIndex -= 1;
 		this.playstream = SC.stream('/tracks/' + _this.playlist[_this.currentSongIndex].id);
		this.play();
	}	
//skips to the next song
	this.next = function(){
		this.currentSongIndex += 1;
 		this.playstream = SC.stream('/tracks/' + _this.playlist[_this.currentSongIndex].id);
		this.play();
	}	
};

//calls functions 
$(document).ready(function(){
	var jukeBox = new JukeBox();

	$("#play").click(function(){		
		jukeBox.play();
		jukeBox.info();
	});
	$("#pause").click(function(){
		jukeBox.pause();
	});
	$('#previous').click(function(){
		jukeBox.previous();
		jukeBox.info();
	})
	$('#next').click(function(){
		jukeBox.next();
		jukeBox.info();
	})
});



