import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { splitState, getSelectionInfo } from './helpers';
import './Blocks.css';

export const styleMap = {
  TANNA: {
    color: 'blue',
  },
  AMORA: {
    color: 'green',
  },
  AMORA_MIDRASH: {
    color: 'aqua',
  },
  STAM: {
    color: 'purple',
  },
  STAM_MIDRASH: {
    color: 'orange',
  },
  CLEAR: {
    color: 'black',
  },
};

export default function TextField({ id }) {
  const txt = useSelector((state) => state.blocks.present.txts)[id];

  const reduxEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(txt))
  );
  const [localEditorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(txt)))
  );
  const dispatch = useDispatch();

  if (
    reduxEditorState.getCurrentContent().getPlainText() !==
    localEditorState.getCurrentContent().getPlainText()
  ) {
    console.log('infinite loop1');
    setEditorState(reduxEditorState);
  }
  // if (
  //   reduxEditorState.getCurrentInlineStyle() !==
  //   localEditorState.getCurrentInlineStyle()
  // ) {
  //   console.log('infinite loop2'); // this is sometimes triggered a lot
  //   console.log(reduxEditorState.getCurrentInlineStyle());
  //   console.log(localEditorState.getCurrentInlineStyle());
  //   console.log(reduxEditorState.getSelection());
  //   console.log(reduxEditorState.getSelection());

  //   setEditorState(reduxEditorState);
  // }
  if (
    txt !== JSON.stringify(convertToRaw(localEditorState.getCurrentContent()))
  ) {
    console.log('infinite loop3');
    setEditorState(reduxEditorState);
  }
  // Hack to force focus on texteditor after rerender
  let domEditor = 0;
  const setDomEditorRef = (ref) => (domEditor = ref);
  useEffect(() => {
    const element = document.activeElement;
    if (
      element.getAttribute('class') === 'notranslate public-DraftEditor-content'
    ) {
      if (
        element.parentElement.parentElement.parentElement.getAttribute('id') ===
        id
      ) {
        domEditor.focus();
      }
    }
  });

  return (
    <>
      <div className="text_editor" id={id}>
        <Editor
          ref={setDomEditorRef}
          customStyleMap={styleMap}
          editorState={localEditorState}
          onChange={(state) => {
            const justSelection =
              state.getCurrentContent().getPlainText() ===
              localEditorState.getCurrentContent().getPlainText();
            setEditorState(state);
            if (justSelection) {
              dispatch({
                type: 'updateSelection',
                payload: {
                  id,
                  split: splitState(state),
                  selection: getSelectionInfo(state),
                },
              });
            } else {
              dispatch({
                type: 'updateText',
                payload: {
                  id,
                  txt: JSON.stringify(convertToRaw(state.getCurrentContent())),
                  split: splitState(state),
                  selection: getSelectionInfo(state),
                },
              });
            }
          }}
        />
      </div>
    </>
  );
}
