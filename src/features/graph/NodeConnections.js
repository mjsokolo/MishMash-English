import { useSelector } from 'react-redux';
import { ContextMenuTrigger } from 'react-contextmenu';
import React from 'react';
import Xarrow from 'react-xarrows';
import { MODES } from './GraphContextMenu';
import { ConnectionMenuId } from './ConnectionContextMenu';
import './css/NodeConnections.css';


export default function NodeConnections() {
  const connections = useSelector(
    (state) => state.blocks.present.graph.connections
  );
  // triggers re-render on state change
  const positions = useSelector((state) => state.blocks.present.positions);
  var test = -50;
  const anchors = {}
  return connections.map((connection) => {
    const start = connection[0];
    const end = connection[1];
    const mode = connection[2];
    
    anchors.hasOwnProperty(start) ? anchors[start] += 1 : anchors[start] = 0;
    anchors.hasOwnProperty(end) ? anchors[end] += 1 : anchors[end] = 0;

    var sideStartOffset = anchors[start]
    if (sideStartOffset % 2 === 0) {sideStartOffset/=-2}
    var sideEndOffset = anchors[end]
    if (sideEndOffset % 2 === 0) {sideEndOffset/=-2}

    var longStartOffset =anchors[start]
    

    const yspacing = 20
    const xspacing = 20

    return (
      <ContextMenuTrigger id={ConnectionMenuId} key={start+end+mode}>
      <Xarrow
        key={start + end + mode}
        id={start + end + mode}
        start={start}
        end={end}
        startAnchor = {[
          {position: "right", offset: {bottomness: yspacing*sideStartOffset, rightness:0}}, 
          {position: "left", offset: {bottomness: yspacing*sideStartOffset, rightness:0}},
          {position: "bottom", offset: {bottomness: 0, rightness: xspacing*longStartOffset}},
          {position: "top", offset: {bottomness: 0, rightness: xspacing*longStartOffset}}
        ]}
        endAnchor = {[
          {position: "right", offset: {bottomness: yspacing*sideEndOffset, rightness: 0}}, 
          {position: "left", offset: {bottomness: yspacing*sideEndOffset, rightness: 0}},
          {position: "bottom", offset: {bottomness: 0, rightness: xspacing*longStartOffset}},
          {position: "top", offset: {bottomness: 0, rightness: xspacing*longStartOffset}}
        ]}
        strokeWidth={3}
        headSize={5}
        lineColor={MODES[mode].color}
        headColor={MODES[mode].color}
        arrowBodyProps = {{className: "arrow_body"}}
        arrowHeadProps = {{className: "arrow_head"}}
        SVGcanvasProps = {{className: "svg"}}
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
