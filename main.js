let backColor = (50, 50, 50);
let keyboard;

let inputs;
let wordSize = 5;
let nRows = 6;

let selectedBox = {         // The box that is being modified by the user
  x: 0,                     // x is for columns and y for rows
  y: 0
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(backColor);
  keyboard = new Keyboard();
  inputs = new InputsTable(wordSize, nRows);               
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
    setLetterToInputsTable(inputs, clickedKeyboardKey);
  }
  keyboard.render();

  // noLoop();   
}

// How to resize and remove scrollbars
// https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inputs.center();
  keyboard.center();
}


// Sets a letter into the selected inputs table box
function setLetterToInputsTable(inputs, letterToSet){
  // Searching for the selected inputs table's box
  for(let row of inputs.rows){
    for(let letter of row.word){
      if(letter.selected){          
        if(letterToSet == "←")  letter.key.letter = "";
        else letter.key.letter = letterToSet;
        break;
      }
    }
  }
}