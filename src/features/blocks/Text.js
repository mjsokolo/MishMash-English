import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { updateText } from './BlocksSlice';
import './Blocks.css';

export default function Text(dispatch, id, txt, indent) {
  const text = (
    <TextareaAutosize
      id={id}
      class="text"
      placeholder="paste hebrew here"
      style={{
        marginRight: indent * 10,
      }}
      onSelect={() => dispatch(updateText(id))}
      onChange={() => dispatch(updateText(id))}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return 0; // ignore shift clicks
        dispatch(updateText(id));
      }}
      value={txt}
    />
  );
  return text;
}
