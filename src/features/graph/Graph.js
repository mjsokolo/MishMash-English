import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useRef, useReducer } from 'react';
import Xarrow from 'react-xarrows';
import Draggable from 'react-draggable';

const canvasStyle = {
  position: 'relative',
  height: '50vh',
  width: '100vh',
  background: 'white',
  // display: 'flex',
  // justifyContent: 'space-evenly',
  // alignItems: 'center',
};
const boxStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  border: '2px #999 solid',
  borderRadius: '5px',
  textAlign: 'right',
  width: '125px',
  minHeight: '30px',
  color: 'black',
  fontSize: '0.5em',
  backgroundColor: 'yellow',
  opacity: '.3',
};

const Node = (id, position, txt, callback) => {
  const [x, y] = position;
  return (
    <div class="node">
      <Draggable
        onStop={callback}
        onDrag={callback}
        key={id}
        defaultPosition={{
          x: x,
          y: y,
        }}
      >
        <div id={id} style={boxStyle}>
          {txt}
          {/* {console.log(positions[id])} */}
        </div>
      </Draggable>
    </div>
  );
};

export default function Graph() {
  // const [, setRender] = useState({});
  // const forceRerender = () => setRender({});

  const [positions, setPosition] = useState({ id1: [100, 0] });
  const handleDrag = (e, d) => {
    const id = e.srcElement.id;
    setPosition({
      ...positions,
      [id]: [d.lastX + d.deltaX, d.lastY + d.deltaY],
    });
  };

  const order = useSelector((state) => state.blocks.order);
  const txts = useSelector((state) => state.blocks.txts);
  // order.forEach((id) => {
  //   var count = 0;
  //   if (id in positions) {
  //   } else {
  //     console.log('updating...', id);
  //     setPosition({
  //       ...positions,
  //       [id]: [100, 100],
  //     });
  //   }
  // });
  var c = 0;
  const nodes = order.map((id) => {
    if (id in positions) {
      return Node(id, positions[id], txts[id], handleDrag);
    }
    c += 50;
    return Node(id, [100, c], txts[id], handleDrag);
  });

  return (
    <div style={canvasStyle} id="canvas">
      {nodes}
    </div>
  );
}
