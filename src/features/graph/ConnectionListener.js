import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function onClick(event, graph, dispatch) {
  switch (event.target.classList[0]) {
    case 'react-contextmenu-item': {
      // Entered Connection Mode
      break;
    }
    case 'node': {
      if (graph.selectedNode !== null) {
        // console.log('In Connection Mode');
        if (graph.selectedNode === event.target.id) {
          // console.log('Same ID Clicked');
        } else if (
          graph.connections.includes([graph.selectedNode, event.target.id])
        ) {
          // console.log('Connection Already in Present');
        } else {
          dispatch({
            type: 'addConnection',
            payload: {
              connection: [graph.selectedNode, event.target.id, graph.mode],
            },
          });
        }
      }
      dispatch({ type: 'resetMode' });
      break;
    }
    default:
      dispatch({ type: 'resetMode' });
      break;
  }
}

export default function ConnectionListener() {
  const graph = useSelector((state) => state.blocks.present.graph);
  const dispatch = useDispatch();

  useEffect(() => {
    function f(e) {
      return onClick(e, graph, dispatch);
    }
    document.addEventListener('click', f);
    return () => {
      document.removeEventListener('click', f);
    };
  }, [graph]);
  return <></>;
}
