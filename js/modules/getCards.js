import {cards, index, level, getMess} from './levels.js';

const openCard = document.querySelector('.open-cards'),
    newCard = document.querySelector('.close-cards'),
    btnUp = document.querySelector('.get-up'),
    btnAgain = document.querySelector('.get-again'),
    levels = document.querySelector('.levels-list'),
    stagesList = document.querySelectorAll('[data-stage]'),
    message = document.querySelector('.message'),
    levelTitle = document.querySelector('[data-level-title]'),
    ancients = document.querySelector('.ancients-list'),
    resultSection = document.querySelector('.result-cards');

const clearOptions = () => {
    message.style.display = 'block';
    levelTitle.classList.add('hide');
    resultSection.classList.add('hide');
    levels.querySelectorAll('input').forEach((el) => el.checked = false);
    levels.querySelectorAll('input').forEach((el) => el.disabled = true);
    ancients.querySelectorAll('.ancients-list__elem').forEach((elem) => elem.classList.remove('ancients-list__elem--active'));
    btnUp.removeEventListener('click', upPage);
    btnAgain.removeEventListener('click', getAgain);
};


const upPage = () => {
    clearOptions();
    window.scrollTo(0, -document.documentElement.clientHeight);
};

const getAgain = () => {
    getMess(level);
};

const showStagesCard = () => {
    const ind = -(index.length - 3);
    const counter = stagesList[ind].querySelector(`[data-color="${cards[0][0].color}"]`);

    newCard.classList.remove('close-cards--hide');
    openCard.style.backgroundColor = `rgb(48, 25, 61)`;
    openCard.style.backgroundImage = `url('${cards[0][0].cardFace}')`;
    openCard.setAttribute('title', `color: ${cards[0][0].color}\ndifficulty: ${cards[0][0].difficulty}`);
    counter.textContent -= 1;

    if (cards[0].length - 1) {
        cards[0].splice(0, 1);
    } else {
        cards[0].splice(0, 1);
        stagesList[ind].style.opacity = '0.2';
        cards.splice(0, 1);
        index.splice(0, 1);
    }
};

const showCards = () => {
    if (cards.reduce((sum, elem) => sum + elem.length, 0) - 1) {
        showStagesCard();
    } else {
        showStagesCard();
        newCard.classList.add('close-cards--hide');
        newCard.removeEventListener('click', onNewCardClick);
        btnUp.classList.remove('hide');
        btnUp.addEventListener('click', upPage);
        btnAgain.classList.remove('hide');
        btnAgain.addEventListener('click', getAgain);
    }
};

const onNewCardClick = () => {
    showCards();
};

export {onNewCardClick};