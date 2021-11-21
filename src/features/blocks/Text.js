import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  const dispatch = useDispatch();
  const selectionInfo = useSelector(
    (state) => state.blocks.present.selections[id]
  );
  // Fetch & Create editor state
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(txt))
  );
  // Fetch & Create selection
  let selection = null;
  if (selectionInfo == null) {
    selection = SelectionState.createEmpty();
  } else {
    selection = createSelection(selectionInfo);
  }
  // Create editor state with selection & local state
  const reduxEditorState = EditorState.forceSelection(editorState, selection);
  const [localEditorState, setEditorState] = useState(() =>
    EditorState.forceSelection(editorState, selection)
  );
  // Force local state to always be reduxEditorState on rerender
  if (
    txt !== JSON.stringify(convertToRaw(localEditorState.getCurrentContent()))
  ) {
    setEditorState(reduxEditorState);
  }
  // Force focus after render if active
  const activeId = useSelector((state) => state.blocks.present.activeId);
  const editor = useRef();
  useEffect(() => {
    if (activeId === id) {
      editor.current.focus();
    }
  });

  return (
    <>
      <div
        className="text-editor"
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
          ref={editor}
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
TextField.propTypes = {
  id: PropTypes.string.isRequired,
};
