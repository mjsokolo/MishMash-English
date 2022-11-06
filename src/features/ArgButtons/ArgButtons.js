import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { updateColor, updateTail, resetToDragging } from './ArgButtonsSlice';

export default function ArgButtons() {
  dispatch = useDispatch();

  const handleClick = (e) => {
    console.log('A click was made');
    console.log(e.target.id);
    //
  };

  useEffect(() => {
    // adds universal click listener
    window.addEventListener('click', handleClick);
    // cleanup listener
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="arg_buttons">
      <button type="button" onClick={() => dispatch(updateColor('red'))}>
        red
      </button>
      <button type="button" onClick={() => dispatch(updateColor('green'))}>
        green
      </button>
      <button type="button" onClick={() => dispatch(updateColor('blue'))}>
        blue
      </button>
    </div>
  );
}
