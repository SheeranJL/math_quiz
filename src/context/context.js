import {react, createContext, useState} from 'react';

export const appContext = createContext();

const Provider = ({children}) => {

  const [gameMode, setGameMode] = useState('tester')
  const [startGame, setStartGame] = useState(false);

  const handleGameMode = () => {

  }


  return (
    <appContext.Provider value={{
        data: {startGame, gameMode},
        actions: {setStartGame, setGameMode}
    }}>
      {children}
    </appContext.Provider>

  )
}

export default Provider;
