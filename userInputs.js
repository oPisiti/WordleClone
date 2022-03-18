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
        this.wordSize = wordSize;
        
        // Taking care of ending the game
        this.isGameOver = false;
        this.wonGame = true;
        
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

        // Deselecting latest box
        if(selectedNewBox){
            this.rows[this.currentRow].word[oldSelectedJ].selected = false;
        }
    }

    // Sets a letter into the selected inputs table box
    setLetter(letterToSet){
        if(letterToSet == "Enter") return
    
        // Searching for the selected inputs table's box
        for(let row of this.rows){
            for(let letter of row.word){
                if(letter.selected){          
                    if(letterToSet == "←")  letter.key.letter = "";
                    else letter.key.letter = letterToSet;
                    break;
                }
            }
        }
    }
    
    // Selects the next available box
    // Called when the user definitely choses a letter 
    selectNextBox(row = this.currentRow){
        let selectedColumn = this.getSelectedBoxColumn();

        // Trying the box to the right of selected
        if(selectedColumn < this.wordSize - 1){
            let testColumn = selectedColumn;
            while(testColumn < this.wordSize - 1){
                // If box to the right has not been filled
                if(this.isBoxBlanck(testColumn + 1)){
                    this.swapBoxSelection(testColumn + 1, selectedColumn);
                    return true;
                }
                testColumn++;
            }
        }

        // Trying the boxes from the left
        for(let i = 0; i < selectedColumn; i++){
            if(this.rows[row].word[i].key.letter == "") {
                this.swapBoxSelection(i, selectedColumn);
                return true;
            }
        }

        return false;
    }

    // Swaps selection of current box for another
    swapBoxSelection(destColumn, curColumn = this.getSelectedBoxColumn(), destRow = this.currentRow, curRow = this.currentRow){
        this.rows[curRow].word[curColumn].selected = false;
        this.rows[destRow].word[destColumn].selected = true;
    }

    // Returns the column number for the selected box 
    getSelectedBoxColumn(row = this.currentRow){
        for(let i = 0; i < this.rows[this.currentRow].word.length; i++){
            if(this.rows[row].word[i].selected)
                return i;
        }

        return false;
    }

    // If a box is is blanck or has been filled in 
    isBoxBlanck(column, row = this.currentRow){
        if(this.rows[row].word[column].key.letter == "")
            return true;
        else
            return false;
    }

    // If all letters of a word (row) are filled in
    isWordFull(){
        for(let i = 0; i < this.wordSize; i++){
            if(this.isBoxBlanck(i)) return false
        }

        return true
    }

    // After pressed enter
    endPhase(word, keyboard){
        if(!this.isWordFull()) return

        // https://pt.stackoverflow.com/questions/237762/remover-acentos-javascript
        let correctedWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // Checking the letters
        for(let i = 0; i < this.wordSize; i++){
            let match = false;
            for(let j = 0; j < correctedWord.length; j++){
                if(correctedWord[j] == this.rows[this.currentRow].word[i].key.letter){
                    match = true; 
                    if(i == j){
                        this.rows[this.currentRow].word[i].state = "existsCorrectPlace";                           
                        break
                    }
                    else this.rows[this.currentRow].word[i].state = "existsWrongPlace";    
                }
            }

            if(!match){
                this.rows[this.currentRow].word[i].state = "notExists";            
                
                // Setting the color of the keyboard key to inactive
                for(let key of keyboard.keys){
                    if(key.key.letter == this.rows[this.currentRow].word[i].key.letter){
                        key.state = "notExists"; 
                        break
                    }                        
                }
            }
        }

        // If won
        if(this.hasWon(correctedWord)){
            this.endGame(word, true);
        }
        else{
            // Selecting next row or end game if is last row        
            if(this.currentRow < this.rows.length-1){
                this.swapBoxSelection(0, this.getSelectedBoxColumn(), this.currentRow + 1, this.currentRow);
                this.currentRow++;
            }
            else{
                this.endGame(word, false);
            }
        }
    }

    // End of the game - calls splash screen
    endGame(word, won){
        if(won){
            for(let i = 0; i < this.wordSize; i++){
                this.rows[this.currentRow].word[i].key.letter = word[i];            
            }
            this.wonGame = true;
        }
        else{
            this.wonGame = false;
        }
        this.isGameOver = true;
    }

    // Checks if current word is correct
    hasWon(correctedWord){
        for(let i = 0; i < this.wordSize; i++){
            if(correctedWord[i] != this.rows[this.currentRow].word[i].key.letter){
                return false
            }
        }
        return true
    }
}