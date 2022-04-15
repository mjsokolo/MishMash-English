import { React } from 'react';
import Draggable from 'react-draggable';
import './css/Graph.css';
import SingleNodes from './SingleNodes';
import SequentialPath from './SequentialPath';
import NodeConnections from './Connections';
import GroupNodes from './GroupNodes';

export default function Graph() {
  return (
    <Draggable handle=".drag-bar" bounds={{ top: 0 }}>
      <div id="graph">
        <div className="drag-bar" />
        <div id="canvas">
          <SingleNodes />
          <GroupNodes />
        </div>
        <div id="links">
          <SequentialPath />
          <NodeConnections />
        </div>
      </div>
    </Draggable>
  );
}
