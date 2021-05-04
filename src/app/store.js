import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from '../features/blocks/BlocksSlice';

export default configureStore({
  reducer: {
    blocks: blocksReducer,
  },
});
