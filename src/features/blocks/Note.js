import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import './Blocks.css';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';

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
  const checked = useSelector((state) => state.blocks.present.views[id]);
  const dispatch = useDispatch();
  return (
    <Switch
      checked={checked}
      onChange={() => dispatch({ type: 'toggleNote', payload: { id } })}
      uncheckedIcon={false}
      checkedIcon={false}
      className="switch"
      onColor="#888888"
      onHandleColor="#ffffff"
      offColor="#888888"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.2)"
      height={10}
      width={20}
    />
  );
}

export { Note, ToggleNoteButton };
