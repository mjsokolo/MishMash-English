import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function NodeConnectionListener() {
  const graph = useSelector((state) => state.graph);
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

function onClick(event, graph, dispatch) {
  switch (event.target.classList[0]) {
    case 'react-contextmenu-item': {
      console.log('Entered Connection Mode');
      break;
    }
    case 'node': {
      if (graph.id === null) {
        console.log('Not in Connection Mode');
      } else {
        console.log('In Connection Mode');
        if (graph.id === event.target.id) {
          console.log('Same ID Clicked');
        } else if (graph.connections.includes([graph.id, event.target.id])) {
          console.log('Connection Already in Present');
        } else {
          dispatch({
            type: 'ADD_CONNECTION',
            payload: { connection: [graph.id, event.target.id, graph.mode] },
          });
        }
      }
      dispatch({ type: 'RESET_MODE' });
      break;
    }
    default:
      dispatch({ type: 'RESET_MODE' });
      break;
  }
}
