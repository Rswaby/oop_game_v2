/* Rohan
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase=""){
        this.phrase = phrase.toLowerCase();
    }

    /** 
    * Display phrase on game board 
    */ 
    addPhraseToDisplay() {
        const phraseSection = document.getElementById('phrase').firstElementChild; //ul element
        const space = " ";
        for (const char of this.phrase) {
            const li = document.createElement('li');
            li.innerText = char;
            // determind if it's a pace or letter.
            if (char === space){
                li.className = 'space';
            } else {
                // set default className to hide or li tag.
                li.className = `hide letter ${char}`;
            }
            phraseSection.appendChild(li);
        }
        console.log(phraseSection);
    };

    /**
     * checks whether letter is in phrase.
     * @param {String} letter 
     * @returns {boolean}
     */
    checkLetter(letter) {
        console.log('checking letter',letter);
        return this.phrase.includes(letter);
    };
    /**
     * shows all the letters on the board that are equal to letter parameter.
     * @param {String} letter 
     */
    showMatchedLetter(letter) {
        const ul = document.getElementById('phrase').firstElementChild.children;
        for (const li of ul) {
            if (li.innerText === letter){
                li.className = `show letter ${letter}`;
            }
        } 
    }

};
