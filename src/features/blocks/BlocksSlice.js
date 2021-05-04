import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export const BlocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    caret: -1,
    activeId: 'id1',
    order: ['id1'],
    indents: { id1: 0 },
    txts: { id1: '' },
    notes: { id1: '' },
    views: { id1: false },
  },
  reducers: {
    // Text Updates
    updateText: (state, action) => {
      const e = document.activeElement;
      if (e.getAttribute('class') !== 'text') {
        // only update when active element
        return state;
      }
      const id = action.payload;
      state.txts[id] = e.value;
      state.caret = e.selectionStart;
      state.activeId = id;
    },
    splitText: (state) => {
      const id = state.activeId;
      const idx = state.order.indexOf(id);
      const id2 = nanoid();
      const caret = state.caret;
      const textOne = state.txts[id].substr(0, caret);
      const textTwo = state.txts[id].substr(caret);
      const newOrder = [...state.order];
      newOrder.splice(idx + 1, 0, id2);

      state = {
        ...state,
        activeId: id2,
        order: newOrder,
        txts: { ...state.txts, [id]: textOne, [id2]: textTwo },
        indents: { ...state.indents, [id2]: 0 },
        notes: { ...state.notes, [id2]: '' },
        views: { ...state.views, [id2]: false },
      };
      return state;
    },
    mergeText: (state) => {
      const id2 = state.activeId;
      const idx = state.order.indexOf(id2);
      if (idx === 0) {
        // not possible to merge up first block
        return state;
      }
      const id1 = state.order[idx - 1];
      const newOrder = [...state.order];
      newOrder.splice(idx, 1);

      state = {
        ...state,
        activeId: id1,
        order: newOrder,
        txts: { ...state.txts, [id1]: state.txts[id1] + state.txts[id2] },
        notes: { ...state.notes, [id1]: state.notes[id1] + state.notes[id2] },
      };
      return state;
    },
    // Tabbing Buttons
    tabOut: (state) => {
      const id = state.activeId;
      state.indents[id] += 1;
    },
    tabIn: (state) => {
      const id = state.activeId;
      if (state.indents[id] > 0) {
        state.indents[id] -= 1;
      }
    },
    // Note Updating
    toggleNote: (state, action) => {
      const id = action.payload;
      if (state.views[id] === true) {
        state.views[id] = false;
      } else {
        state.views[id] = true;
      }
      return state;
    },
    updateNote: (state, action) => {
      const id = action.payload;
      const e = document.activeElement;
      const note = e.value; // .replace(/\n\r?/g, '<br />');
      state.notes[id] = note;
    },
    toggleAllNotes: (state, action) => {
      Object.keys(state.notes).forEach((id) => {
        state.notes[id] = action.status;
      });
    },
  },
});

export const {
  updateText,
  splitText,
  mergeText,
  tabOut,
  tabIn,
  toggleNote,
  updateNote,
  toggleAllNotes,
} = BlocksSlice.actions;
export default BlocksSlice.reducer;
