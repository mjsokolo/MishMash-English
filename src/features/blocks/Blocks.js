import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Note, ToggleNoteButton } from './Note';
import Text from './Text';
import './Blocks.css';

export default function Blocks() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.blocks.order);
  const txts = useSelector((state) => state.blocks.txts);
  const indents = useSelector((state) => state.blocks.indents);
  const notes = useSelector((state) => state.blocks.notes);
  const views = useSelector((state) => state.blocks.views);

  const blocks = order.map((id) => (
    <div class="cell">
      {ToggleNoteButton(dispatch, id)}
      {Text(dispatch, id, txts[id], indents[id])}
      {Note(dispatch, id, notes[id], views[id], indents[id])}
    </div>
  ));
  return blocks;
}
