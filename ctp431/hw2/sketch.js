var song;
var button;

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
	createCanvas(600, 400);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	amp = new p5.Amplitude();
}

function draw() {
	background(0);
	var vol = amp.getLevel();
	ellipse(300, 200, 200, vol * 300)
}