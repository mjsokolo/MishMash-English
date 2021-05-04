import React from 'react';
import { useDispatch } from 'react-redux';
import { mergeText, splitText, tabOut, tabIn } from '../blocks/BlocksSlice';
import './HeaderButtons.css';

export function MergeButton() {
  const dispatch = useDispatch();
  const mergeButton = (
    <button type="button" onClick={() => dispatch(mergeText())}>
      merge
    </button>
  );
  return mergeButton;
}

export function SplitButton() {
  const dispatch = useDispatch();
  const splitButton = (
    <button type="button" onClick={() => dispatch(splitText())}>
      split
    </button>
  );
  return splitButton;
}

export function TabOutButton() {
  const dispatch = useDispatch();
  const tabOutButton = (
    <button type="button" onClick={() => dispatch(tabOut())}>
      tabout
    </button>
  );
  return tabOutButton;
}

export function TabInButton() {
  const dispatch = useDispatch();
  const tabInButton = (
    <button type="button" onClick={() => dispatch(tabIn())}>
      tabin
    </button>
  );
  return tabInButton;
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
