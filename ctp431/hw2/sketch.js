var volhistory = [];
var fft;
var mic;
var col;
var w;


function setup() {
	var width = 700;
    var height = 500;
	var canvas = createCanvas(width, height);
	colorMode(HSB);
	
	//perspective(45 / 180 * PI, width/height, 0.5, 0);
	var fov = 45 / 180 * PI;
  	var cameraZ = (height/2.0) / tan(fov/2.0);
  	perspective(fov, windowWidth/windowHeight, cameraZ * 0.1, cameraZ * 10);
	
    mic = new p5.AudioIn();
    mic.start();
	fft = new p5.FFT(0.9, 64);
	w = width / 64;
	fft.setInput(mic);
}


function draw() {
	background(200);
    
    // viewer's pespective
	camera(0, 300, 500);
	
    var vol = mic.getLevel();
	volhistory.push(vol);

	translate(230, 410);
	
	var spectrum = fft.analyze();
	
	for (var i = 0; i < spectrum.length; i++) {
		var amp = spectrum[i];
		var y = map(amp, 0, 256, height, 0);
		fill(i*3.5, 255, 255);
		rect(i*w, y, w - 3, height - y);
		
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
	