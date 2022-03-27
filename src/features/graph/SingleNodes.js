import React from 'react';
import propTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ContextMenuTrigger } from 'react-contextmenu';
import HistoricalStyles from '../../config/HistoricalStyles';
import { NODE_MENU_ID } from './GraphContextMenu';
import { legendColor } from './helpers';
import NodeLegend from './NodeLegend';
import './css/Nodes.css';

export default function SingleNodes() {
  const order = useSelector((state) => state.blocks.present.order);
  const nodes = order.map((element) => (
    <SingleNode id={element} key={element} />
  ));
  return nodes;
}

function SingleNode(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const position = useSelector((state) => state.blocks.present.positions[id]);
  const txt = useSelector((state) => state.blocks.present.txts[id]);
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  const boxLabels = useSelector(
    (state) => state.blocks.present.graph.boxes[id]
  );
  const connectionLabels = useSelector((state) =>
    state.blocks.present.graph.connections
      .filter((c) => c[0] === id)
      .map((c) => c[2])
  );
  // determine color of legend and node
  let style = {};
  if (selectedNode === id) {
    style = { backgroundColor: 'gold' };
  } else {
    style = {
      borderColor: legendColor({ boxLabels, connectionLabels }),
    };
  }

  const handleDrag = (e, d) => {
    dispatch({
      type: 'updatePosition',
      payload: {
        id,
        x: d.lastX + d.deltaX,
        y: d.lastY + d.deltaY,
      },
    });
  };
  const x = position[0];
  const y = position[1];
  return (
    <ContextMenuTrigger id={NODE_MENU_ID} key={id} holdToDisplay={-1}>
      <Draggable
        onStop={handleDrag}
        onDrag={handleDrag}
        key={id}
        defaultPosition={{ x, y }}
        bounds={{ left: 0, top: 0 }}
      >
        <fieldset className="node single-node" id={id} style={style}>
          <NodeLegend id={id} />
          <Editor
            readOnly
            customStyleMap={HistoricalStyles}
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(txt))
            )}
            onChange={() => {}}
          />
        </fieldset>
      </Draggable>
    </ContextMenuTrigger>
  );
}
SingleNode.propTypes = {
  id: propTypes.string.isRequired,
};
