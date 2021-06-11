import React from 'react';
import './css/Graph.css';
import Nodes from './Nodes';
import SequentialPath from './SequentialPath';
import GraphContextMenu from './GraphContextMenu';
import NodeConnectionListener from './NodeConnectionListener';
import NodeConnections from './NodeConnections';

export default function Graph() {
  return (
    <div>
      <div className="canvas">
        <Nodes />
        <SequentialPath />
        <NodeConnections />
      </div>
      <GraphContextMenu />
      <NodeConnectionListener />
    </div>
  );
}
