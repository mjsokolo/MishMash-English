import React from 'react';
import './css/GraphContextMenu.css';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch } from 'react-redux';
import blue from './cursors/blue.png';
import green from './cursors/green.png';
import pink from './cursors/pink.png';
import purple from './cursors/purple.png';
import red from './cursors/red.png';
import yellow from './cursors/yellow.png';

export const MODES = {
  Mikrei: { cursor: blue, color: 'blue' },
  Din: { cursor: green, color: 'green' },
  Taahm: { cursor: pink, color: 'pink' },
  Koteret: { cursor: purple, color: 'purple' },
  אמירה: { cursor: red, color: 'red' },
  שאלה: { cursor: yellow, color: 'yellow' },
  תשובה: { cursor: blue, color: 'blue' },
  קושיא: { cursor: green, color: 'green' },
  תירוץ: { cursor: pink, color: 'pink' },
  ראיה: { cursor: purple, color: 'purple' },
  סיוע: { cursor: yellow, color: 'yellow' },
};

const LAYOUT = {
  mishnah: ['Mikrei', 'Din', 'Taahm', 'Koteret'],
  talmud: ['אמירה', 'שאלה', 'תשובה', 'קושיא', 'תירוץ', 'ראיה', 'סיוע'],
};

export const contextMenuId = 'node_menu';

export default function GraphContextMenu() {
  // updates State and changes cursor color
  const handleClick = (event, data, element) => {
    const { target, mode, dispatch } = data;
    const { id } = target;
    // document.body.style.cursor = `url(${cursor}), auto`;
    dispatch({ type: 'SET_MODE', payload: { mode, id } });
  };
  const dispatch = useDispatch();

  return (
    <ContextMenu id={contextMenuId} className="context-menu">
      {Object.keys(LAYOUT).map((book) => (
        <SubMenu title={book}>
          {LAYOUT[book].map((mode) => (
            <MenuItem onClick={handleClick} data={{ mode, dispatch }}>
              {mode}
            </MenuItem>
          ))}
        </SubMenu>
      ))}
    </ContextMenu>
  );
}
