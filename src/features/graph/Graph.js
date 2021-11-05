import { React, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Draggable from 'react-draggable';
import './css/Graph.css';
import Nodes from './Nodes';
import SequentialPath from './SequentialPath';
import NodeConnections from './Connections';

export default function Graph() {
  const [, setRerender] = useState({});
  const forceRerender = () => {
    setRerender({});
  };

  return (
    <Draggable handle=".drag-bar">
      <div className="graph">
        <div className="drag-bar" />
        <TransformWrapper
          id="abc"
          panning={{ disabled: true }}
          onWheel={forceRerender}
          onZoom={forceRerender}
          // onZoomStop={forceRerender}
          options={{
            minScale: 0.1,
            maxScale: 1,
          }}
          doubleClick={{
            disabled: true,
          }}
          centerZoomedOut={true}
        >
          <TransformComponent>
            <div className="canvas">
              <Nodes />
            </div>
          </TransformComponent>
        </TransformWrapper>
        <SequentialPath />
        <NodeConnections />
      </div>
    </Draggable>
  );
}
