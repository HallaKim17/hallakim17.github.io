let angle = 0;
var circle_added = false;
var input;
var inputs = [];
var button;
var add_return_message;
var circle;
var melody_notes = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6','C4','D4','E4','F4','G4','A4','B4','C5','D5']
var noteName;

//GUI parameters
var numShapes = 6;
var radius = 10;
var circles = [];
var synth;
var buttons = [];
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
var show_text1 = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);

    for(var i = 0; i < 4; i++) {
    	input = createInput();
    	input.position(850, 60 + 200*i);
        inputs.push(input);

        //input[0].value('C4,C4,C4,C4,C4,C4')
        //input[1].value('E4,E4,E4,E4,E4,E4')
        //input[2].value('G4,G4,G4,G4,G4,G4')
        //input[3].value('D4,E4,C4,G5,F5,E5')

	    button = createButton('Set melody'); 
        console.log(button)
	    button.position(input.x + input.width, 60 + 200*i);
        buttons.push(button);
        console.log(buttons);
	    

	    add_melody_message = createDiv('Type your melody');
	    add_melody_message.style('position', 850, 40 + 200*i);
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

    orbit1_message = createDiv('1st Orbit: ');
    orbit1_message.style('position', 850, 24);
    orbit1_message.style('color', '#e03830');

    orbit2_message = createDiv('2nd Orbit: ');
    orbit2_message.style('position', 850, 224);
    orbit2_message.style('color', '#d37eae');

    orbit3_message = createDiv('3rd Orbit: ');
    orbit3_message.style('position', 850, 424);
    orbit3_message.style('color', '#33a059');

    orbit4_message = createDiv('4th Orbit: ');
    orbit4_message.style('position', 850, 624);
    orbit4_message.style('color', '#25c4e1');



	// GUI setup
    slider1 = createSlider(0, 6.0, 1.0);
    slider1.position(inputs[0].x, 110);
    slider2 = createSlider(0, 6.0, 1.5);
    slider2.position(inputs[1].x, 310);
    slider3 = createSlider(0, 6.0, 2.0);
    slider3.position(inputs[2].x, 510);
    slider4 = createSlider(0, 6.0, 2.5);
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
        
    console.log(circles) 
}





function draw() {
	background(0);

    textSize(20);
    text("C4   C#4/Db4   D4   D#4/Eb4   E4   F4   F#4/Gb4   G4   G#4/Ab4   A4   A#4/Bb4   B4   C5", 400, windowHeight-20);

    textSize(20);
    text(inputs[0].value(), inputs[0].x + 75, 92);
    text(inputs[1].value(), inputs[1].x + 75, 292);
    text(inputs[2].value(), inputs[2].x + 75, 492);
    text(inputs[3].value(), inputs[3].x + 75, 692);

    textSize(15);
    text(slider1.value(), inputs[0].x + 140, 117);
    text(slider2.value(), inputs[1].x + 140, 317);
    text(slider3.value(), inputs[2].x + 140, 517);
    text(slider4.value(), inputs[3].x + 140, 717);

    //ellipse(windowWidth*2/5, windowHeight/2, 60);
    //ellipse(windowWidth*2/5, windowHeight/2, 150);
    //ellipse(windowWidth*2/5, windowHeight/2, 240);
    //ellipse(windowWidth*2/5, windowHeight/2, 330);

    stroke('#ffffff');
	strokeWeight(3);

    var speed = [0.6, 0.9, 1.3, 1.8]
	

//////////////////////////////////////////////////////////// 1st orbit (from the center)

	push();
	translate(windowWidth*2/5, windowHeight/2);
	a1 = angle * slider1.value();
    rotate(a1);
    for(var i = 0; i < 6; i++) {
        fill('#e03830');
    	ellipse(circles[i].x, circles[i].y, circles[i].d)
    }
    pop();
   
    
//////////////////////////////////////////////////////////// 2nd orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
	a2 = angle * slider2.value();
    rotate(a2);
    for(var i = 6; i < 12; i++) {
        fill('#d37eae');
    	ellipse(circles[i].x, circles[i].y, circles[i].d)
    }
    pop();


//////////////////////////////////////////////////////////// 3rd orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
    a3 = angle * slider3.value();
    rotate(a3);
    for(var i = 12; i < 18; i++) {
        fill('#33a059');
    	ellipse(circles[i].x, circles[i].y, circles[i].d)
    }
    pop();
  

//////////////////////////////////////////////////////////// 4th orbit

    push();
	translate(windowWidth*2/5, windowHeight/2);
    a4 = angle * slider4.value();
    rotate(a4);
    for(var i = 18; i < 24; i++) {
        fill('#25c4e1');
    	ellipse(circles[i].x, circles[i].y, circles[i].d)
    }
    pop();

	translate(windowWidth*2/5, windowHeight/2);

    angle = angle + 1;


// synth object for each circle 
    if (melody_added1) {
        circles[0].sound(a1, melody_notes[0]);
        circles[1].sound(a1, melody_notes[1]);
        circles[2].sound(a1, melody_notes[2]);
        circles[3].sound(a1, melody_notes[3]);
        circles[4].sound(a1, melody_notes[4]);
        circles[5].sound(a1, melody_notes[5]);
    }

    if (melody_added2) {
        circles[6].sound(a2, melody_notes[6]);
        circles[7].sound(a2, melody_notes[7]);
        circles[8].sound(a2, melody_notes[8]);
        circles[9].sound(a2, melody_notes[9]);
        circles[10].sound(a2, melody_notes[10]);
        circles[11].sound(a2, melody_notes[11]);
    }    
    
    if (melody_added3) {
        circles[12].sound(a3, melody_notes[12]);
        circles[13].sound(a3, melody_notes[13]);
        circles[14].sound(a3, melody_notes[14]);
        circles[15].sound(a3, melody_notes[15]);
        circles[16].sound(a3, melody_notes[16]);
        circles[17].sound(a3, melody_notes[17]);
    }    

    if (melody_added4) {
        circles[18].sound(a4, melody_notes[18]);
        circles[19].sound(a4, melody_notes[19]);
        circles[20].sound(a4, melody_notes[20]);
        circles[21].sound(a4, melody_notes[21]);
        circles[22].sound(a4, melody_notes[22]);
        circles[23].sound(a4, melody_notes[23]);
    }

    

}




