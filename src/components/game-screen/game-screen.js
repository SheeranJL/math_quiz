import React, {useState, useContext, useEffect, useRef} from 'react';
import {appContext} from '../../context/context.js';

import './game-screen.scss';
import GameOver from '../game-over/game-over.js';

const GameScreen = () => {

  const {data, actions} = useContext(appContext);
  const [firstRender, setFirstRender] = useState(true);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState({
    firstNumber: null,
    operator: null,
    secondNumber: null,
    solution: null,
  })
  const {firstNumber, operator, secondNumber, solution} = question;
  let [timer, setTimer] = useState(5)
  const [pauseTimer, setPauseTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer -= 1)
      } else {
        actions.setGameOver(true);
        clearInterval(interval)
      }
    }, 1000)

    //On first render, generate a new question//
    if (firstRender) {
      setQuestion(handleGameMode(data.gameMode));
      setFirstRender(false);
    }
    //generate a new question on each correct guess//
    if (parseInt(solution) === parseInt(answer)) {
      setQuestion(handleGameMode(data.gameMode));
      actions.setCorrectGuess(data.correctGuess + 1);
      setAnswer('');
      clearInterval(interval)
    }
  }, [data.correctGuess, answer])


  function handleGameMode(type) {
    if (type === 'easy') {
      return actions.generateEasyQuestion();
    } else if (type === 'medium') {
      return actions.generateMediumQuestion();
    } else {
      return actions.generateHardQuestion();
    }
  }



  function displayQuestion() {
    if (operator === '+') {
      return `${firstNumber} + ${secondNumber}`
    } else if (operator === '-') {
      return `${firstNumber} - ${secondNumber}`
    } else if (operator === '/') {
      return `${firstNumber} ÷ ${secondNumber}`
    } else if (operator === '*') {
      return `${firstNumber} x ${secondNumber}`
    }
  }

  const handleChange = (e) => {
    //regex to limit non-numerical input//
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        setAnswer(e.target.value)
    }
  }

  return (
    <div className='game-screen-container'>

      <div className='game-screen'>

        <div className='game-mode-title'>
          <span>{data.gameMode} mode</span>
        </div>

        <div className='question'>
          <span>{displayQuestion()}</span>
        </div>

        <div className='input-section'>
          <input type='text' pattern="[0-9]*" onChange={handleChange} value={answer}/>
        </div>

        <div className='score-and-time'>
          <div className='score'>
            <span className='state-title'>Score</span>
            <span className='state-content'> {data.correctGuess}</span>
          </div>

          <div className='time'>
            <span className='state-title'>Time</span>
            <span className='state-content'>{timer}</span>
          </div>
        </div>
        {
          data.gameOver
          ? (

              <GameOver />

          )
          : null
        }
      </div>

    </div>
  )

}

export default GameScreen;
