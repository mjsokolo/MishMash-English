import { MODES } from './GraphContextMenu';

/**
 * Constructs ordered list of nodes in group
 * @param {list} order - ids in order @example ['a','start','b','end']
 * @param {object} groups - group start and ends @example {start: 'end'}
 * @return {list} nodesMap - order with groups @example ['a', ['start', 'b', 'end']]
 */
export function fetchGroupNodes(order, group) {
  const groupList = [];
  let insideGroup = false;

  // Traverse order & convert group into group list
  for (let i = 0; i < order.length; i += 1) {
    const id = order[i];
    if (group[0] === id) {
      // traversing start of group
      insideGroup = true;
      groupList.push(id);
    } else if (id === group[1]) {
      // traversing end of group id
      insideGroup = false;
      groupList.push(id);
    } else if (insideGroup === true) {
      groupList.push(id);
    }
  }
  return groupList;
}

/**
 * Constructs ordered list of individual nodes and group nodes
 * @example ['a', ['b', 'c', 'd'], 'e', 'f', ['g', 'h']]
 * @param {list} order - ids in order @example ['a','start','b','end']
 * @param {object} groups - group start and ends @example {groupId: ['start', 'end']}
 * @return {list} nodesMap - order with groups @example ['a', ['start', 'b', 'end']]
 */
export function createNodesMapping(order, groups) {
  const nodesMap = [];

  let insideGroup = false;
  let grp = [];

  const groupIds = Object.keys(groups);
  const starts = groupIds.map((id) => groups[id][0]);
  const ends = groupIds.map((id) => groups[id][1]);

  // Traverse order & convert groups into arrays
  for (let i = 0; i < order.length; i += 1) {
    const id = order[i];
    if (insideGroup && !ends.includes(id)) {
      // traversing inside group id
      grp.push(id);
    } else if (insideGroup && ends.includes(id)) {
      // traversing end of group id
      grp.push(id);
      nodesMap.push(grp);
      insideGroup = false;
      grp = [];
    } else if (starts.includes(id)) {
      // traversing start of group id
      insideGroup = true;
      grp = [id];
    } else {
      // traversing ungrouped id
      nodesMap.push(id);
    }
  }
  return nodesMap;
}

/**
 * Constructs dimensions for a group node
 * @param {list} groupNodes - nodes in a group @example ['id1','id2','id3']
 * @param {object} positions - positions of nodes @example {id1: [0,0], id2: [2,4], id3: [5,5]}
 * @return {list} height, width, top, left - css dimensions of group
 */
const GROUPNODE_PADDING = 40;
export function fetchGroupDimensions(groupNodes, positions) {
  // Calculates the top and left position and
  // compensates padding when group is rendered near
  // parent element boundary
  const left = Math.min(
    ...groupNodes.map((node) => Math.max(0, positions[node][0]))
  );
  const top = Math.min(
    ...groupNodes.map((node) => Math.max(0, positions[node][1]))
  );
  // Calculates the right and left position
  // to contains outer-most SingleNodes with padding
  const right = Math.max(
    ...groupNodes.map((node) => {
      let xOffset = 0;
      try {
        // verify that the rightest-most node has rendered
        xOffset = document.getElementById(node).offsetWidth;
      } catch (error) {
        console.log(error);
      }
      return xOffset + positions[node][0];
    })
  );
  const bottom = Math.max(
    ...groupNodes.map((node) => {
      let yOffset = 0;
      try {
        // verify that the lowest-most node has rendered
        yOffset = document.getElementById(node).offsetHeight;
      } catch (error) {
        console.log(error);
      }
      return yOffset + positions[node][1] + GROUPNODE_PADDING;
    })
  );
  // Compile CSS shape and position of GroupNode
  const height = bottom - top;
  const width = right - left;
  return { height, width, top, left };
}

export function legendColor({ boxLabels, connectionLabels }) {
  let color = '';
  let legends = [];
  if (boxLabels && connectionLabels) {
    legends = boxLabels.concat(connectionLabels);
  } else if (boxLabels) {
    legends = boxLabels;
  } else if (connectionLabels) {
    legends = connectionLabels;
  } else {
    return color;
  }
  legends.forEach((label) => {
    color = MODES[label].color;
  });

  return color;
}
