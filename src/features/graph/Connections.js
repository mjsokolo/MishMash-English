import { useSelector } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import React from 'react';
import Xarrow from 'react-xarrows';
import { MODES } from './GraphContextMenu';
import { ConnectionMenuId } from './ConnectionContextMenu';
import './css/Connections.css';

export default function NodeConnections() {
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  // triggers re-render on state change
  const positions = useSelector((state) => state.blocks.present.positions);
  const anchors = {};
  return connections.map((connection) => {
    const start = connection[0];
    const end = connection[1];
    const mode = connection[2];

    anchors.hasOwnProperty(start)
      ? (anchors[start] += 1)
      : (anchors[start] = 1);
    anchors.hasOwnProperty(end) ? (anchors[end] += 1) : (anchors[end] = 1);
    // start and end offsets begin at index 1 (leaves room for sequential path)

    // console.log(anchors);
    let sideStartOffset = anchors[start];
    if (sideStartOffset % 2 === 0) {
      sideStartOffset /= -2;
    } else {
      sideStartOffset += 1;
      sideStartOffset /= 2;
    }
    let sideEndOffset = anchors[end];
    if (sideEndOffset % 2 === 0) {
      sideEndOffset /= -2;
    } else {
      sideEndOffset += 1;
      sideEndOffset /= 2;
    }
    // console.log(anchors)

    const longStartOffset = anchors[start];

    const yspacing = 10;
    const xspacing = 10;
    console.log(mode, MODES);

    return (
      <ContextMenuTrigger id={ConnectionMenuId} key={start + end + mode}>
        <Xarrow
          key={start + end + mode}
          id={start + end + mode}
          start={start}
          end={end}
          startAnchor={[
            {
              position: 'right',
              offset: { bottomness: yspacing * sideStartOffset, rightness: 0 },
            },
            {
              position: 'left',
              offset: { bottomness: yspacing * sideStartOffset, rightness: 0 },
            },
            {
              position: 'bottom',
              offset: { bottomness: 0, rightness: xspacing * sideStartOffset },
            },
            {
              position: 'top',
              offset: { bottomness: 0, rightness: xspacing * sideStartOffset },
            },
          ]}
          endAnchor={[
            {
              position: 'right',
              offset: { bottomness: yspacing * sideEndOffset, rightness: 0 },
            },
            {
              position: 'left',
              offset: { bottomness: yspacing * sideEndOffset, rightness: 0 },
            },
            {
              position: 'bottom',
              offset: { bottomness: 0, rightness: xspacing * sideEndOffset },
            },
            {
              position: 'top',
              offset: { bottomness: 0, rightness: xspacing * sideEndOffset },
            },
          ]}
          strokeWidth={3}
          headSize={5}
          lineColor={MODES[mode].color}
          headColor={MODES[mode].color}
          arrowBodyProps={{ className: 'arrow_body' }}
          arrowHeadProps={{ className: 'arrow_head' }}
          SVGcanvasProps={{ className: 'svg' }}
          // path="grid"
          label={{
            middle: (
              <div
                className="arrow_label"
                style={{
                  color: MODES[mode].color,
                  transform: 'translate(100%, 0%)',
                }}
              >
                {mode[0]}
              </div>
            ),
          }}
        />
      </ContextMenuTrigger>
    );
  });
}
