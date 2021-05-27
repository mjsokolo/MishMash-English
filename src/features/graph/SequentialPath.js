import { useSelector } from 'react-redux';
import React from 'react';
import Xarrow from 'react-xarrows';
import './Graph.css';

export default function SequentialPath() {
  const order = useSelector((state) => state.blocks.present.order);

  const links = {};
  for (let i = 0; i < order.length - 1; i++) {
    links[order[i]] = order[i + 1];
  }

  let path = [];
  Object.keys(links).forEach((key) =>
    path.push(
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
  return path;
}
