import React from 'react';
import './Graph.css';
import Nodes from './Nodes';
import SequentialPath from './SequentialPath';
import GraphContextMenu from './GraphContextMenu';

export default function Graph() {
  return (
    <div>
      <div className="canvas">
        {Nodes()}
        {SequentialPath()}
      </div>
      {GraphContextMenu()}
    </div>
  );
}
