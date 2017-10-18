var song;

function preload() {
	song = loadSound("mySong.mp3")
}

function setup() {
	createCanvas(1000, 700);
	song.play();
}

function draw() {
	background(0);
}