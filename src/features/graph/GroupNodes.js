import React from 'react';
import { useSelector } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import { fetchGroupNodes, fetchGroupDimensions } from './helpers';
import { NODE_MENU_ID, MODES } from './GraphContextMenu';
import NodeLegend from './NodeLegend';
import './css/Nodes.css';

export default function GroupNodes() {
  const positions = useSelector((state) => state.blocks.present.positions);
  const groups = useSelector((state) => state.blocks.present.groups);
  const order = useSelector((state) => state.blocks.present.order);
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  const boxes = useSelector((state) => state.blocks.present.graph.boxes);
  // forces update when text changes (could effect the size of node
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
    const boxLabels = boxes[key];
    let border = '';
    if (boxLabels) {
      boxLabels.forEach((label) => {
        border = MODES[label].color;
        style.borderColor = border;
      });
    } else {
      border = '';
    }

    // border style for arrows
    if (connections) {
      connections.forEach((c) => {
        border = MODES[c[2]].color;
        style.borderColor = border;
      });
    } else {
      border = '';
    }

    return (
      <ContextMenuTrigger id={NODE_MENU_ID} key={key} holdToDisplay={-1}>
        <fieldset id={key} className="node group-node" style={style}>
          <legend className="legend" style={{ color: border }}>
            <NodeLegend id={key} />
          </legend>
        </fieldset>
      </ContextMenuTrigger>
    );
  });

  return groupNodes;
}
