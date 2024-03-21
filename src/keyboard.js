// Author:  Lauro França @oPisiti
// Created: 2024

class Key{
    constructor(letter, position, boxSize, letterRenderSize = 32){
        // Base configurations
        this.pos = {... position};
        this.boxSize = boxSize;
        this.boxSizeHalf = {
            x: boxSize.x/2,
            y: boxSize.y/2,
        }
        this.key = {
            letter: letter,
            color: [250, 250, 250],
            size: letterRenderSize,
        }

        this.state = "av";
        this.backColors = {
            "av":                   [120, 78, 186],
            "unav":                 [50, 50, 50],
            "mOver":                [27, 166, 15],
            "selected":             [20, 20, 20], 
            "existsCorrectPlace":   [123, 209, 38],
            "existsWrongPlace":     [122, 7, 19],
            "notExists":            [25, 25, 25]
        }     
        this.mOver = false;

        this.selected = false;  
        this.selectedBarSize = {        // Bar Size in relation to boxSize
            x:0.8,
            y:0.1
        }
    }

    render(){
        noStroke();
        if(!this.mOver) fill(this.backColors[this.state]);
        else            fill(this.backColors["mOver"]);
        rect(this.pos.x, this.pos.y, this.boxSize.x, this.boxSize.y, 10);
       
        textAlign(CENTER, CENTER);
        textSize(this.key.size);
        fill(this.key.color);
        text(this.key.letter, this.pos.x + this.boxSizeHalf.x, this.pos.y + this.boxSizeHalf.y);
    }

    mouseOver(){
        return mouseX>=this.pos.x && mouseX<=(this.pos.x + this.boxSize.x) &&
               mouseY>=this.pos.y && mouseY<=(this.pos.y + this.boxSize.y)
    }

    // Visual representation that this key is selected 
    // Used to indicate which position of input table is selected
    renderSelected(){
        fill(this.backColors["selected"]);
        rect(this.pos.x + (1 - this.selectedBarSize.x)/2 * this.boxSize.x,
             this.pos.y + (1 - this.selectedBarSize.y*2) * this.boxSize.y,
             this.boxSize.x * this.selectedBarSize.x,
             this.boxSize.y * this.selectedBarSize.y,
             4);
    }
}

class Keyboard{
    constructor(){
        this.lettersList = "qwertyuiopasdfghjkl←zxcvbnm";

        // Configurations
        this.boxSize = {                 // Background boxes sizes
            x:75,
            y:75
        }
        let enterBoxSize = {            // "Enter" key box size - usually bigger
            x:this.boxSize.x * 2,
            y:this.boxSize.y
        }
        this.initPosition = {           // Where to start the keyboard render
            x:50,
            y:50
        }  
        this.keySpacing = {             // Spacing between the keys
            x:5,
            y:5
        }
        this.lineDeltaSpacing = 0.25;   // How much to shift the first item in a row, based on the previous. Fraction of a boxSize
        
        // Design 
        this.newLine = ["a", "z"];      // When to start a new line when rendering

        // Initializing key objects
        this.keys = [];

        let position = {
            ... this.initPosition
        }        
        let skip = 1;
        for(let i = 0; i < this.lettersList.length; i++){        
            // Calculating the position of each letter of the keyboard   
            if (this.newLine.includes(this.lettersList[i])){
                position.y += this.boxSize.y + this.keySpacing.y;
                position.x = this.initPosition.x + this.boxSize.x * this.lineDeltaSpacing * skip;
                skip++;
            }  
            
            this.keys.push(new Key(this.lettersList[i], position, this.boxSize));

            position.x += this.boxSize.x + this.keySpacing.x;  
        }

        // Special Characters
        this.keys.push(new Key("Enter", position, enterBoxSize));        

        this.center();
    }

    render(){        
        for(let i = 0; i < this.keys.length; i++){
            this.keys[i].render();
        }
    }

    // JANKY: Needs rework
    // Recenters the whole keyboard's position
    center(){
        let maxNumKeys = {x:10, y:3};      // Maximum number of keys on a given axis
        let maxKeyboardSize = {
            x: maxNumKeys.x * this.keys[0].boxSize.x + (maxNumKeys.x - 1) * this.keySpacing.x + this.lineDeltaSpacing * this.keys[0].boxSize.x,
            y: maxNumKeys.y * this.keys[0].boxSize.y + (maxNumKeys.y - 1) * this.keySpacing.y
        }      

        this.initPosition = {
            x: windowWidth/2 - maxKeyboardSize.x/2,
            y: windowHeight - maxKeyboardSize.y - this.keySpacing.y
        }        

        this.updateKeysVars();
    }

    // Updates the keys' main variables: positions
    updateKeysVars(){

        let position = {
            ... this.initPosition
        }        
        let skip = 1;
        for(let i = 0; i < this.keys.length; i++){        
            // Calculating the position of each letter of the keyboard   
            if (this.newLine.includes(this.lettersList[i])){
                position.y += this.boxSize.y + this.keySpacing.y;
                position.x = this.initPosition.x + this.boxSize.x * this.lineDeltaSpacing * skip;
                skip++;
            }  
            
            this.keys[i].pos = {... position};

            position.x += this.boxSize.x + this.keySpacing.x;  
        }
    }

    // If mouse is over any of the keys
    collision(){
        for(key of this.keys) key.mOver = false;    // Resetting all
        for(key of this.keys){                      // Returning collision 
            if(key.mouseOver()){
                key.mOver = true;
                return key.key.letter
            }
        }
        return false
    }
}

