import {stages, setStages} from './ancients.js';
import {setCards} from './setCards.js';
import {onNewCardClick} from './getCards.js';

const levels = document.querySelector('.levels-list'),
    stagesList = document.querySelectorAll('[data-stage]'),
    newCard = document.querySelector('.close-cards'),
    openCard = document.querySelector('.open-cards'),
    resultSection = document.querySelector('.result-cards');

let cards, index, level;

levels.querySelectorAll('input').forEach((el) => el.disabled = true);
levels.querySelectorAll('input').forEach((el) => el.checked = false);

const getMess = (level) => {
    cards = setCards(level);

    index = [0, 1, 2];
    stagesList.forEach((stage) => stage.style.opacity = '1');
    setStages();
    newCard.addEventListener('click', onNewCardClick);
    openCard.style.backgroundImage = `none`;
    openCard.style.backgroundColor = `transparent`;
    newCard.classList.remove('close-cards--hide');
};

const setLevel = (evt) => {
    const levelField = evt.target.closest('label');

    if (levelField) {
        level = levelField.getAttribute('for');

        if (stages.length) {
            resultSection.classList.remove('hide');
            getMess(level);
            setTimeout(() => {
                window.scrollTo(0, 2 * document.documentElement.clientHeight);
            }, 500);
        }
    }
};

levels.addEventListener('click', setLevel);

export {cards, index, level, getMess};