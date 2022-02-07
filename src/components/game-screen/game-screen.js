import React, {useState, useContext} from 'react';
import {appContext} from '../../context/context.js';

import './game-screen.scss';

const GameScreen = () => {

  const [answer, setAnswer] = useState(null);

  const handleInput = (e) => {
    const regex = /^[0-9]+$/;
    const input = e.target.value

    if (regex.test(input)) {
      setAnswer(input)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('text submit')
  }

  return (
    <div className='game-screen-container'>

      <div className='game-screen'>

        <div className='game-mode-title'>
          <span>Hard mode</span>
        </div>

        <div className='question'>
          <span>3 x 2</span>
        </div>

        <div className='input-section'>
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={handleInput} value={answer}/>
          </form>
        </div>

      </div>

    </div>
  )

}

export default GameScreen;
