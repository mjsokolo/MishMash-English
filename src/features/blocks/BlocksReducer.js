import { nanoid } from '@reduxjs/toolkit';

export default function BlocksReducer(
  state = {
    caret: -1,
    activeId: 'id1',
    order: ['id1'],
    txts: {
      id1: '',
    },
    notes: { id1: '' },
    views: { id1: false },
    positions: { id1: [0, 0] },
  },
  action
) {
  switch (action.type) {
    case 'updateId':
      return {
        ...state,
        caret: action.payload.caret,
        activeId: action.payload.id,
      };
    case 'updateText':
      return {
        ...state,
        txts: { ...state.txts, [action.payload.id]: action.payload.txt },
      };
    case 'splitText': {
      const id1 = state.activeId;
      const index = state.order.indexOf(id1);
      const id2 = nanoid();
      const textOne = state.txts[id1].substr(0, state.caret);
      const textTwo = state.txts[id1].substr(state.caret);
      const newOrder = [...state.order];
      newOrder.splice(index + 1, 0, id2);

      const pos = state.positions[id1];
      const newPosition = [pos[0], pos[1] + 50];
      return {
        ...state,
        activeId: id2,
        order: newOrder,
        txts: { ...state.txts, [id1]: textOne, [id2]: textTwo },
        notes: { ...state.notes, [id2]: '' },
        views: { ...state.views, [id2]: false },
        positions: { ...state.positions, [id2]: newPosition },
      };
    }
    case 'mergeText': {
      const id2 = state.activeId;
      const idx = state.order.indexOf(id2);
      if (idx === 0) {
        return state; // not possible to merge up first block
      }
      const id1 = state.order[idx - 1];
      const newOrder = [...state.order];
      newOrder.splice(idx, 1);
      return {
        ...state,
        activeId: id1,
        order: newOrder,
        txts: { ...state.txts, [id1]: state.txts[id1] + state.txts[id2] },
        notes: {
          ...state.notes,
          [id1]: state.notes[id1] + state.notes[id2],
        },
      };
    }
    case 'toggleNote': {
      const { id } = action.payload;
      return { ...state, views: { ...state.views, [id]: !state.views[id] } };
    }
    case 'updateNote': {
      const { id } = action.payload;
      const e = document.activeElement;
      return { ...state, notes: { ...state.notes, [id]: e.value } };
    }
    case 'updatePosition': {
      const { id, x, y } = action.payload;
      return { ...state, positions: { ...state.positions, [id]: [x, y] } };
    }
    default:
      return state;
  }
}
