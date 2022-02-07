import {react, createContext, useState} from 'react';

export const appContext = createContext();

const Provider = ({children}) => {

  const [gameMode, setGameMode] = useState('tester')
  const [startGame, setStartGame] = useState(false);


  function generateEasyQuestion() {

    const operators = ['*', '+', '-', '/']

    const question = {
      firstNumber: Math.floor(Math.random() * 11),
      operator: operators[Math.floor(operators.length * Math.random())],
      secondNumber: Math.floor(Math.random() * 11),
      solution: 4,
    }
    return question;
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
