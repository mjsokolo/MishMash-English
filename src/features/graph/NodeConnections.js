import { useSelector } from 'react-redux';
import React from 'react';
import Xarrow from 'react-xarrows';
import { MODES } from './GraphContextMenu';

export default function NodeConnections() {
  const connections = useSelector((state) => state.graph.connections);
  // triggers re-render on state change
  const positions = useSelector((state) => state.blocks.present.positions);

  return connections.map((connection) => {
    const start = connection[0];
    const end = connection[1];
    const mode = connection[2];
    return (
      <Xarrow
        start={start}
        end={end}
        strokeWidth={3}
        headSize={5}
        lineColor={MODES[mode].color}
        headColor={MODES[mode].color}
        label={{
          middle: (
            <div
              className="node_connection"
              style={{
                color: MODES[mode].color,
                transform: 'translate(100%, 100%)',
              }}
            >
              {mode[0]}
            </div>
          ),
        }}
        path="grid"
      />
    );
  });
}
