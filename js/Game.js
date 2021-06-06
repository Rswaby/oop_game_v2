/* Rohan
 * Project 4 - OOP Game App
 * Game.js */

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
        const potentialPhrases = [
            'This is phrase one',
            'This is phrase two',
            'This is phrase three',
            'This is phrase four',
            'This is phrase five',
        ];
        
        const newPhrases = [];
        potentialPhrases.forEach(phrase => newPhrases.push(new Phrase(phrase)));
        return newPhrases;
    }

    /** 
    * Selects random phrase from phrases property 
    * @return {Object} Phrase object chosen to be used 
    */ 
    getRandomPhrase() {
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

    checkForWin(){
        const ul = document.getElementById('phrase').firstElementChild.children;
        for (const li of ul) {
            if (li.className.includes('hide')){
                return false;
            }
        }
        return true; 
    }

    removeLife(){
        const scoreBoard = document.getElementById('scoreboard');
        const images = scoreBoard.getElementsByTagName('img');
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
        const title = document.getElementById('game-over-message')
        overlay.style.display = 'flex';
        if(gameWon){
            title.innerText = 'Congrats, you Won!';
        } else {
            title.innerText = 'Sorry, you lost :(';
        }
    }

    handleInteraction(button){
        button.disabled = true;
        const letter = button.innerText;
        if(this.activePhrases.checkLetter(letter)){
            button.classList.add('chosen');
            this.activePhrases.showMatchedLetter(letter);
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }
    resetMissed(){
        this.missed = 0;
    }
};
