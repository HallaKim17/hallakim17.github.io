var song;
var button;
var amp;

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function preload() {
	song = loadSound("mySong.mp3")
}

function setup() {
	createCanvas(200, 200);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	amp = new p5.Amplitude();
}

function draw() {
	background(0);
	var vol = amp.getLevel();
	stroke(255);
	ellipse(100, 100, 100, vol * 100)
}