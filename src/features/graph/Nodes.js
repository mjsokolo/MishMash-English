import { useSelector, useDispatch } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ContextMenuTrigger } from 'react-contextmenu';
import React from 'react';
import Draggable from 'react-draggable';
import { NodeMenuId, MODES } from './GraphContextMenu';
import './css/Nodes.css';
import { styleMap } from '../blocks/Text';

const Node = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const position = useSelector((state) => state.blocks.present.positions[id]);
  const txt = useSelector((state) => state.blocks.present.txts[id]);
  const label = useSelector((state) => state.blocks.present.graph.boxes[id]);

  // determines style for border of node
  let border = '';
  if (label) {
    border = MODES[label].color;
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
    <ContextMenuTrigger id={NodeMenuId} key={id}>
      <Draggable
        onStop={handleDrag}
        onDrag={handleDrag}
        key={id}
        defaultPosition={{ x, y }}
        position={{ x, y }}
      >
        <fieldset className="node" id={id} style={{ borderColor: border }}>
          <legend className="label" style={{ color: border }}>
            {label}
          </legend>
          <Editor
            readOnly
            customStyleMap={styleMap}
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
