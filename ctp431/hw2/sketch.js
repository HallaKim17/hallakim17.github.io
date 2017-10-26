var volhistory = [];
var fft;
var mic;
var col;
var w;
var width;
var height;

//balls
var balls = [];     
var threshold = 30;
var accChangeX = 0; 
var accChangeY = 0;
var accChangeT = 0;




function setup() {
	width = 1000;
    height = 750;
	var canvas = createCanvas(width, height);
	colorMode(HSB);
	
	/*perspective(45 / 180 * PI, width/height, 0.5, 0);
	var fov = 45 / 180 * PI;
  	var cameraZ = (height/2.0) / tan(fov/2.0);
  	perspective(fov, windowWidth/windowHeight, cameraZ * 0.1, cameraZ * 10);*/
	
	for (var i=0; i<20; i++) {
        balls.push(new Ball());
    }
	
    mic = new p5.AudioIn();
    mic.start();
	fft = new p5.FFT(0.9, 1024);
	w = width / 130;
	fft.setInput(mic);
}


// Ball class
function Ball() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
    this.direction = 0.7;

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
        ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}



function draw() {
	background(200);
    
    // viewer's pespective
	//camera(100, 300, -300);
	
    var vol = mic.getLevel();
	volhistory.push(vol);
	
	var spectrum = fft.analyze();

    var sum = 0;
	for (var j = 0; j < spectrum.length; j++) {
		sum = sum + spectrum[j];
	}

    noFill();
	strokeWeight(0.03);
	
	for (var i = 0; i < spectrum.length; i++) {
		var nor_amp = (spectrum[i]/sum) * width;
		fill(i*2.5, 155, 60);
		rect(i*w, 400 - spectrum[i], nor_amp, height);
	}
	
	for (var j=0; j<balls.length; j++) { 
        balls[j].move(); 
       	balls[j].show();    
		balls[j].turn();
		/*if (balls[j].y > 400 - spectrum[floor(balls[j].x)]) {
        	this.y = 400 - spectrum[floor(balls[j].x)];
			this.direction = -this.direction;*/
	}

    //checkForShake();
	
	/*beginShape();
	for (var i = 0; i < 10000; i++) {
        var r = map(volhistory[i], 0, 1, 10, 600);
	    var x = r * cos(i);
		var y = r * sin(i);
		ellipse(x,y,r,r);
	}
	//endShape();

    if (volhistory.length > 10000) {
	    volhistory.splice(0, 1);
	}*/
}
	

	
	