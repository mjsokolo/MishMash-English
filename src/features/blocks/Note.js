import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import './Blocks.css';

function Note(dispatch, id, note, view) {
  if (view === false || view === undefined) {
    return <div></div>;
  }
  const n = (
    <TextareaAutosize
      id={id}
      class="note"
      onSelect={() => dispatch({ type: 'updateNote', payload: { id: id } })}
      onChange={() => dispatch({ type: 'updateNote', payload: { id: id } })}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return 0; // ignore shift clicks
        dispatch({ type: 'updateNote', payload: { id: id } });
      }}
      value={note}
    />
  );
  return n;
}

function ToggleNoteButton(dispatch, id) {
  const toggle = (
    <label className="switch">
      <input
        type="checkbox"
        onClick={() => dispatch({ type: 'toggleNote', payload: { id: id } })}
      />
      <span class="slider round"></span>
    </label>
  );
  return toggle;
}

export { Note, ToggleNoteButton };
