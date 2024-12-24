window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const player0Score = document.querySelector('#score--0'),
        player1Score = document.querySelector('#score--1'),
        dice = document.querySelector('.dice'),
        btnNew = document.querySelector('.btn--new'),
        btnRoll = document.querySelector('.btn--roll'),
        btnHold = document.querySelector('.btn--hold'),
        current0PlayerElem = document.querySelector('.player--0'),
        current1PlayerElem = document.querySelector('.player--1'),
        currentValuePlayer0 = document.querySelector('#current--0'),
        currentValuePlayer1 = document.querySelector('#current--1');

    let currentScore, activePlayer, isPlaying, totalScore;
    const WINNING_SCORE = 100;

    function initGame() {
        currentScore = 0;
        activePlayer = 0;
        totalScore = [0, 0];
        isPlaying = true;

        currentValuePlayer0.textContent = 0;
        currentValuePlayer1.textContent = 0;
        player0Score.textContent = 0;
        player1Score.textContent = 0;
        dice.classList.add('hidden');

        current0PlayerElem.classList.remove('player--winner', 'player--active');
        current1PlayerElem.classList.remove('player--winner', 'player--active');
        current0PlayerElem.classList.add('player--active');
    }

    const switchActivePlayer = () => {
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        current0PlayerElem.classList.toggle('player--active');
        current1PlayerElem.classList.toggle('player--active');
    };

    btnRoll.addEventListener('click', () => {
        if (isPlaying) {
            const randomNumber = Math.trunc(Math.random() * 6) + 1;
            dice.classList.remove('hidden');
            dice.src = `dice${randomNumber}.png`;

            if (randomNumber !== 1) {
                currentScore += randomNumber;
                document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            } else {
                switchActivePlayer();
            }
        }
    });

    btnHold.addEventListener('click', () => {
        if (isPlaying) {
            totalScore[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];

            if (totalScore[activePlayer] >= WINNING_SCORE) {
                isPlaying = false;
                dice.classList.add('hidden');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            } else {
                switchActivePlayer();
            }
        }
    });

    btnNew.addEventListener('click', initGame);

    // Запуск игры при загрузке страницы
    initGame();
});
