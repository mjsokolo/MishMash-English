import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Note, ToggleNoteButton } from './Note';
import Text from './Text';
import './Blocks.css';

function useTrait(initialValue) {
  const [trait, updateTrait] = useState(initialValue);
  let current = trait;
  const get = () => current;
  const set = (newValue) => {
    current = newValue;
    updateTrait(newValue);
    return current;
  };
  return {
    get,
    set,
  };
}

export default function Blocks() {
  const order = useSelector((state) => state.blocks.present.order);
  const txts = useSelector((state) => state.blocks.present.txts);
  const notes = useSelector((state) => state.blocks.present.notes);
  const views = useSelector((state) => state.blocks.present.views);

  const caretCounter = useTrait(0);
  const dispatch = useDispatch();

  const blocks = order.map((id) => (
    <div class="cell">
      {ToggleNoteButton(dispatch, id)}
      {Text(dispatch, id, txts[id], caretCounter)}
      {Note(dispatch, id, notes[id], views[id])}
    </div>
  ));
  return blocks;
}
