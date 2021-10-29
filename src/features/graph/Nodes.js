import { useSelector, useDispatch } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ContextMenuTrigger } from 'react-contextmenu';
import React from 'react';
import Draggable from 'react-draggable';
import { NodeMenuId, MODES } from './GraphContextMenu';
import './css/Nodes.css';
import HistoricalStyles from '../../config/HistoricalStyles';

const Node = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const position = useSelector((state) => state.blocks.present.positions[id]);
  const txt = useSelector((state) => state.blocks.present.txts[id]);
  const label = useSelector((state) => state.blocks.present.graph.boxes[id]);
  const selectedNode = useSelector(
    (state) => state.blocks.present.graph.selectedNode
  );
  let style = {};
  if (selectedNode === id) {
    style = { borderColor: 'gold', backgroundColor: 'gold' };
  }

  // determines style for border of node
  let border = '';
  if (label) {
    border = MODES[label].color;
    style.borderColor = border;
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
  const [x, y] = position;
  return (
    <ContextMenuTrigger id={NodeMenuId} key={id} holdToDisplay={-1}>
      <Draggable
        onStop={handleDrag}
        onDrag={handleDrag}
        key={id}
        defaultPosition={{ x, y }}
        position={{ x, y }}
        bounds={{ left: 0, top: 0 }}
      >
        <fieldset className="node" id={id} style={style}>
          <legend className="label" style={{ color: border }}>
            {label}
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
};

export default function Nodes() {
  const order = useSelector((state) => state.blocks.present.order);
  const nodes = order.map((id) => <Node id={id} key={id} />);
  return nodes;
}
