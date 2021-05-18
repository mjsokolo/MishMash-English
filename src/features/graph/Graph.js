import React from 'react';
import './Graph.css';
import Nodes from './Nodes';
import SequentialPath from './SequentialPath';

export default function Graph() {
  return (
    <div className="canvas">
      {Nodes()}
      {SequentialPath()}
    </div>
  );
}
