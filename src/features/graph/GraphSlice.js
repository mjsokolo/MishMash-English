import { createSlice } from '@reduxjs/toolkit';

export const GraphSlice = createSlice({
  name: 'graph',
  initialState: {
    connections: new Set([]),
  },
  reducers: {
    add: (state, action) => {
      state.connections.add(action.tail, action.head, action.color);
    },
  },
});

export const { add } = GraphSlice.actions;
export default GraphSlice.reducer;
