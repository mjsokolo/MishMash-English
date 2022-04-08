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
  groups: {},
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
  graph: {
    connections: [],
    mode: null,
    selectedNode: null,
    boxes: { id1: [] },
  },
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

      // backwards-compatibility change
      // Add a groups state if it doesn't already exist
      const groups = action.payload.state.groups || {};

      // backwards-compatibility change
      // makes boxes into lists
      const boxes = { ...action.payload.state.graph.boxes };
      const newBoxes = {};

      // get all the groups and the order
      const { order } = action.payload.state;
      const allNodes = Object.keys(groups).concat(order);

      allNodes.forEach((node) => {
        if (Array.isArray(boxes[node])) {
          newBoxes[node] = boxes[node];
        } else if (typeof boxes[node] === 'string') {
          newBoxes[node] = [boxes[node]];
        } else {
          newBoxes[node] = [];
        }
      });

      return {
        ...action.payload.state,
        groups,
        positions: updatedPositions,
        graph: {
          ...action.payload.state.graph,
          boxes: { ...newBoxes },
        },
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
        graph: {
          ...state.graph,
          boxes: { ...state.graph.boxes, [id2]: [] },
        },
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

      // Move merged box labels
      let newBoxes = { ...state.graph.boxes };
      newBoxes[id1] = newBoxes[id1].concat(newBoxes[id2]);
      // Remove duplicate box labels
      delete newBoxes[id2];

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

      // Adjust groups state if merges occur on GroupNode Boundaries
      const { groups } = state;
      const newGroups = {};
      Object.keys(groups).map((key) => {
        if (id2 === groups[key][0]) {
          // the starting node of a group is merging with node outside of group
          newGroups[key] = [state.order[idx + 1], groups[key][1]];
        } else if (id2 === groups[key][1]) {
          // the ending node of a group is merging with the penultimate node of group
          newGroups[key] = [groups[key][0], state.order[idx - 1]];
        } else {
          // the merging node is not a defining node of a group
          newGroups[key] = groups[key];
        }
        // remove group, it's box, and connections if the end node is the same as start node
        if (newGroups[key][0] === newGroups[key][1]) {
          delete newGroups[key]; // delete group
          // delete any connections of the deleted group
          const temp = [...newConnections];
          newConnections = [];
          temp.forEach((c) => {
            if (key !== c[0] && key !== c[1]) {
              newConnections.push(c);
            }
          });
        }
      });

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
        graph: { ...state.graph, connections: newConnections, boxes: newBoxes },
        groups: newGroups,
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
    case 'addBox': {
      const { label, id } = action.payload;

      let boxes = [];
      // fetch boxes if they already exist
      if (id in state.graph.boxes) {
        boxes = [...state.graph.boxes[id]];
      }
      // add label if label is new
      if (!boxes.includes(label)) {
        boxes.push(label);
      }

      return {
        ...state,
        graph: {
          ...state.graph,
          boxes: {
            ...state.graph.boxes,
            [id]: boxes,
          },
        },
      };
    }
    case 'removeBox': {
      const { id, label } = action.payload;
      let boxes = [...state.graph.boxes[id]];

      boxes = boxes.filter(function (value, index, arr) {
        return value !== label;
      });

      return {
        ...state,
        graph: { ...state.graph, boxes: { ...state.graph.boxes, [id]: boxes } },
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
    case 'groupIds': {
      const { start, end, selectionSize } = action.payload;
      const { order } = state;
      const { groups } = state;
      const groupId = nanoid();

      // Grouping single node is not allowed
      if (start === end) {
        return state;
      }
      // Get array of selected group's ids
      const startIdx = order.indexOf(start);
      const endIdx = order.indexOf(end);
      const selectedGroup = order.slice(startIdx, endIdx + 1);
      // Check that selected group is contiguous, otherwise not allowed
      if (selectionSize !== selectedGroup.length) {
        return state;
      }

      // Get all ids from existing groups
      const idsInExistingGroups = new Set();
      Object.keys(groups).forEach((groupId) => {
        const group = groups[groupId];
        const sIdx = order.indexOf(group[0]);
        const eIdx = order.indexOf(group[1]);
        const ids = order.slice(sIdx, eIdx + 1);
        ids.forEach((id) => idsInExistingGroups.add(id));
      });

      // Checks that the selected group is valid:
      // No id in selected group should exist within a pre-existing group
      let containsElement = false;
      selectedGroup.forEach((id) => {
        if (idsInExistingGroups.has(id)) {
          containsElement = true;
        }
      });
      if (containsElement) {
        return state;
      }

      // Returns updated groups object
      return {
        ...state,
        groups: { ...state.groups, [groupId]: [start, end] },
      };
    }
    case 'ungroupIds': {
      const { start, end } = action.payload;
      const { order, groups } = state;

      // Get selection ids
      const startIdx = order.indexOf(start);
      const endIdx = order.indexOf(end);
      const selection = order.slice(startIdx, endIdx + 1);

      // For each group,
      // if any of the selected nodes are in the group,
      // then remove that group, its boxes, and its connections
      const newGroups = { ...groups };
      const newBoxes = { ...state.graph.boxes };
      let newConnections = [...state.graph.connections];

      Object.keys(groups).forEach((groupId) => {
        // Get ids in group
        const g = groups[groupId];
        const sIdx = order.indexOf(g[0]);
        const eIdx = order.indexOf(g[1]);
        const ids = order.slice(sIdx, eIdx + 1);

        // Get ids that are shared by group and selection
        const sharedIds = ids.filter((id) => selection.indexOf(id) !== -1);

        // If group contains selected ids,
        // Remove group & group's boxes and connections
        if (sharedIds.length > 0) {
          delete newGroups[groupId];
          delete newBoxes[groupId];
          newConnections = [];
          const temp = [...state.graph.connections];
          temp.forEach((c) => {
            if (groupId !== c[0] && groupId !== c[1]) {
              newConnections.push(c);
            }
          });
        }
      });

      return {
        ...state,
        groups: newGroups,
        graph: {
          ...state.graph,
          boxes: newBoxes,
          connections: newConnections,
        },
      };
    }
    default:
      return state;
  }
}
