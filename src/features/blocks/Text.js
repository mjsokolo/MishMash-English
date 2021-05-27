import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import './Blocks.css';

export default function Text(dispatch, id, txt, caretCounter) {
  const text = (
    <TextareaAutosize
      id={id}
      class="text"
      placeholder="paste hebrew here"
      // style={{
      //   marginRight: indent * 10,
      // }}
      onSelect={() => {
        const e = document.activeElement;
        console.log(e.selectionStart);
        caretCounter.set(e.selectionStart);
        const c = caretCounter.get();
        console.log(c);
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
  return text;
}
