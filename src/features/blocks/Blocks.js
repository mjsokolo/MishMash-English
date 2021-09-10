import React from 'react';
import { useSelector } from 'react-redux';
import { Note, ToggleNoteButton } from './Note';
import TextField from './Text';
import './Blocks.css';

export default function Blocks() {
  const order = useSelector((state) => state.blocks.present.order);

  const blocks = order.map((id) => (
    <div className="block" key={id}>
      <TextField id={id} />
      <ToggleNoteButton id={id} />
      <Note id={id} />
    </div>
  ));
  return blocks;
}
