import TextareaAutosize from 'react-autosize-textarea';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Blocks.css';

function useTrait(initialValue) {
  // forces synchronous updates for caret
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

export default function Text({ id }) {
  const caretCounter = useTrait(0);
  const dispatch = useDispatch();
  const txt = useSelector((state) => state.blocks.present.txts)[id];

  return (
    <TextareaAutosize
      id={id}
      className="text"
      placeholder="paste hebrew here"
      onSelect={() => {
        const e = document.activeElement;
        caretCounter.set(e.selectionStart);
        const c = caretCounter.get();
        dispatch({
          type: 'updateId',
          payload: {
            id: id,
            caret: c,
          },
        });
      }}
      onChange={() => {
        const e = document.activeElement;
        caretCounter.set(e.selectionStart);
        dispatch({
          type: 'updateText',
          payload: {
            id: id,
            txt: document.activeElement.value,
            caret: caretCounter.get(),
          },
        });
      }}
      // onClick={(e) => {
      //   if (e.ctrlKey || e.metaKey || e.shiftKey) return 0; // ignore shift clicks
      //   dispatch(updateCaret(100)); //updateOnSelect(id, dispatch); //dispatch(updateMouseAction(id));
      // }}
      value={txt}
    />
  );
}
