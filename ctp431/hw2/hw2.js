var song;

function preload() {
	song = loadSound("mySong.mp3");
}

function setup() {
	createCanvas(2000, 1600);
	song = loadSound("mySong.mp3");
	song.play();

	angleMode(DEGREES);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	fft = new p5.FFT(0,256);
}

function draw() {
	background(0);
    var spectrum = amp.analyze();

    console.log(spectrum.length);
    stroke(255);
	strokeWeight(4);
	nofill();
}

