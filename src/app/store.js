import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import blocksReducer from '../features/blocks/BlocksReducer';
import ArgsButtonsReducer from '../features/ArgButtons/ArgButtonsSlice';
import GraphReducer from '../features/graph/GraphSlice';

export default configureStore({
  reducer: {
    blocks: undoable(blocksReducer, {
      filter: excludeAction([
        'updateId',
        'updateCaret',
        'updatePosition',
        'toggleNote',
        'updateNote',
      ]),
    }),
    args: ArgsButtonsReducer,
    graph: GraphReducer,
  },
});
