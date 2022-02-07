import React from 'react';
import './custom.button.scss';

const CustomButton = ({children, onClick, selection}) => {

  function checkSelection() {
    if (children.toLowerCase() === selection) {
      return true;
    }
  }


  return (
    <button
      className={`lobby-button ${checkSelection() ? 'selected' : ''}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton;
