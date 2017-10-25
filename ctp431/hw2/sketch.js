function setup() {
	var canvas = createCanvas(700, 500);
	angleMode(DEGREES);
    mic = new p5.AudioIn();
    mic.start();
}


function draw() {
	background(200);
    
    var vol = mic.getLevel();

	fill(150,130,0);
	stroke(0);
    ellipse(250,250,50,50);

    p = map(vol, 0, 1, 0, 360)

    beginShape();
    for (var p = 0;, p < 360; p++) {
        stroke(150, 130, 0); 
        strokeWeight(10);
        strokeCap(ROUND);
        r = 1;
        var x = r * cos(p);
        var y = r * sin(p);
        vertex(x, y);
    }     
    r = r * 1.1
    endShape();
}