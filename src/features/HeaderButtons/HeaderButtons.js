import React from 'react';
import { useDispatch } from 'react-redux';
import './HeaderButtons.css';
import { ActionCreators } from 'redux-undo';

export function MergeButton() {
  const dispatch = useDispatch();
  return (
    <button type="button" onClick={() => dispatch({ type: 'mergeText' })}>
      merge
    </button>
  );
}

export function SplitButton() {
  const dispatch = useDispatch();
  return (
    <button type="button" onClick={() => dispatch({ type: 'splitText' })}>
      split
    </button>
  );
}

export function RedoButton() {
  const dispatch = useDispatch();
  return (
    <button type="button" onClick={() => dispatch(ActionCreators.redo())}>
      redo
    </button>
  );
}

export function UndoButton() {
  const dispatch = useDispatch();
  // const UndoButton = (
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(ActionCreators.undo());
      }}
    >
      undo
    </button>
  );
}

export default function HeaderButtons() {
  return (
    <div className="header_buttons">
      {UndoButton()}
      {RedoButton()}
      {MergeButton()}
      {SplitButton()}
    </div>
  );
}
