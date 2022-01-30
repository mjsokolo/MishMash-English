import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch } from 'react-redux';
import '../../ContextMenu.css';

export const GROUP_MENU_ID = 'group-menu';

function extractIds() {
  // returns start and end of selected group
  const selected = document.getElementsByClassName('selected');
  let start = false;
  let end = false;
  if (selected.length > 0) {
    start = selected[0].id;
    end = selected[selected.length - 1].id;
  }
  return { start, end };
}

export default function GroupContextMenu() {
  const dispatch = useDispatch();
  const group = () => {
    const { start, end } = extractIds();
    if (start && end) {
      dispatch({ type: 'groupIds', payload: { start, end } });
    }
  };

  const ungroup = () => {
    const { start, end } = extractIds();
    if (start && end) {
      dispatch({ type: 'ungroupIds', payload: { start, end } });
    }
  };

  return (
    <ContextMenu id={GROUP_MENU_ID} className="context-menu" hideOnLeave>
      <MenuItem onClick={group}>{'Group'}</MenuItem>
      <MenuItem onClick={ungroup}>{'UnGroup'}</MenuItem>
    </ContextMenu>
  );
}
