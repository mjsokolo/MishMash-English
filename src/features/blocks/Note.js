import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { toggleNote, updateNote } from './BlocksSlice';
import './Blocks.css';

function Note(dispatch, id, note, view, indent) {
  if (view == false || view == undefined) {
    return <div></div>;
  }
  const n = (
    <TextareaAutosize
      id={id}
      class="note"
      style={{
        marginRight: indent * 10,
      }}
      onSelect={() => dispatch(updateNote(id))}
      onChange={() => dispatch(updateNote(id))}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return 0; // ignore shift clicks
        dispatch(updateNote(id));
      }}
      value={note}
    />
  );
  return n;
}

function ToggleNoteButton(dispatch, id) {
  const toggle = (
    <label class="switch">
      <input type="checkbox" onClick={() => dispatch(toggleNote(id))} />
      <span class="slider round"></span>
    </label>
  );
  return toggle;
}

export { Note, ToggleNoteButton };
