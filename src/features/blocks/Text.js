import React, { useState, ReactPropTypes } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  SelectionState,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { splitState, createSelection, getSelectionInfo } from './helpers';
import './Blocks.css';
import { set } from 'lodash';

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
  if (
    reduxEditorState.getCurrentInlineStyle() !==
    localEditorState.getCurrentInlineStyle()
  ) {
    console.log('infinite loop2'); // this is sometimes triggered a lot
    console.log(reduxEditorState.getCurrentInlineStyle());
    console.log(localEditorState.getCurrentInlineStyle());
    console.log(reduxEditorState.getSelection());
    console.log(reduxEditorState.getSelection());

    setEditorState(reduxEditorState);
  }
  if (
    txt !== JSON.stringify(convertToRaw(localEditorState.getCurrentContent()))
  ) {
    console.log('infinite loop3');
    setEditorState(reduxEditorState);
  }

  return (
    <>
      <div className="text_editor" id={id}>
        <Editor
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
              console.log(state.getSelection().getAnchorOffset());
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
