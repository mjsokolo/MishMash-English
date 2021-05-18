import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import Draggable from 'react-draggable';
import './Graph.css';

const Connections = (order) => {
  let links = {};
  for (let i = 0; i < order.length - 1; i++) {
    links[order[i]] = order[i + 1];
  }
  let connections = [];
  Object.keys(links).forEach((key) =>
    connections.push(
      <Xarrow
        start={key}
        end={links[key]}
        strokeWidth={1}
        lineColor="grey"
        dashness={true}
        headColor="grey"
      />
    )
  );
  return connections;
};

const Node = (id, position, txt, callback) => {
  const [x, y] = position;
  return (
    <div>
      <Draggable
        onStop={callback}
        onDrag={callback}
        key={id}
        defaultPosition={{
          x: x,
          y: y,
        }}
      >
        <div className="nodex" id={id}>
          {txt}
        </div>
      </Draggable>
    </div>
  );
};

export default function Graph() {
  const [positions, setPosition] = useState({ id1: [100, 0] });
  const handleDrag = (e, d) => {
    const id = e.srcElement.id;
    setPosition({
      ...positions,
      [id]: [d.lastX + d.deltaX, d.lastY + d.deltaY],
    });
  };

  const order = useSelector((state) => state.blocks.order);
  const txts = useSelector((state) => state.blocks.txts);

  var c = 0;
  const nodes = order.map((id) => {
    if (id in positions) {
      return Node(id, positions[id], txts[id], handleDrag);
    }
    c += 50;
    return Node(id, [100, c], txts[id], handleDrag);
  });

  const connections = Connections(order);

  return (
    <div className="canvas">
      {nodes}
      {connections}
    </div>
  );
}
