import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HeaderButtons.css';
import { ActionCreators } from 'redux-undo';

export function MergeButton() {
  const dispatch = useDispatch();
  const mergeButton = (
    <button type="button" onClick={() => dispatch({ type: 'mergeText' })}>
      merge
    </button>
  );
  return mergeButton;
}

export function SplitButton() {
  const dispatch = useDispatch();
  const splitButton = (
    <button type="button" onClick={() => dispatch({ type: 'splitText' })}>
      split
    </button>
  );
  return splitButton;
}

export function TabOutButton() {
  const dispatch = useDispatch();
  const tabOutButton = (
    <button type="button" onClick={() => dispatch(ActionCreators.redo())}>
      redo
    </button>
  );
  return tabOutButton;
}

export function TabInButton() {
  const dispatch = useDispatch();
  // const tabInButton = (
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(ActionCreators.undo());
        const x = () => {
          console.log(useSelector((state) => state));
          x();
        };
      }}
    >
      undo
    </button>
  );
  // );
  // return tabInButton;
}

export default function HeaderButtons() {
  return (
    <div class="header_buttons">
      {TabInButton()}
      {TabOutButton()}
      {MergeButton()}
      {SplitButton()}
    </div>
  );
}
