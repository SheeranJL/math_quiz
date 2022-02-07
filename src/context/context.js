import {react, createContext, useState} from 'react';

export const appContext = createContext();

const Provider = ({children}) => {

  const [gameMode, setGameMode] = useState('tester')
  const [startGame, setStartGame] = useState(false);


  function generateEasyQuestion() {

    const operators = ['*', '+', '-'] //List of our mathmatical operations
    const selectOperator = operators[Math.floor(operators.length * Math.random())] //selecting a mathmatical operator at random

    let firstNumber = Math.ceil(Math.random() * 10);  //left side numeral
    let secondNumber = Math.ceil(Math.random() * 10); //right side numeral

    //If the operation is to subtract, but the left side is less than the right side, then reset left side to be more.
    //This prevents negative numbers (as the app won't permit any input other than numerals only (no minus sign))//
    if (selectOperator === '-' && firstNumber < secondNumber) {
      console.log('fixed')
      firstNumber = Math.ceil(Math.random() * (10 - secondNumber) + 10);
    }

    //Function to calculate answer, called in the object below and used in our app to validate input//
    function calculateAnswer(firstNum, lastNum) {
      if (selectOperator === '/') {
        return firstNum / lastNum;
      } else if (selectOperator === '+') {
        return firstNum + lastNum;
      } else if (selectOperator === '-') {
        return firstNum - secondNumber
      } else if (selectOperator === '*') {
        return firstNum * lastNum
      }
    }

    //question object returned to app//
    const question = {
      firstNumber,
      operator: selectOperator,
      secondNumber,
      solution: calculateAnswer(firstNumber, secondNumber),
    }
    return question; //return question object//
  }


  return (
    <appContext.Provider value={{
        data: {startGame, gameMode},
        actions: {setStartGame, setGameMode, generateEasyQuestion}
    }}>
      {children}
    </appContext.Provider>

  )
}

export default Provider;
