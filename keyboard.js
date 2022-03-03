class Key{
    constructor(letter, boxSize){
        this.boxSize = boxSize;
        this.boxSizeHalf = {
            x: boxSize.x/2,
            y: boxSize.y/2,
        }

        this.key = {
            letter: letter,
            color: [250, 250, 250],
            size: 32,
        }

        this.state = "av";
        this.backColors = {
            "av":    [50, 200, 50],
            "unav":  [50, 50, 50],
        }       
    }

    render(pos){
        noStroke();
        fill(this.backColors[this.state]);
        rect(pos.x, pos.y, this.boxSize.x, this.boxSize.y, 10);
       
        textAlign(CENTER, CENTER);
        textSize(this.key.size);
        fill(this.key.color);
        text(this.key.letter, pos.x + this.boxSizeHalf.x, pos.y + this.boxSizeHalf.y);
    }

    // collision(){
    //     return mouseX()>= this.
    // }
}

class Keyboard{
    constructor(){
        let lettersList = "qwertyuiopasdfghjkl←zxcvbnm";
        
        // Configurations
        let boxSize = {             // Background boxes sizes
            x:75,
            y:75
        }
        this.initPosition = {       // Where to start the keyboard render
            x:50,
            y:50
        }  
        this.keySpacing = {         // Spacing between the keys
            x:5,
            y:5
        }
        this.lineDeltaSpacing = 0.25;     // How much to shift the first item in a row, based on the previous. Fraction of a boxSize

        // Initializing key objects
        this.keys = [];
        for(let i = 0; i < lettersList.length; i++){
            this.keys.push(new Key(lettersList[i], boxSize));
        }

        // Special Characters
        this.keys.push(new Key("Enter", {x:125, y:50}));

        // Design 
        this.brakes = ["a", "z"];       // When to start a new line when rendering

        this.center();
    }

    render(){
        
        let position = {
            ... this.initPosition
        }

        let skip = 1;
        for(let i = 0; i < this.keys.length; i++){               
            if (this.brakes.includes(this.keys[i].key.letter)){
                position.y += this.keys[i].boxSize.y + this.keySpacing.y;
                position.x = this.initPosition.x + this.keys[i].boxSize.x * this.lineDeltaSpacing * skip;
                skip++;
            }  
            
            this.keys[i].render(position);

            position.x += this.keys[i].boxSize.x + this.keySpacing.x;  
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
    }
}

