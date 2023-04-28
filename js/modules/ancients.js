import ancientsData from '../../data/ancients.js';

const ancients = document.querySelector('.ancients-list'),
    levels = document.querySelector('.levels-list'),
    resultSection = document.querySelector('.result-cards'),
    message = document.querySelector('.message'),
    btnUp = document.querySelector('.get-up'),
    btnAgain = document.querySelector('.get-again'),
    levelTitle = document.querySelector('[data-level-title]');

let stages = [];

const setStages = () => {
    const stagesList = document.querySelectorAll('[data-stage]');

    stagesList.forEach((stage, i) => {
        const stageCardNumbers = stage.querySelectorAll('[data-cards]');

        stageCardNumbers.forEach((cardNum) => {
            const stageCardType = cardNum.getAttribute('data-cards');
            cardNum.textContent = stages[i][stageCardType];
        });
    });
};

const startNewGame = () => {
    message.style.display = 'none';
    levelTitle.classList.remove('hide');
    resultSection.classList.add('hide');
    btnUp.classList.add('hide');
    btnAgain.classList.add('hide');
    levels.querySelectorAll('input').forEach((el) => el.disabled = false);
    levels.querySelectorAll('input').forEach((el) => el.checked = false);
    ancients.querySelectorAll('.ancients-list__elem').forEach((elem) => elem.classList.remove('ancients-list__elem--active'));
};

const onAncientClick = (evt) => {
    const card = evt.target.closest('div');
    stages = [];

    if (card && card.classList.contains('ancients-list__elem')) {
        const cardName = card.getAttribute('data-ancient');

        startNewGame();
        card.classList.add('ancients-list__elem--active');

        ancientsData.forEach((elem) => {
            if (elem.id === cardName) {
                stages.push(elem.firstStage);
                stages.push(elem.secondStage);
                stages.push(elem.thirdStage);
            }
        });

        setTimeout(() => {window.scrollTo(0, document.documentElement.clientHeight);}, 500);
    }
};

ancients.addEventListener('click', onAncientClick);

export {stages, setStages};