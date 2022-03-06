class RowOfInputs{
    constructor(startPos, boxSize, keySpacing, wordSize, letterRenderSize){
        this.wordSize = wordSize;
        this.word = [];
        let pos = {... startPos};
         
        for(let i = 0; i < this.wordSize; i++){
            this.word.push(new Key("", pos, boxSize, letterRenderSize));
            pos.x += boxSize.x + keySpacing.x; 
        }
    }

    render(){
        for(let i = 0; i < this.wordSize; i++){
            this.word[i].render();
            if(this.word[i].selected) this.word[i].renderSelected();
        }
    }
}

class InputsTable{
    constructor(wordSize, nRows){
        // The only row the user is allowed to modify
        this.currentRow = 0;

        // Configurations
        this.boxSize = {                // Background boxes sizes
            x:75,
            y:75
        }
        this.initPosition = {           // Where to start the keyboard render
            x:50,
            y:50
        } 
        this.keySpacing = {             // Spacing between the keys
            x:5,
            y:5
        }
         
        this.rows = [];
        for(let i = 0; i < nRows; i++){
            this.rows.push(new RowOfInputs(this.initPosition, this.boxSize, this.keySpacing, wordSize, 50));
            this.initPosition.y += this.boxSize.y + this.keySpacing.y;            
        }  

        // Selecting the first box
        this.rows[this.currentRow].word[0].selected = true;

        this.center();
    }

    render(){
        for(let row of this.rows) row.render();
    }

    // ADAPTED FROM keyboard.js
    // JANKY: Needs rework
    // Recenters the whole keyboard's position
    center(){
        let maxTableSize = {
            x: wordSize * this.boxSize.x + (wordSize - 1) * this.keySpacing.x,
            y: nRows    * this.boxSize.y + (nRows - 1)    * this.keySpacing.y
        }      

        this.initPosition = {
            x: windowWidth/2 - maxTableSize.x/2,
            y: 75
        }        

        this.updateKeysVars();
    }

    // ADAPTED FROM keyboard.js
    // Updates the keys' main variables: positions
    updateKeysVars(){

        let position = {
            ... this.initPosition
        }

        for(let i = 0; i < nRows; i++){
            for(let j = 0; j < wordSize; j++){ 
                this.rows[i].word[j].pos = {... position};
                position.x += this.boxSize.x + this.keySpacing.x;       
            }
            position.y += this.boxSize.y + this.keySpacing.y; 
            position.x = this.initPosition.x;   
        }  
    }

    // Selects a new box based on collision
    selectNewBox(){
        let oldSelectedJ;
        let selectedNewBox = false;

        // Getting the j position for the current selection
        for(let j = 0; j < this.rows[this.currentRow].word.length; j++){
            if(this.rows[this.currentRow].word[j].selected){
                console.log("Selected box: ", {row:this.currentRow, column:j});
                oldSelectedJ = j;                
                break;
            }
        }
        

        // Selecting new box, if collision happens
        for(let j = 0; j < this.rows[this.currentRow].word.length; j++){
            if(this.rows[this.currentRow].word[j].mouseOver()){   
                if(j != oldSelectedJ){  
                    this.rows[this.currentRow].word[j].selected = true;  
                    selectedNewBox = true;  
                    break;
                }
            }
        }      
        console.log("selectedNewBox: ", selectedNewBox); 

        // Deselecting latest box
        if(selectedNewBox){
            this.rows[this.currentRow].word[oldSelectedJ].selected = false;
        }
    }
      
}