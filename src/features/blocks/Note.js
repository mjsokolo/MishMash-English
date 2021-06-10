import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import './Blocks.css';
import { useSelector, useDispatch } from 'react-redux';

function Note({ id }) {
  const note = useSelector((state) => state.blocks.present.notes[id]);
  const view = useSelector((state) => state.blocks.present.views[id]);
  const dispatch = useDispatch();
  if (view === false || view === undefined) {
    return <div />;
  }
  return (
    <TextareaAutosize
      id={id}
      class="note"
      onSelect={() => dispatch({ type: 'updateNote', payload: { id } })}
      onChange={() => dispatch({ type: 'updateNote', payload: { id } })}
      onClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return 0; // ignore shift clicks
        dispatch({ type: 'updateNote', payload: { id } });
      }}
      value={note}
    />
  );
}

function ToggleNoteButton({ id }) {
  const dispatch = useDispatch();
  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={() => dispatch({ type: 'toggleNote', payload: { id } })}
      />
      <span className="slider round" />
    </label>
  );
}

export { Note, ToggleNoteButton };
