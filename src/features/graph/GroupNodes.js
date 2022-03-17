import { useSelector } from 'react-redux';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import './css/Nodes.css';
import { fetchGroupNodes } from './helpers';
import { NodeMenuId, MODES } from './GraphContextMenu';

const GROUPNODE_PADDING = 10;

function fetchGroupDimensions(groupNodes, positions) {
  // Calculates the top and left position and
  // compensates padding when group is rendered near
  // parent element boundary
  const left = Math.min(
    ...groupNodes.map((node) =>
      Math.max(0, positions[node][0] - GROUPNODE_PADDING)
    )
  );
  const top = Math.min(
    ...groupNodes.map((node) =>
      Math.max(0, positions[node][1] - GROUPNODE_PADDING)
    )
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
      return xOffset + positions[node][0] + GROUPNODE_PADDING;
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
  const height = bottom - top - GROUPNODE_PADDING;
  const width = right - left - GROUPNODE_PADDING;
  return { height, width, top, left };
}

export default function GroupNodes() {
  const positions = useSelector((state) => state.blocks.present.positions);
  const groups = useSelector((state) => state.blocks.present.groups);
  const order = useSelector((state) => state.blocks.present.order);
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  const labels = useSelector((state) => state.blocks.present.graph.boxes);
  // forces update when text changes (could effect the size of node)
  const texts = useSelector((state) => state.blocks.present.txts);

  const groupNodes = Object.keys(groups).map((key) => {
    const group = groups[key];
    const nodes = fetchGroupNodes(order, group);
    const { height, width, top, left } = fetchGroupDimensions(nodes, positions);
    const style = {
      position: 'absolute', // this line seems not work if included directly in css file
      top,
      left,
      height,
      width,
    };
    // Set formatting if active node in select mode
    if (selectedNode === key) {
      Object.assign(style, { borderColor: 'gold', backgroundColor: 'gold' });
    }
    // Set border of the node if labeled
    let border = '';
    const label = labels[key];
    if (label) {
      border = MODES[label].color;
      style.borderColor = border;
    } else {
      border = '';
    }

    return (
      <ContextMenuTrigger id={NodeMenuId} key={key} holdToDisplay={-1}>
        <fieldset id={key} className="node group-node" style={style}>
          <legend className="label" style={{ color: border }}>
            {label}
          </legend>
        </fieldset>
      </ContextMenuTrigger>
    );
  });

  return groupNodes;
}
