import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch } from 'react-redux';
import '../../ContextMenu.css';

export const GROUP_MENU_ID = 'group-menu';

function extractIds() {
  // returns start and end of selected group
  const selected = document.getElementsByClassName('selected');
  const selectionSize = selected.length;
  let start = false;
  let end = false;
  if (selectionSize > 0) {
    start = selected[0].id;
    end = selected[selectionSize - 1].id;
  }
  return { start, end, selectionSize };
}

export default function GroupContextMenu() {
  const dispatch = useDispatch();
  const group = () => {
    const { start, end, selectionSize } = extractIds();
    if (start && end) {
      dispatch({ type: 'groupIds', payload: { start, end, selectionSize } });
    }
  };

  const ungroup = () => {
    const { start, end, selectionSize } = extractIds();
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
