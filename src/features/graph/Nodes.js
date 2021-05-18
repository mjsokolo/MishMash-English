import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Draggable from 'react-draggable';
import { updatePosition } from '../blocks/BlocksSlice';
import './Graph.css';

const Node = (id, position, txt) => {
  const dispatch = useDispatch();
  const handleDrag = (e, d) => {
    const id = e.srcElement.id;
    dispatch(
      updatePosition({ id: id, x: d.lastX + d.deltaX, y: d.lastY + d.deltaY })
    );
  };
  const [x, y] = position;
  return (
    <div>
      <Draggable
        onStop={handleDrag}
        onDrag={handleDrag}
        key={id}
        defaultPosition={{ x: x, y: y }}
      >
        <div className="nodex" id={id}>
          {txt}
        </div>
      </Draggable>
    </div>
  );
};

export default function Nodes() {
  const positions = useSelector((state) => state.blocks.positions);
  const order = useSelector((state) => state.blocks.order);
  const txts = useSelector((state) => state.blocks.txts);

  const nodes = order.map((id) => Node(id, positions[id], txts[id]));
  return nodes;
}
