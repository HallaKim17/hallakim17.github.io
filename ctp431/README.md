# CTP431 Final Project 20174251
## MelOrbit

***

### 1. Introduction
I love to explore new kind of chords. It is exciting to hear different melodies of each part of a choir form a perfect harmony. This project was started from this point. This imitates the planets of solar system. However, unlike the real solar system it has multiple planets on the single orbit. There are four orbits each representing single part of a choir. This way, distinct melodies become a beautiful harmony. Enjoy being a conductor of Melody Orbits(**MelOrbit**)!

### 2. Components
![CreatePlan](/Users/bkim/my_project/MelOrbit.png)
- [Visualizer] Orbits 
 - Four orbits visulize the melody being played which you type as an input. An orbit has six circles that indicate six musical notes each. Everytime the circle makes a single rotation, the note assigned to the circle is played. 

- [Input] Type your melody
 - You can type any melody you want inside an input element. Examples of key name are shown below the project page. **Put a SPACE when you type keys one after another**. **If you want to make interval between notes, please type DOT notation(.)**. Otherwise it won't work. 
 ![image](/Users/bkim/my_project/examplenote.jpeg) 
 For example, to play the score of the image above, 
 > *C4 C4 . C4 . C4* 
 should be typed.

- [Button] Set melody
 - After typing your melody, click 'set melody' button to play it. The circles of corresponding orbit shows the name of the notes.

- [Button] Mute
 - Click 'Mute' button to stop playing the melody of corresponding orbit.

- [Slider] Tempo
 - Change tempo by adjusting the slider. Tempo is visualized as the rotation speed of the circles.

- [Button] Reset
 - Click 'Reset' button to remove all the melodies for all orbits. 

### 3. Codes
- index.html
- sketch.js

- p5.js
- Tone.js

### 4. Limitation
- As each orbit contains six circles, it can play score sheets described only for 3/4 or 6/8. I tried to add more circles in order to play 4/4 music. But after I added circles, visualization became slow with rotation process not shown smoothly. 

***

### Go to Play MelOrbit:
<http://hallakim17.github.io/ctp431/final_project/index.html>