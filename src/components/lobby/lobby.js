import React, {useContext, useState} from 'react';
import {appContext} from '../../context/context.js';
import './lobby.scss';

//Import components//
import CustomButton from '../custom-button/custom.button.js';

const Lobby = () => {

  //Hold selection option value when selected//
  const [selection, setSelection] = useState(null);

  //context values//
  const {data, actions} = useContext(appContext);

  //handle the setting of the selection state based on user unput//
  const handleSelectionClick = (e) => {
    setSelection(e.target.textContent.toLowerCase())
  }

  //Handle submission of the app modal form//
  const handleSubmit = async() => {
    // await actions.startTimer(selection)
    actions.setStartGame(true)
    actions.setGameMode(selection);
  }

  return (
    <div className='lobby-page-container'>
      <div className='modal-container'>
        <div className='select-difficulty-title'>
          <span> Select difficulty </span>
        </div>
        <div className='lobby-buttons'>
          <CustomButton onClick={handleSelectionClick} selection={selection}>Easy</CustomButton>
          <CustomButton onClick={handleSelectionClick} selection={selection}>Medium</CustomButton>
          <CustomButton onClick={handleSelectionClick} selection={selection}>Hard</CustomButton>
        </div>
        {
          selection
          ? <span className='continue-button-lobby' onClick={handleSubmit}>Continue</span>
          : null
        }
      </div>
    </div>
  )
}

export default Lobby;
