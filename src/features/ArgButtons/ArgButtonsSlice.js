import { createSlice } from '@reduxjs/toolkit';

export const ArgButtonsSlice = createSlice({
  name: 'args',
  initialState: {
    connection_color: null, // color of current selected arrow type
    tail_selected: false, // specifies if prior click was on valid node
    tail_id: null, // id of prior node click
  },
  reducers: {
    updateColor: (state, action) => {
      state.connection_color = action.color;
      state.tail_selected = false;
      state.tail_id = null;
    },
    updateTail: (state, action) => {
      state.tail_selected = true;
      state.tail_id = action.id;
    },
    resetToDragging: (state) => {
      state.connection_color = null;
      state.tail_selected = false;
      state.tail_id = null;
    },
  },
});

export const {
  updateColor,
  updateTail,
  resetToDragging,
} = ArgButtonsSlice.actions;
export default ArgButtonsSlice.reducer;
