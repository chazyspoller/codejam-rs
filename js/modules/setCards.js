import {cardsData as greenCards} from '../../data/mythicCards/green/index.js';
import {cardsData as brownCards} from '../../data/mythicCards/brown/index.js';
import {cardsData as blueCards} from '../../data/mythicCards/blue/index.js';
import {stages} from './ancients.js';

const getRandom = (min, max) => {
    const numbers = Array.from(
        {length: max - min + 1},
        (n, i) => min + i
    );

    return () => numbers.splice(Math.random() * numbers.length | 0, 1)[0] ?? null;
};

const shuffleArr = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

const chosenForStage = (cards, count) => {
    const chosenCards = [];

    for (let i = 0; i < count; i++) {
        chosenCards.push(cards[i]);
    }

    cards.splice(0, count);
    return chosenCards;
};

const getOneTypeCardsWithExtra = (cards, count, level, exLevel) => {
    const chosenCards = [];

    const firstNeedCards = cards.filter((card) => card.difficulty === level);

    if (firstNeedCards.length >= count) {
        for (let i = 0; i < count; i++) {
            chosenCards.push(firstNeedCards[i]);
        }
    } else {
        const exNeedCards = cards.filter((card) => card.difficulty === exLevel);
        for (let i = 0; i < count - firstNeedCards.length; i++) {
            chosenCards.push(exNeedCards[i]);
        }
        chosenCards.push(...firstNeedCards);
    }

    return chosenCards;
};

const getSpecialCards = (cards, count, exLevel) => {
    const chosenCards = [],
        random = getRandom(0, cards.length - 1);

    for (let i = 0; i < count; i++) {
        const index = random();
        if (index !== null && cards[index].difficulty !== exLevel) {
            chosenCards.push(cards[index]);
        } else {
            i--;
            continue;
        }
    }

    //console.log('-------------------------');
    //console.log(count);
    //chosenCards.forEach((el) => console.log(el));

    return chosenCards;
};

const getCards = (cards, count, level) => {
    switch (level) {
        case 'normal':
            return getSpecialCards(cards, count, 'all');
        case 'easy':
            return getSpecialCards(cards, count, 'hard');
        case 'hard':
            return getSpecialCards(cards, count, 'easy');
        case 'pre-easy':
            return getOneTypeCardsWithExtra(cards, count, 'easy', 'normal');
        case 'nightmare':
            return getOneTypeCardsWithExtra(cards, count, 'hard', 'normal');
    }
};

const setCards = (level) => {
    const greensCount = stages.reduce((sum, stage) => sum + stage.greenCards, 0),
        brownsCount = stages.reduce((sum, stage) => sum + stage.brownCards, 0),
        bluesCount = stages.reduce((sum, stage) => sum + stage.blueCards, 0);

    const greensImg = shuffleArr(getCards(greenCards, greensCount, level)),
        brownsImg = shuffleArr(getCards(brownCards, brownsCount, level)),
        bluesImg = shuffleArr(getCards(blueCards, bluesCount, level));

    const resCards = [];
    const typesCards = [[greensImg, 'greenCards'], [brownsImg, 'brownCards'], [bluesImg, 'blueCards']];

    stages.forEach((stage) => {
        const stageCards = [];

        typesCards.forEach(([stageTypeCards, stageCountTypeCards]) => {
            stageCards.push(...chosenForStage(stageTypeCards, stage[stageCountTypeCards]));
        });

        resCards.push(shuffleArr(stageCards));
    });

    //console.log(level);

    return resCards;
};

export {setCards};