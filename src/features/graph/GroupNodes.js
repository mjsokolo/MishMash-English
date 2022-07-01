import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { ContextMenuTrigger } from 'react-contextmenu';
import { fetchGroupNodes, fetchGroupDimensions, legendColor } from './helpers';
import { NODE_MENU_ID } from './GraphContextMenu';
import NodeLegend from './NodeLegend';
import './css/Nodes.css';

export default function GroupNodes() {
  const positions = useSelector((state) => state.blocks.present.positions);
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.blocks.present.groups);
  const order = useSelector((state) => state.blocks.present.order);
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  const boxes = useSelector((state) => state.blocks.present.graph.boxes);
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
    const boxLabels = boxes[key];
    const connectionLabels = connections
      .filter((c) => c[0] === key)
      .map((c) => c[2]);
    const color = legendColor({ boxLabels, connectionLabels });
    style.borderColor = color;

    const handleStop = (e, d) => {
      dispatch({
        type: 'updateGroupPosition',
        payload: {
          nodes,
          deltaX: d.lastX + d.deltaX,
          deltaY: d.lastY + d.deltaY,
        },
      });
    };

    return (
      <ContextMenuTrigger id={NODE_MENU_ID} key={key} holdToDisplay={-1}>
        <Draggable onStop={handleStop} position={{ x: 0, y: 0 }}>
          <fieldset id={key} className="node group-node" style={style}>
            <NodeLegend id={key} />
          </fieldset>
        </Draggable>
      </ContextMenuTrigger>
    );
  });

  return groupNodes;
}
