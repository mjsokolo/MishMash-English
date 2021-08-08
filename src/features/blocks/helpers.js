import {
  EditorState,
  SelectionState,
  Modifier,
  convertToRaw,
  RichUtils,
} from 'draft-js';

export function splitState(state) {
  const caret = state.getSelection().getAnchorOffset();
  const end = state.getCurrentContent().getPlainText().length;

  const currentBlockKey = state.getSelection().getAnchorKey();
  const lastBlockKey = state.getCurrentContent().getLastBlock().key;
  const firstBlockKey = state.getCurrentContent().getFirstBlock().key;

  const selectionSlice1 = SelectionState.createEmpty('blockkey').merge({
    anchorKey: currentBlockKey,
    anchorOffset: caret,
    focusOffset: end,
    focusKey: lastBlockKey,
  });
  const selectionSlice2 = SelectionState.createEmpty('blockkey').merge({
    anchorKey: firstBlockKey,
    anchorOffset: 0,
    focusKey: currentBlockKey,
    focusOffset: caret,
  });

  const contentSlice2 = Modifier.removeRange(
    state.getCurrentContent(),
    selectionSlice2,
    'forward'
  );
  const contentSlice1 = Modifier.removeRange(
    state.getCurrentContent(),
    selectionSlice1,
    'forward'
  );

  return {
    slice1: JSON.stringify(convertToRaw(contentSlice1)),
    slice2: JSON.stringify(convertToRaw(contentSlice2)),
  };
}

export function getSelectionInfo(state) {
  const selection = state.getSelection();

  const flag = selection.getAnchorOffset() < selection.getFocusOffset();
  if (flag) {
    return {
      anchorKey: selection.getAnchorKey(),
      anchorOffset: selection.getAnchorOffset(),
      focusKey: selection.getFocusKey(),
      focusOffset: selection.getFocusOffset(),
      isBackward: flag,
    };
  }

  return {
    anchorKey: selection.getFocusKey(),
    anchorOffset: selection.getFocusOffset(),
    focusKey: selection.getAnchorKey(),
    focusOffset: selection.getAnchorOffset(),
    isBackward: flag,
  };
}

export function createSelection({
  anchorKey,
  anchorOffset,
  focusKey,
  focusOffset,
}) {
  return SelectionState.createEmpty('blockkey').merge({
    anchorKey,
    anchorOffset,
    focusKey,
    focusOffset,
    isBackward: false,
  });
}
