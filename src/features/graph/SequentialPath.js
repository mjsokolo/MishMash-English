import { useSelector } from 'react-redux';
import React from 'react';
import Xarrow from 'react-xarrows';

export default function SequentialPath() {
  const order = useSelector((state) => state.blocks.present.order);
  // triggers re-render on state change
  const positions = useSelector((state) => state.blocks.present.positions);

  const links = {};
  for (let i = 0; i < order.length - 1; i += 1) {
    links[order[i]] = order[i + 1];
  }

  const path = [];
  Object.keys(links).forEach((key) =>
    path.push(
      <Xarrow
        key={key}
        start={key}
        end={links[key]}
        strokeWidth={1}
        lineColor="grey"
        headColor="grey"
        dashness
      />
    )
  );
  return path;
}
