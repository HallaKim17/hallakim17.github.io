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
	createCanvas(windowWidth, windowHeight, WEBGL);
	button = createButton('toggle');
	button.mousePressed(toggleSong);
	song.play();
	amp = new p5.Amplitude();


}

function draw() {
	background(250);
    rotateY(frameCount * 0.01);

    for(var j=0; j<5; j++){
    	push();
    	for(var i=0; i<80; i++){
    		translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
    		rotateZ(frameCount * 0.002);
    		push();
    		sphere(8,6,4);
    		pop();
    	}
    	pop();
    }	

	var vol = amp.getLevel();
	stroke(255);
	ellipse(100, 100, 100, vol * 100)
}