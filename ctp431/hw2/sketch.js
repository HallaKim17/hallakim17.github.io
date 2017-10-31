var fft;
var mic;
var w;
var width;
var height;
var sum = 0;
var button;
var song;

//balls
var balls = [];     
var threshold = 30;
var accChangeX = 0; 
var accChangeY = 0;
var accChangeT = 0;



var DEPTH = 48; // 48
var NUM_SPEC_BINS = 1024;
var spec_array = new Array();

for (i=0;i<DEPTH;i++) {
	spec_array[i]=new Array();
	for (j=0;j<NUM_SPEC_BINS;j++) {
		spec_array[i][j]=0;
	}
}

// x[5][12] = 3.0;
var cur_spec_index = 0;




function setup() {
	button = createButton("play");
	button.mousePressed(togglePlaying);
	button.position(10,285);
    button.size(200);
    createP(" ");

	width = 1000;
    height = 500;
	var canvas = createCanvas(width, height, WEBGL);
	colorMode(HSB);

	for (var i=0; i<50; i++) {
        balls.push(new Ball());
    }

    mic = new p5.AudioIn();
    mic.start();

    //text("Loading...", 10, 10);

    //fft.setInput(song);
    fft = new p5.FFT(0.9, NUM_SPEC_BINS);

	w = width / 200;
}

function preload() {
	song = loadSound("Klaatu.mp3");
}

function loaded() {
	console.log("loaded")
	//text("Song Loaded", 10, 20);
}

function togglePlaying() {
	if (!song.isPlaying()) {
		song.setVolume(0.3);
		song.play();
        button.html("pause");
	} else {
		song.pause();
		button.html("play");
	}
}


// Ball class
function Ball() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(5, 10);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
    this.direction = 0.06;

    this.move = function() {
        this.x += this.xspeed * this.direction;
        this.y += this.yspeed * this.direction;       
    };
  
    // Bounce when touch the edge of the canvas  
    this.turn = function() {
        if (this.x < 0) { 
            this.x = 0; 
            this.direction = -this.direction; 
        }
        else if (this.y < 0) { 
            this.y = 0; 
            this.direction = -this.direction;   
        }
        else if (this.x > width - 20) { 
            this.x = width - 20; 
            this.direction = -this.direction; 
        }
        else if (this.y > height - 20) { 
            this.y = height - 20; 
            this.direction = -this.direction;   
        } 
	}
	
	this.show = function() {
		stroke(0);
		fill(random(60,70),random(10,20),random(90,100));
        ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}



function draw() {
	background(135,85,5);
    
    // viewer's pespective
	//camera(100, 300, -300);
	
    var vol = mic.getLevel();
	ellipse(250, 100, 50+vol*360, 50+vol*360);
	
	var spectrum = fft.analyze();


    // store current spectrum
 	for (var i = 0; i < spectrum.length; i++) {
 		spec_array[cur_spec_index][i] = spectrum[i];
 	}

 	// draw spectrum using a 2D-circular buffer
 	for (var i = 0; i < DEPTH; i++) {
 		array_index = cur_spec_index - i;
 		if (array_index < 0) {
 			array_index = array_index + DEPTH;
 		}

 		beginShape();
 		for (var k = 0; k < spectrum.length; k++) {
			var y = map(spec_array[array_index][k], 0, 640, height, 0);
			var x = map(k, 0, spectrum.length, 0, width); 
			vertex(x-width/2, y/2-height/2, 0-i*35);
		}
		endShape();

		// gradation 
		fill(100-i/DEPTH*100, 255 - i/DEPTH*255, 100-i/DEPTH*100);

	}	

	cur_spec_index = cur_spec_index + 1;
 	if (cur_spec_index == DEPTH)
 		cur_spec_index = 0;








	/*for (var i = 0; i < spectrum.length; i++) {
		sum = sum + spectrum[i];
	}

	strokeWeight(0.03);
	
	for (var i = 0; i < spectrum.length; i++) {
		var nor_amp = (spectrum[i]/sum) * width;
		fill(i*2.5, 245, 80);
		arc(i*w, height - spectrum[i], w, height, HALF_PI, PI);
	}
	
	for (var j=0; j<balls.length; j++) { 
        balls[j].move(); 
       	balls[j].show();    
		balls[j].turn();
		/*if (balls[j].y > 400 - spectrum[floor(balls[j].x)]) {
        	this.y = 400 - spectrum[floor(balls[j].x)];
			this.direction = -this.direction;
	}*/
}
	

	
	