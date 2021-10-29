import { nanoid } from '@reduxjs/toolkit';
import {
  EditorState,
  SelectionState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from 'draft-js';

const initialState = {
  caret: -1,
  activeId: 'id1',
  order: ['id1'],
  txts: {
    id1: JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent())
    ),
  },
  splits: { id1: { slice1: 0, slice2: 0 } },
  selections: {
    id1: null,
  },
  notes: { id1: '' },
  views: { id1: false },
  positions: { id1: [0, 0] },
  graph: { connections: [], mode: null, selectedNode: null, boxes: {} },
};

export default function BlocksReducer(state = initialState, action) {
  switch (action.type) {
    case 'loadState': {
      const updatedPositions = action.payload.state.positions;

      // Update node positions to avoid unaccesible nodes in Graph
      const xoffset = Object.keys(updatedPositions).reduce(
        (previous, key) => Math.min(updatedPositions[key][0], previous),
        0
      );
      const yoffset = Object.keys(updatedPositions).reduce(
        (previous, key) => Math.min(updatedPositions[key][1], previous),
        0
      );
      Object.keys(updatedPositions).map((key, index) => {
        updatedPositions[key] = [
          updatedPositions[key][0] - xoffset,
          updatedPositions[key][1] - yoffset,
        ];
        return updatedPositions;
      });

      return {
        ...action.payload.state,
        positions: updatedPositions,
      };
    }
    case 'updateId':
      return {
        ...state,
        activeId: action.payload.id,
      };
    case 'updateText':
      return {
        ...state,
        txts: { ...state.txts, [action.payload.id]: action.payload.txt },
        splits: { ...state.splits, [action.payload.id]: action.payload.split },
        selections: {
          ...state.selections,
          [action.payload.id]: action.payload.selection,
        },
      };
    case 'updateSelection':
      return {
        ...state,
        activeId: action.payload.id,
        splits: { ...state.splits, [action.payload.id]: action.payload.split },
        selections: {
          ...state.selections,
          [action.payload.id]: action.payload.selection,
        },
      };
    case 'splitText': {
      // Initialize ids, texts, and order
      const id1 = action.payload.id;
      const index = state.order.indexOf(id1);
      const id2 = nanoid();
      const textOne = state.splits[id1]['slice1'];
      const textTwo = state.splits[id1]['slice2'];
      const newOrder = [...state.order];
      newOrder.splice(index + 1, 0, id2);

      // Set new position of node in graph
      const textOneLength = convertFromRaw(JSON.parse(textOne)).getPlainText()
        .length;
      const textTwoLength = convertFromRaw(JSON.parse(textTwo)).getPlainText()
        .length;

      const OriginalNode1Height = document
        .getElementsByClassName('node')
        .namedItem(id1).clientHeight;

      const newNode1Height =
        (OriginalNode1Height * textOneLength) /
        (textOneLength + textTwoLength + 0.01); // to prevent divisions by zero if text lengths are 0

      const pos = state.positions[id1];
      const newPosition = [pos[0], pos[1] + newNode1Height + 50];

      // Updates new node position if new node is on top of existing node
      const currentPositions = Object.values(state.positions);
      let i = 0;
      while (
        currentPositions.filter(
          (p) => JSON.stringify(p) === JSON.stringify(newPosition)
        ).length > 0
      ) {
        i += 1;
        newPosition[0] += 15;
        newPosition[1] += 15;
        if (i > 5) {
          // Stops after five attempts to change position
          break;
        }
      }

      // Create and Return new state
      return {
        ...state,
        activeId: id2,
        order: newOrder,
        txts: {
          ...state.txts,
          [id1]: textOne,
          [id2]: textTwo,
        },
        splits: {
          ...state.splits,
          [id1]: { slice1: textOne, slice2: textOne },
          [id2]: { slice1: textTwo, slice2: textTwo },
        },
        notes: { ...state.notes, [id2]: '' },
        views: { ...state.views, [id2]: false },
        positions: { ...state.positions, [id2]: newPosition },
      };
    }
    case 'mergeText': {
      const id2 = action.payload.id;
      const idx = state.order.indexOf(id2);
      if (idx === 0) {
        return state; // not possible to merge up first block
      }
      const id1 = state.order[idx - 1];
      const newOrder = [...state.order];
      newOrder.splice(idx, 1);

      // Move merged connections
      let newConnections = state.graph.connections
        .map((connection) =>
          connection.map((id) => {
            if (id === id2) {
              return id1;
            }
            return id;
          })
        )
        .filter((connection) => connection[0] !== connection[1]);
      // Remove Duplicate connections
      const s = new Set(newConnections.map((array) => array.join()));
      newConnections = [...s].map((array) => array.split(','));

      // Creates Merged Content State
      const contentState1 = convertFromRaw(JSON.parse(state.txts[id1]));
      const contentState2 = convertFromRaw(JSON.parse(state.txts[id2]));
      const selectionState2 =
        EditorState.createWithContent(contentState2).getSelection();
      const firstBlockKey = selectionState2.getAnchorKey();
      const insertionSelectionState = SelectionState.createEmpty(
        'blockkey'
      ).merge({
        anchorKey: firstBlockKey,
        anchorOffset: 0,
        focusKey: firstBlockKey,
        focusOffset: 0,
      });
      const mergedContent = Modifier.replaceWithFragment(
        contentState2,
        insertionSelectionState,
        contentState1.getBlockMap()
      );

      return {
        ...state,
        activeId: id1,
        order: newOrder,
        txts: {
          ...state.txts,
          [id1]: JSON.stringify(convertToRaw(mergedContent)),
        },
        splits: {
          ...state.splits,
          [id1]: { slice1: 0, slice2: 0 },
        },
        notes: {
          ...state.notes,
          [id1]: state.notes[id1] + state.notes[id2],
        },
        graph: { ...state.graph, connections: newConnections },
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
    case 'setMode':
      return {
        ...state,
        graph: {
          ...state.graph,
          mode: action.payload.label, // bad variables names
          selectedNode: action.payload.id,
        },
      };
    case 'resetMode':
      return {
        ...state,
        graph: { ...state.graph, mode: null, selectedNode: null },
        mode: '',
        id: null,
      };
    case 'setBox': {
      const { label, id } = action.payload;
      return {
        ...state,
        graph: { ...state.graph, boxes: { ...state.graph.boxes, [id]: label } },
      };
    }
    case 'removeBox': {
      const { id } = action.payload;
      const boxes = { ...state.graph.boxes };
      delete boxes[id];
      return {
        ...state,
        graph: { ...state.graph, boxes: { ...boxes } },
      };
    }
    case 'addConnection':
      // Verify that connection does not already exist
      if (
        state.graph.connections.filter(
          (c) => c.toString() === action.payload.connection.toString()
        ).length > 0 &&
        state.graph.connections.length > 0
      ) {
        return state;
      }
      // Add connection
      return {
        ...state,
        graph: {
          ...state.graph,
          connections: [...state.graph.connections, action.payload.connection],
        },
      };
    case 'deleteConnection': {
      const newConnections = state.graph.connections.filter(
        (connection) =>
          connection[0] + connection[1] + connection[2] !== action.payload.id
      );
      return {
        ...state,
        graph: { ...state.graph, connections: newConnections },
      };
    }
    default:
      return state;
  }
}
