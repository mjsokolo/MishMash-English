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
