/* Rohan
 * Project 4 - OOP Game App
 * app.js */
const startGameButton = document.getElementById('btn__reset');
const onScreenKeyboard = document.getElementById('qwerty');
const scoreBoard = document.getElementById('scoreboard');
const images = scoreBoard.getElementsByTagName('img');
const ul = document.getElementById('phrase').firstElementChild;

const game = new Game();

const ensureUIReset = () =>{
    ul.innerHTML = '';
    for (const image of images) {
        image.src = 'images/liveHeart.png';
    }
    buttons = onScreenKeyboard.getElementsByTagName('button');
    for (const button of buttons) {
        button.classList.remove('chosen');
        button.classList.remove('wrong');
        button.disabled = false;
    }
    
    game.resetMissed();
}
startGameButton.addEventListener('click', (e)=>{
    ensureUIReset();
    console.log('starting game');
    game.startGame();
})

onScreenKeyboard.addEventListener('click',(e) => {
    if(e.target.nodeName === 'BUTTON'){
        game.handleInteraction(e.target);
    }
})
