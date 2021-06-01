// import { createSlice } from '@reduxjs/toolkit';

// export const GraphSlice = createSlice({
//   name: 'graph',
//   initialState: {
//     connections: [], //new Set([]),
//     cursor: '',
//     id: 0,
//   },
//   reducers: {
//     add: (state, action) => {
//       state.connections.add(action.tail, action.head, action.color);
//     },
//     SET_CURSOR: (state, action) => {
//       state.cursor = action.payload;
//     },
//   },
// });

// export const { add } = GraphSlice.actions;
// export default GraphSlice.reducer;

const initialState = {
  connections: [],
  cursor: '',
  id: 0,
};

export default function GraphReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURSOR':
      return {
        ...state,
        cursor: action.payload,
      };
    default:
      return state;
  }
}
