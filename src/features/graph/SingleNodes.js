import { useSelector, useDispatch } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ContextMenuTrigger } from 'react-contextmenu';
import React from 'react';
import Draggable from 'react-draggable';
import { NODE_MENU_ID, MODES, REMOVE_BOX_MENU_ID } from './GraphContextMenu';
import './css/Nodes.css';
import HistoricalStyles from '../../config/HistoricalStyles';

export default function SingleNodes() {
  const order = useSelector((state) => state.blocks.present.order);
  const nodes = order.map((element) => (
    <SingleNode id={element} key={element} groupPosition={[0, 0]} />
  ));
  return nodes;
}

function SingleNode(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const position = useSelector((state) => state.blocks.present.positions[id]);
  const txt = useSelector((state) => state.blocks.present.txts[id]);
  const boxLabels = useSelector(
    (state) => state.blocks.present.graph.boxes[id]
  );
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  let style = {};
  if (selectedNode === id) {
    style = { borderColor: 'gold', backgroundColor: 'gold' };
  }

  // determines style for border of node
  let border = '';
  if (boxLabels) {
    boxLabels.forEach((label) => {
      border = MODES[label].color;
      style.borderColor = border;
    });
  } else {
    border = '';
  }

  // create box legend
  let legend = '';
  if (boxLabels) {
    legend = boxLabels.map((label) => (
      <div className="label" nodeid={id}>
        <ContextMenuTrigger
          id={REMOVE_BOX_MENU_ID}
          key={id + label}
          holdToDisplay={-1}
          label={label}
        >
          <div nodeid={id} nodelabel={label}>
            {' ⬛ ' + label}
          </div>
        </ContextMenuTrigger>
      </div>
    ));
  }

  // append arrow legend
  let connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  connections = connections.filter((c) => c[0] == id);
  let arrowLegend = '';
  if (connections.length > 0) {
    arrowLegend = connections.map((c) => (
      <div className="label" nodeid={id}>
        {' ◀️ ' + c[2]}
      </div>
    ));
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
        // position={{ x, y }}
        bounds={{ left: 0, top: 0 }}
      >
        <fieldset className="node single-node" id={id} style={style}>
          <legend
            className="legend"
            style={{
              color: border,
            }}
          >
            <div>{arrowLegend}</div>
            <br />
            {legend}
          </legend>
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
