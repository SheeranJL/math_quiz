import React, {useContext} from 'react';
import {appContext} from './context/context.js';
import './App.scss';

//Import components//
import Lobby from './components/lobby/lobby.js';
import GameScreen from './components/game-screen/game-screen.js';

const App = () => {

  const {data, actions} = useContext(appContext);

  return (
    <div className="App">
      {
        data.startGame
        ? <GameScreen />
        : <Lobby />
      }
    </div>
  );
}

export default App;
