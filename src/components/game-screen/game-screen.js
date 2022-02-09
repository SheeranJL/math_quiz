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
  let [timer, setTimer] = useState(60)
  const [pauseTimer, setPauseTimer] = useState(false);


  useEffect(() => {

    //Timer interval to count down from 60//
    const interval = setInterval(() => {
      if (timer > 0 && data.startGame) {
        setTimer(timer -= 1)
      } else {
        actions.setGameOver(true);
        clearInterval(interval)
      }
    }, 1000)

    if (pauseTimer) {
      clearInterval(interval);
    }

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

    //useEffect to clean up effects after removing from DOM (clear inteval to stop timer)//
    return () => {
      clearInterval(interval)
    }

  }, [data.correctGuess, answer, pauseTimer])


  //Generate questions based on the game mode type//
  function handleGameMode(type) {
    if (type === 'easy') {
      return actions.generateQuestion(10);
    } else if (type === 'medium') {
      return actions.generateQuestion(50);
    } else {
      return actions.generateQuestion(100);
    }
  }


  //Function to render mathmatical operator symbol depending on the question//
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

  //Handle input field value change//
  const handleChange = (e) => {
    //regex to limit non-numerical input//
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        setAnswer(e.target.value)
    }
  }


  const handleExit = () => {
    setPauseTimer(true);
    actions.setStartGame(false);
    actions.setGameOver(false);
    actions.setCorrectGuess(0);
  }



  return (
    <div className='game-screen-container'>
      <div className='game-screen'>
        <div className='game-mode-title'>
          <span>{data.gameMode} difficulty</span>
        </div>

        <div className='question'>
          <span>{displayQuestion()}</span>
        </div>

        <div className='input-section'>
          <input type='text' pattern="[0-9]*" autoFocus onChange={handleChange} value={answer}/>
        </div>

        <div className='score-and-time'>
          <div className='score'>
            <span className='state-title'>Score</span>
            <span className='state-content' style={{color: data.correctGuess > 0 ? 'lime' : 'black'}}> {data.correctGuess}</span>
          </div>

          <div className='time'>
            <span className='state-title'>Time</span>
            <span className='state-content' style={{color: timer > 10 ? 'lime' : 'red'}} >{timer}</span>
          </div>
        </div>
        {
          data.gameOver
          ? (
              <GameOver />
          ): null
        }
        {
          !data.gameOver
          ? (
            <div className='back-button'>
              <span onClick={handleExit}>Exit</span>
            </div>
          )
          : null
        }
      </div>
    </div>
  )

}

export default GameScreen;
