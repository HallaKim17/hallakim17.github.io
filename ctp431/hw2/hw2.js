var x = 0;

function setup() {
	createcanvas(600, 400);
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(4);
	nofill();
	ellipse(x, 200, 100, 100);
}