var Circle = function(bigR, j) {

	this.angle_circle = 360 / numShapes * j;
	this.R = bigR;
	this.x = cos(this.angle_circle) * bigR;
	this.y = sin(this.angle_circle) * bigR;
	this.d = 2 * radius;

	this.rotate = function(speed) {
    	ellipse(this.x, this.y, this.d);
	}

    //this.note = default_note[j]
	//this.sound = function(rAngle) {
		//if((rAngle-this.angle_circle)%360.0==0) {
			//synth.triggerAttackRelease(this.note, '16n');
		//}
	//}
};

Circle.prototype.sound = function(rotateAngle, new_note) {
    this.note = new_note;
    if((rotateAngle-this.angle_circle)%360.0 == 0) {
        synth.triggerAttackRelease(this.note, '16n');
    };  

};


function addMelody_from_button1() {
	inputArray = inputs[0].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(',');

    for(i = 0; i < 6; i++) {
        melody_notes[i] = splitInputs[i];
    } 

    //inputs[0].value('');

    melody_added1 = true;

    show_text1 = true;

    //fill(255,255,255);
    //text = createDiv(splitInputs) 
    //text.position(inputs[0].x, 70);
    //text.style('color', 255,255,255);
    //console.log("text")
    

}


function addMelody_from_button2() {
    inputArray = inputs[1].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(',');

    for(i = 0; i < 6; i++) {
        melody_notes[i+6] = splitInputs[i];
    } 

    //inputs[1].value('');

    melody_added2 = true;
    
    //add_return_message.html(n + ' is added!');

}


function addMelody_from_button3() {
    inputArray = inputs[2].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(',');

    for(i = 0; i < 6; i++) {
        melody_notes[i+12] = splitInputs[i];
    } 

    //inputs[2].value('');

    melody_added3 = true;

    //add_return_message.html(n + ' is added!');

}


function addMelody_from_button4() {
    inputArray = inputs[3].value();
    inputArray = inputArray.toString();
    splitInputs = inputArray.split(',');

    for(i = 0; i < 6; i++) {
        melody_notes[i+18] = splitInputs[i];
    } 

    //inputs[3].value('');

    melody_added4 = true;

    //add_return_message.html(n + ' is added!');

}





