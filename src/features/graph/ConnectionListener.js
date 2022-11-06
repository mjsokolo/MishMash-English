import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function returnNodeParent(target) {
  // returns closest parent of target if
  // if parent is class 'node' or 'react-contextmenu-item
  if (target === document) {
    return false;
  }
  if (target.classList.contains('react-contextmenu-item')) {
    return target;
  }
  if (target.classList.contains('node')) {
    return target;
  }
  return returnNodeParent(target.parentNode);
}

function onClick(event, graph, dispatch) {
  const target = returnNodeParent(event.target);

  if (target === false) {
    dispatch({ type: 'resetMode' });
  } else if (target.classList[0] === 'react-contextmenu-item') {
    // Entered Connection Mode
  } else if (target.classList[0] === 'node') {
    if (graph.selectedNode !== null) {
      // console.log('In Connection Mode');
      if (graph.selectedNode === target.id) {
        // console.log('Same ID Clicked');
      } else if (graph.connections.includes([graph.selectedNode, target.id])) {
        // console.log('Connection Already in Present');
      } else {
        dispatch({
          type: 'addConnection',
          payload: {
            connection: [graph.selectedNode, target.id, graph.mode],
          },
        });
      }
    }
    dispatch({ type: 'resetMode' });
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
