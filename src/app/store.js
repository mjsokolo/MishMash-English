import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from '../features/blocks/BlocksSlice';
import ArgsButtonsReducer from '../features/ArgButtons/ArgButtonsSlice';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
    args: ArgsButtonsReducer,
  },
});
