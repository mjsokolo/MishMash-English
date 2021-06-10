import React from 'react';
import { useSelector } from 'react-redux';
import { Note, ToggleNoteButton } from './Note';
import Text from './Text';
import './Blocks.css';

export default function Blocks() {
  const order = useSelector((state) => state.blocks.present.order);

  const blocks = order.map((id) => (
    <div className="cell" key={id}>
      <ToggleNoteButton id={id} />
      <Text id={id} />
      <Note id={id} />
    </div>
  ));
  return blocks;
}
