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
      <div className="graph">
        <div className="drag-bar" />
        <div className="canvas">
          <SingleNodes />
          <GroupNodes />
        </div>
        <SequentialPath />
        <NodeConnections />
      </div>
    </Draggable>
  );
}
