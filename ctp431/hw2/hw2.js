var song;

function preload() {
	song = loadSound("mySong.mp3");
	console.log("loading complete")
}

function setup() {
	createCanvas(2000, 1600);
	song = loadSound("mySong.mp3");
	song.play();
}

function draw() {
	background(0);

}

