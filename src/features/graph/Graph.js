import React from 'react';
import './css/Graph.css';
import Nodes from './Nodes';
import SequentialPath from './SequentialPath';
import NodeConnections from './Connections';

export default function Graph() {
  return (
    <>
      <Nodes />
      <SequentialPath />
      <NodeConnections />
    </>
  );
}
