import { createSlice } from '@reduxjs/toolkit';

export const GraphSlice = createSlice({
  name: 'graph',
  initialState: {
    order_connections: new Set([]),
  },
  reducers: {
    addOrderConnection: (state, action) => {
      state.order_connections.add(action.tail, action.head, action.color);
    },
    clearOrderConnections: (state, action) => {
      state.connections.clear();
    },
  },
});

export const { updateColor, updateTail, resetToDragging } = GraphSlice.actions;
export default GraphSlice.reducer;
