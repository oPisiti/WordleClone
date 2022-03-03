class RowOfInputs{
    constructor(startPos, boxSize, keySpacing, wordSize){
        this.wordSize = wordSize;
        this.word = [];
        let pos = {... startPos};
         
        for(let i = 0; i < this.wordSize; i++){
            this.word.push(new Key(" ", pos, boxSize));
            pos.x += boxSize.x + keySpacing.x; 
        }
    }

    render(){
        for(let i = 0; i < this.wordSize; i++){
            this.word[i].render();
        }
    }
}

class InputsTable{
    constructor(wordSize, nRows){
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
            this.rows.push(new RowOfInputs(this.initPosition, this.boxSize, this.keySpacing, wordSize));
            this.initPosition.y += this.boxSize.y + this.keySpacing.y;            
        }  

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
}