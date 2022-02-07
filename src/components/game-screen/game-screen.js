import React, {useState, useContext, useEffect} from 'react';
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


  useEffect(() => {
    //On first render, generate a new question//
    if (firstRender) {
      setQuestion(actions.generateEasyQuestion())
      setFirstRender(false);
    }

    //generate a new question on each correct guess//
    if (parseInt(solution) === parseInt(answer)) {
      setQuestion(actions.generateEasyQuestion())
    }

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

      </div>
    </div>
  )

}

export default GameScreen;
