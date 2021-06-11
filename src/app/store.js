import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import blocksReducer from '../features/blocks/BlocksReducer';
import ArgsButtonsReducer from '../features/ArgButtons/ArgButtonsSlice';

export default configureStore({
  reducer: {
    blocks: undoable(blocksReducer, {
      filter: excludeAction([
        'updateId',
        'updateCaret',
        'updatePosition',
        'toggleNote',
        'updateNote',
        'resetMode',
        'setMode',
      ]),
    }),
    args: ArgsButtonsReducer,
  },
});
