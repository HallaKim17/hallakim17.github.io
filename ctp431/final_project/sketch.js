let angle = 0;
var circle_added = false;
var input;
var inputs = [];
var button;
var add_return_message;
var circle;
var melody_notes = ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.']
var noteName;

//GUI parameters
var numShapes = 6;
var radius = 10;
var circles = [];
var synth;
var buttons = [];
var mute_buttons = [];
var a1;
var a2;
var a3;
var a4;
var melody_added1 = false;
var melody_added2 = false;
var melody_added3 = false;
var melody_added4 = false;
var slider1;
var slider2;
var slider3; 
var slider4;
var text_on_circle1 = false;
var text_on_circle2 = false;
var text_on_circle3 = false;
var text_on_circle4 = false;

var melody_example = ['C3 C3 C3 F3 F3 G3', '. G4 E4 G4 D4 C4', 'G5 . . F5 E5 C5', 'E6 . . D6 C6 G6'];  
var tempo_example = [2, 4, 6, 2];


function setup() {
    console.log(melody_notes.length);
	createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    for(var i = 0; i < 4; i++) {
    	input = createInput(melody_example[i]);
    	input.position(850, 80 + 200*i);
        inputs.push(input);

	    button = createButton('Set melody'); 
	    button.position(input.x + input.width, 80 + 200*i);
        buttons.push(button);

        mute_button = createButton('Mute');
        mute_button.position(input.x + input.width + 32, 107 + 200*i);
        mute_buttons.push(mute_button);

        reset_button = createButton('Reset');
        reset_button.position(850, 770);
        reset_button.size(60);
	    

	    add_melody_message = createDiv('Type your melody');
	    add_melody_message.style('position', 850, 60 + 200*i);
        add_melody_message.style('color', '#ffffff')

	    add_return_message = createElement('h3','');
	    add_return_message.position(1050, 53 + 50*i);

	    textAlign(CENTER);
	    textSize(50);
	}

    buttons[0].mousePressed(addMelody_from_button1);
    buttons[1].mousePressed(addMelody_from_button2);
    buttons[2].mousePressed(addMelody_from_button3);
    buttons[3].mousePressed(addMelody_from_button4);
    mute_buttons[0].mousePressed(mute_orbit1);
    mute_buttons[1].mousePressed(mute_orbit2);
    mute_buttons[2].mousePressed(mute_orbit3);
    mute_buttons[3].mousePressed(mute_orbit4);
    reset_button.mousePressed(reset_melody);

    orbit1_message = createDiv('1st Orbit: ');
    orbit1_message.style('position', 850, 24);
    orbit1_message.style('color', '#e03830');
    orbit1_message.style('font-size', '30px');

    orbit2_message = createDiv('2nd Orbit: ');
    orbit2_message.style('position', 850, 224);
    orbit2_message.style('color', '#d37eae');
    orbit2_message.style('font-size', '30px');

    orbit3_message = createDiv('3rd Orbit: ');
    orbit3_message.style('position', 850, 424);
    orbit3_message.style('color', '#33a059');
    orbit3_message.style('font-size', '30px');

    orbit4_message = createDiv('4th Orbit: ');
    orbit4_message.style('position', 850, 624);
    orbit4_message.style('color', '#25c4e1');
    orbit4_message.style('font-size', '30px');



	// GUI setup
    slider1 = createSlider(0, 10.0, 2.0);
    slider1.position(inputs[0].x, 110);
    slider2 = createSlider(0, 10.0, 4.0);
    slider2.position(inputs[1].x, 310);
    slider3 = createSlider(0, 10.0, 6.0);
    slider3.position(inputs[2].x, 510);
    slider4 = createSlider(0, 10.0, 2.0);
    slider4.position(inputs[3].x, 710);


    frameRate(30);


    for(var i = 0; i < 6; i++) {
    	circles.push(new Circle(60,i));
    }
    for(var i = 6; i < 12; i++) {
    	circles.push(new Circle(150,i));
    }
    for(var i = 12; i < 18; i++) {
    	circles.push(new Circle(240,i));
    }
    for(var i = 18; i < 24; i++) {
    	circles.push(new Circle(330,i));
    }


    synth = new Tone.PolySynth(24).toMaster();



}





