import React, { useEffect, useState, useReducer, useRef } from 'react';
import autosize from 'autosize';
import TextArea from './TextArea';

// export const initialState = {
//   activeChunk: 0,
//   caret: 0,
//   chunks: {
//     id0: {
//       indent: 0,
//       txt: 'hi',
//     },
//   },
// };

// function textUpdateReducer(state, action) {
//   console.log(action);

//   return {
//     ...state,
//     activeId: action.id,
//     caret: action.caret,
//     chunks: {
//       ...state.chunks,
//       id0: { ...state.chunks[action.id], txt: action.txt },
//     },
//   };
// }

// export default function TestApp() {
//   return <>{TextArea2('id0')}</>;
// }

// function TextArea2(id) {
//   const [state, dispatch] = useReducer(textUpdateReducer, initialState);
//   const textRef = useRef(null);
//   console.log(textRef);

//   const f = () =>
//     dispatch({
//       txt: textRef.current.value,
//       caret: textRef.current.selectionStart,
//       id: id,
//     });

//   return (
//     <textarea ref={textRef} onChange={f} onClick={f} onSelect={f}>
//       {state.chunks[id].txt}
//     </textarea>
//   );
// }

const initialState = {
  activeChunk: 0,
  caret: 0,
  chunks: [
    {
      id: 1,
      txt: 'hello world',
    },
  ],
};
onChange = (text) => {
    setState(state =>{...state,
                        chunks:[
                            {id:1, txt: text}
                        ]})
}

export default function Parent() {
  const [state, setState] = useState(initialState);
  const toRender = [];
  for (var i = 0; i < Object.keys(state.chunks).length; i++) {
    toRender.push(child(state.chunks[i]));
  }
  return toRender;
}

function child(chunk) {
  const ref = useRef(null);
  return (
    <textarea
      ref={ref}
      onChange={() => {
        onChange(ref.value);
      }}
    >
      {chunk.txt}
    </textarea>
  );
}
