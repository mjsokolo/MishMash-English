import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  SelectionState,
} from 'draft-js';
import { splitState, getSelectionInfo, createSelection } from './helpers';
import './Blocks.css';
import HistoricalStyles from '../../config/HistoricalStyles';

export default function TextField({ id }) {
  const txt = useSelector((state) => state.blocks.present.txts[id]);
  // const activeId = useSelector((state) => state.blocks.present.activeId);
  const selectionInfo = useSelector(
    (state) => state.blocks.present.selections[id]
  );
  let selection = null;
  if (selectionInfo == null) {
    selection = SelectionState.createEmpty();
  } else {
    selection = createSelection(selectionInfo);
  }
  const reduxEditorState = EditorState.forceSelection(
    EditorState.createWithContent(convertFromRaw(JSON.parse(txt))),
    selection
  );
  const [localEditorState, setEditorState] = useState(() =>
    EditorState.forceSelection(
      EditorState.createWithContent(convertFromRaw(JSON.parse(txt))),
      selection
    )
  );
  const dispatch = useDispatch();

  // Force local state to always be reduxEditorState on rerender
  if (
    txt !== JSON.stringify(convertToRaw(localEditorState.getCurrentContent()))
  ) {
    setEditorState(reduxEditorState);
  }
  // Force focus after (re)render
  const activeId = useSelector((state) => state.blocks.present.activeId);
  let domEditor = 0;
  const setDomEditorRef = (ref) => (domEditor = ref);
  useEffect(() => {
    // Forces focus to component if active
    if (activeId === id) {
      domEditor.focus();
    }
  });

  return (
    <>
      <div
        className="text_editor"
        id={id}
        onBlur={() =>
          dispatch({
            type: 'updateId',
            payload: {
              id: null,
            },
          })
        }
      >
        <Editor
          ref={setDomEditorRef}
          customStyleMap={HistoricalStyles}
          editorState={localEditorState}
          onChange={(state) => {
            const justSelection =
              state.getCurrentContent().getPlainText() ===
              localEditorState.getCurrentContent().getPlainText();
            setEditorState(state);
            if (justSelection) {
              // UpdateSelection action is excluded from undo/redo
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