function draw() {
	background(0);

    textSize(20);
    text("Press all the '\Set melody'\ buttons on the right to play demo song.", 290, 65);
    text("C4   C#4/Db4   D4   D#4/Eb4   E4   F4   F#4/Gb4   G4   G#4/Ab4   A4   A#4/Bb4   B4   C5", 400, windowHeight-20);

    push();
    textSize(17);
    fill(150, 190, 95);   
    strokeWeight(0); 
    text("* Should be 6 notes", 750, 40)
    text("* dot(.): No note", 738, 60)
    pop();

    textSize(20);
    text(inputs[0].value(), inputs[0].x + 75, 142);
    text(inputs[1].value(), inputs[1].x + 75, 342);
    text(inputs[2].value(), inputs[2].x + 75, 542);
    text(inputs[3].value(), inputs[3].x + 75, 742);

    textSize(15);
    text(slider1.value(), inputs[0].x + 140, 117);
    text(slider2.value(), inputs[1].x + 140, 317);
    text(slider3.value(), inputs[2].x + 140, 517);
    text(slider4.value(), inputs[3].x + 140, 717);

    push();
    textSize(40);
    fill(170, 210, 105);
    strokeWeight(1);
    text("MelOrbit", 90, 40);
    pop();

    push();
    translate(windowWidth*2/5, windowHeight/2);
    noFill();
    ellipse(0,0,120);
    ellipse(0,0,300);
    ellipse(0,0,480);
    ellipse(0,0,660);
    line(0,0,330,0);
    pop();




//////////////////////////////////////////////////////////// 1st orbit (from the center)

    stroke('#ffffff');
    strokeWeight(3);

	push();
	translate(windowWidth*2/5, windowHeight/2);
	a1 = angle * slider1.value();
    rotate(-a1);
    for(var i = 0; i < 6; i++) {
        fill('#e03830');
        if((a1-circles[i].angle_circle)%360.0 == 0) {
            fill(255);
        }
    	ellipse(circles[i].x, circles[i].y, circles[i].d);
        if (text_on_circle1) {
            fill(0);
            text(melody_notes[i], circles[i].x, circles[i].y);
        }
    }

    pop();
   
    
//////////////////////////////////////////////////////////// 2nd orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
	a2 = angle * slider2.value();
    rotate(-a2);
    for(var i = 6; i < 12; i++) {
        fill('#d37eae');
        if((a2-circles[i].angle_circle)%360.0 == 0) {
            fill(255);
        }
    	ellipse(circles[i].x, circles[i].y, circles[i].d);
        if (text_on_circle2) {
            fill(0);
            text(melody_notes[i], circles[i].x, circles[i].y);
        }
    }
    pop();


//////////////////////////////////////////////////////////// 3rd orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
    a3 = angle * slider3.value();
    rotate(-a3);
    for(var i = 12; i < 18; i++) {
        fill('#33a059');
        if((a3-circles[i].angle_circle)%360.0 == 0) {
            fill(255);
        }
    	ellipse(circles[i].x, circles[i].y, circles[i].d);
        if (text_on_circle3) {
            fill(0);
            text(melody_notes[i], circles[i].x, circles[i].y);
        }
    }
    pop();
  

//////////////////////////////////////////////////////////// 4th orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
    a4 = angle * slider4.value();
    rotate(-a4);
    for(var i = 18; i < 24; i++) {
        fill('#25c4e1');
        if((a4-circles[i].angle_circle)%360.0 == 0) {
            fill(255);
        }
    	ellipse(circles[i].x, circles[i].y, circles[i].d)
        if (text_on_circle4) {
            fill(0);
            text(melody_notes[i], circles[i].x, circles[i].y);
        }
    }
    pop();

	translate(windowWidth*2/5, windowHeight/2);

    angle = angle + 1;


// synth object for each circle 
    if (melody_added1) {
        for(i = 0; i < 6; i++) {
            if (melody_notes[i] != '.') {
                circles[i].sound(a1, melody_notes[i]);
            } 
        }
    }

    if (melody_added2) {
        for(i = 6; i < 12; i++) {
            if (melody_notes[i] != '.') {
                circles[i].sound(a2, melody_notes[i]);
            } 
        }
    }    
    
    if (melody_added3) {
        for(i = 12; i < 18; i++) {
            if (melody_notes[i] != '.') {
                circles[i].sound(a3, melody_notes[i]);
            } 
        }
    }    

    if (melody_added4) {
        for(i = 18; i < 24; i++) {
            if (melody_notes[i] != '.') {
                circles[i].sound(a4, melody_notes[i]);
            } 
        }
    }


}




var Circle = function(bigR, j) {

    this.radius = 20;
	this.angle_circle = 360 / numShapes * j;
	this.R = bigR;
	this.x = cos(this.angle_circle) * bigR;
	this.y = sin(this.angle_circle) * bigR;
	this.d = 2 * this.radius;

	this.rotate = function(speed) {
    	ellipse(this.x, this.y, this.d);
	}


};


Circle.prototype.sound = function(rotateAngle, new_note) {
    this.note = new_note;
    if((rotateAngle-this.angle_circle)%360.0 == 0) {
        synth.triggerAttackRelease(this.note, '16n');
    };  

};


function addMelody_from_button1() {
	if(inputs[0].value() == '') {
        return 
    }
    inputArray = inputs[0].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(' ');
    if(splitInputs.length < 6) {
        return
    }
    
    for(i = 0; i < 6; i++) {
        melody_notes[i] = splitInputs[i];
    } 
    
    melody_added1 = true;
    text_on_circle1 = true;
}


function addMelody_from_button2() {
    if(inputs[1].value() == '') {
        return 
    } 
    inputArray = inputs[1].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(' ');
    if(splitInputs.length < 6) {
        return
    }

    for(i = 0; i < 6; i++) {
        melody_notes[i+6] = splitInputs[i];
    } 

    melody_added2 = true;
    text_on_circle2 = true;

}


function addMelody_from_button3() {
    if(inputs[2].value() == '') {
        return 
    }
    inputArray = inputs[2].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(' ');
    if(splitInputs.length < 6) {
        return
    }

    for(i = 0; i < 6; i++) {
        melody_notes[i+12] = splitInputs[i];
    } 

    melody_added3 = true;
    text_on_circle3 = true;

}


function addMelody_from_button4() {
    if(inputs[3].value() == '') {
        return 
    }
    inputArray = inputs[3].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(' ');
    if(splitInputs.length < 6) {
        return
    }

    for(i = 0; i < 6; i++) {
        melody_notes[i+18] = splitInputs[i];
    } 

    melody_added4 = true;
    text_on_circle4 = true;

}


function mute_orbit1() {
    melody_added1 = false;
}

function mute_orbit2() {
    melody_added2 = false;
}

function mute_orbit3() {
    melody_added3 = false;
}

function mute_orbit4() {
    melody_added4 = false;
}


function reset_melody() {
    melody_added1 = false;
    melody_added2 = false;
    melody_added3 = false;
    melody_added4 = false;

    inputs[0].value('');
    inputs[1].value('');
    inputs[2].value('');
    inputs[3].value('');

    text_on_circle1 = false;
    text_on_circle2 = false;
    text_on_circle3 = false;
    text_on_circle4 = false;

}



