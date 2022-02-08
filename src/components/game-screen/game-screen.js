import React, {useState, useContext, useEffect, useRef} from 'react';
import {appContext} from '../../context/context.js';

import './game-screen.scss';

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
  const [correctGuess, setCorrectGuess] = useState(0);
  let [timer, setTimer] = useState(10)
  const [pauseTimer, setPauseTimer] = useState(false);


  useEffect(() => {
    //On first render, generate a new question//
    if (firstRender) {
      setQuestion(actions.generateEasyQuestion());
      setFirstRender(false);
    }
    //generate a new question on each correct guess//
    if (parseInt(solution) === parseInt(answer)) {
      setQuestion(actions.generateEasyQuestion());
      setCorrectGuess(correctGuess + 1);
      setAnswer('');
    }

    const interval = setInterval(() => {

      if (timer > 0) {
        setTimer(timer -= 1)
      } else {
        console.log('finished')
        clearInterval(interval)
      }


    }, 1000)

    console.log(timer)

  }, [correctGuess, answer])






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
          <span>Hard mode</span>
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
            <span className='state-content'> {correctGuess}</span>
          </div>

          <div className='time'>
            <span className='state-title'>Time</span>
            <span className='state-content'>{timer}</span>
          </div>
        </div>

      </div>
    </div>
  )

}

export default GameScreen;
