let backColor = (50, 50, 50);
let keyboard;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(backColor);
  keyboard = new Keyboard();
}

function draw(){
  background(backColor);
  keyboard.render();
  noLoop();   
}

// How to resize and remove scrollbars
// https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  keyboard.center();
}