let backColor = (50, 50, 50);
let keyboard;

let inputs;
let wordSize = 5;
let nRows = 6;

let selectedBox = {         // The box that is being modified by the user
  x: 0,                     // x is for columns and y for rows
  y: 0
}

// Full list from: https://www.ime.usp.br/~pf/dicios/index.html
// Filtered by /Database/FiltrosLetras.py
let secretWord;             // Secret word to be discovered
let secretWordList;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(backColor);
  keyboard = new Keyboard();
  inputs = new InputsTable(wordSize, nRows);  
      
  secretWordList = readTextFile("./Database/listaFiltrada.txt");
  secretWord = secretWordList[Math.floor(Math.random() * secretWordList.length)];
}

function draw(){
  background(backColor); 

  // Selecting and applying stuff
  if (mouseIsPressed) {    
    // Inputs table
    inputs.selectNewBox();    
  }

  // User Input Rows stuff
  inputs.render();

  // ---- Keyboard stuff ----
  // Getting keyboard presses and passing that into inputs table
  let clickedKeyboardKey = keyboard.collision();
  if(clickedKeyboardKey && mouseIsPressed){
    inputs.setLetter(clickedKeyboardKey);
  }
  keyboard.render();

  // Splash Screen
  if(inputs.isGameOver){
    splashColor = inputs.wonGame ? [12, 199, 18, 200]:[173, 0, 17, 200];
    background(splashColor); 
    
    textAlign(CENTER, CENTER);
    textSize(96);
    fill(255);
    text("Game Over!\nYou " + (inputs.wonGame ? "Won":"Lost"), width/2, height/2);
    
    noLoop();
    return
  }
}

// How to resize and remove scrollbars
// https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inputs.center();
  keyboard.center();
}

function mouseReleased(event) {
  let clickedKeyboardKey = keyboard.collision();
  if(clickedKeyboardKey) {
    if(clickedKeyboardKey == "Enter")   inputs.endPhase(secretWord, keyboard);
    else if(clickedKeyboardKey != "←")  inputs.selectNextBox();
  }
}

// https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
// https://stackoverflow.com/questions/13709482/how-to-read-text-file-in-javascript
function readTextFile(file){
    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", file, false);

    // https://stackoverflow.com/questions/1021086/reading-in-utf-8-file-javascript-xmlhttprequest-gives-bad-european-characters
    // ==== IF ENCODING NOT UTF-8, ADAPT IT WITH FOLLOWING ====
    // rawFile.overrideMimeType('text/xml; charset=iso-8859-1');

    rawFile.send(null);

    // https://stackoverflow.com/questions/8125709/how-to-split-newline
    return rawFile.responseText.split(/\r?\n/);
}