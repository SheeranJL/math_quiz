import React, {useContext} from 'react';
import {appContext} from '../../context/context.js';
import './game-over.scss';

const GameOver = () => {

  const {data, actions} = useContext(appContext);

  const handleClick = () => {
    actions.setStartGame(false);
    actions.setGameOver(false);
    actions.setCorrectGuess(0);
  }


  return (
    <div className='game-over-modal'>
      <span className='modal-header'>Time up!</span>
      <span className='score-desc'>You got {data.correctGuess} correct answers in 60 seconds</span>
      <button className='modal-button' onClick={handleClick}>Go back</button>
    </div>
  )

}

export default GameOver;
