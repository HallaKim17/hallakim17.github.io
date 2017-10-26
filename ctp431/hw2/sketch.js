var volhistory = [];
var fft;
var mic;
var col;

function setup() {
	var canvas = createCanvas(700, 500);
	//angleMode(DEGREES);
    mic = new p5.AudioIn();
    mic.start();
	fft = new p5.FFT();
	fft.setInput(mic);
}


function draw() {
	background(200);
    
    var vol = mic.getLevel();
	volhistory.push(vol);

	translate(350, 250);
	
	var spectrum = fft.analyze();
	
	for (var i = 0; i < spectrum.length; i++) {
		var x = map(i, 0, spectrum.length, 10, 650); 
	    var h = -500 + map(spectrum[i], 0, 255, 500, 0);
		rect(x, 500, 700/spectrum.length, h);
	}
	
	stroke(spectrum[i], spectrum[i+30], spectrum[i+50]);
	noFill();
	beginShape();
	for (var i = 0; i < 10000; i++) {
        var r = map(volhistory[i], 0, 1, 10, 600);
	    var x = r * cos(i);
		var y = r * sin(i);
		vertex(x,y);
	}
	endShape();
}

if (volhistory.length > 10000) {
	volhistory.splice(0, 1);
}
	