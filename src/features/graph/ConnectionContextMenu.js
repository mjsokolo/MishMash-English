import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch } from 'react-redux';

export const ConnectionMenuId = 'connection_menu';

export default function ConnectionContextMenu() {
  // updates State and changes cursor color
  const handleClick = (event, data, element) => {
    const { target, reducerType, dispatch } = data;
    const { id } = target.parentElement.parentElement;
    dispatch({ type: reducerType, payload: {id}  });
  };
  const dispatch = useDispatch();
  return (
    <ContextMenu id={ConnectionMenuId}>
        <MenuItem
          onClick={handleClick}
          data={{reducerType: "deleteConnection", dispatch: dispatch}}
          key='deleteConnection'
          >
          {"Delete"}
        </MenuItem>
    </ContextMenu>
  );
}
