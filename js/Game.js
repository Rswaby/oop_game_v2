/* Rohan
 * Project 4 - OOP Game App
 * Game.js */
// import { potentialPhrases } from './potentialPhrases';

class Game {
    constructor(){
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrases = null;
    }
    /** 
    * Creates phrases for use in game 
    * @returns {array} An array of phrases that could be used in the game
    */ 
    createPhrases(){      
        const newPhrases = [];
        /**
         * converts and array of strings to phrases. 
         * NOTE: alternately, I think we could do the conversion when we call getRandomPhrase()
         */
        this.returnPotentialPhrases().forEach(phrase => newPhrases.push(new Phrase(phrase)));
        return newPhrases;
    }

    /** 
    * Selects random phrase from phrases property 
    * @return {Object} Phrase object chosen to be used 
    */ 
    getRandomPhrase() {
        /**
         * return any random phrase in this.phrase property
         */
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    };

    startGame(){
        //hide overlay 
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        // set active phrase then display
        this.activePhrases = this.getRandomPhrase();
        this.activePhrases.addPhraseToDisplay();  
    }
    /**
     * Determind if all the letters of the phrase are showing 
     * @returns {Boolean} 
     */
    checkForWin(){
        const ul = document.getElementById('phrase').firstElementChild.children;
        for (const li of ul) {
            // if there is one li option with className that contains hide return false
            if (li.className.includes('hide')){
                return false;
            }
        }
        // there were no li nodes with className containing hide. 
        return true; 
    }
    /**
     * This function checks removes a live from the scoreboard and 
     * updates the game `missed` property 
     **/
    removeLife(){
        const scoreBoard = document.getElementById('scoreboard');
        const images = scoreBoard.getElementsByTagName('img');
        /**
         * Since this.missed starts at 0 
         * we can use it to get the index of the next image to remove from the board (by updating the source)
         * if this.missed = 0 
         * update images[0].src
         */
        images[this.missed].src = 'images/lostHeart.png';
        this.missed += 1;
        // todo: game over;
        if (this.missed === 5){
            this.gameOver(false);
        }
    }
    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        const title = document.getElementById('game-over-message');
        const startGameButton = document.getElementById('btn__reset');
        // set overlay to original display setting. 
        overlay.style.display = 'flex';
        // update the h1 tag, startButton text and bakgroundcolor based on the gameWon Bool
        if(gameWon){
            title.innerText = 'Congrats, you Won! (>‿◠)✌';
            startGameButton.innerText = 'Play Again';
            overlay.style.backgroundColor = '#001f3f';
        } else {
            title.innerText = 'Sorry, you lost. (ㆆ_ㆆ)';
            startGameButton.innerText = 'Retry'
            overlay.style.backgroundColor = '#85144b';
        }
    }
    /**
     * takes a on screen keyboard button. updates the button's css
     * determinds if there was a match or not
     * checks the game status for a win 
     * @param {node} button 
     */
    handleInteraction(button){
        // disable button
        button.disabled = true;
        const letter = button.innerText;
        // if letter is in phrase, reveal letter and update button css. 
        if(this.activePhrases.checkLetter(letter)){
            button.classList.add('chosen');
            this.activePhrases.showMatchedLetter(letter);
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            // if letter is not in phrase 
            // remove a life and update css. 
            button.classList.add('wrong');
            this.removeLife();
        }
    }
    /**
     * reset the missed property when game restarts
     */
    resetMissed(){
        this.missed = 0;
    }
    /**
     * a list of potential phrases that will render to the UI
     * @returns {Array<string>}
     */
    returnPotentialPhrases(){
        return [
            'happy coding',
            'good luck',
            'plus ultra',
            'launch the workspace',
            'Earth is closed',
            'we will rock you', 
            'I am not a driller', 
            'Last in first out', 
            'First in first out',
            'Short End of the Stickmory', 
            'Playing Possum', 
            'What Am I, Chopped Liver?', 
            'Dont Count Your Chickens Before They Hatch', 
            'A Chip on Your Shoulder',
            'Cut The Mustard', 
            'Cup Of Joe',
            'Yada Yada',
            'Par For the Course', 
            'Read Em and Weep', 
            'Needle In a Haystack', 
            'Wild Goose Chase', 
            'Top Drawer', 
            'High And Dry', 
            'Fight Fire With Fire', 
            'On Cloud Nine', 
            'donkey', 
            'No Brainer', 
            'rabbit', 
            'bashful', 
            'honey', 
            'cow', 
            'glove', 
            'paint', 
            'fairies', 
            'snakes start to sing', 
            'That is all folks',
        ];
    }
};
