var song;
var button;
var amp;

var envelope, fft;



function preload() {
	song = loadSound("mySong.mp3")
}

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	canvas.mouseClicked(toggleSong);

	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	amp = new p5.Amplitude();

	envelope = new p5.Env();
	envelope.setADSR(0.001, 0.5, 0.1, 0.5);
	envelope.setRange(1,0);
	
	fft = new p5.FFT();
}


function draw() {
	background(250);

    var spectrum = fft.analyze();
	noStroke();
	fill(0,255,0);
    for (var i=0; i<spectrum.length; i++){
    	var x = map(i, 0, spectrum.length, 0, windowWidth);
    	var h = -windowHeight + map(spectrum[i], 0, 255, height, 0);
    	rect(x, windowHeight, windowWidth / spectrum.length, h)
    }
}