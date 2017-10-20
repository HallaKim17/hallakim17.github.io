var song;
var button;
var amp;

var osc, envelope, fft;
var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;



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
	createCanvas(windowWidth, windowHeight, WEBGL);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	amp = new p5.Amplitude();

	envelope = new p5.Env();
	envelope.setADSR(0.001, 0.5, 0.1, 0.5);
	envelope.setRange(1,0);
	fft = new p5.FFT();
	noStroke();
}


function draw() {
	background(250);

    if (frameCount % 60 == 0 || framecount == 1) {
    	var midiValue = scaleArray[note];
    	var freqValue = midiToFreq(midiValue);
    	song.freq(freqValue);

    	envelope.play(osc, 0, 0.1);
    	note = (note + 1) % scaleArray.length;
    }
}