import React from 'react';
import './Graph.css';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch } from 'react-redux';
import blue from './cursors/blue.png';
import green from './cursors/green.png';
import pink from './cursors/pink.png';
import purple from './cursors/purple.png';
import red from './cursors/red.png';
import yellow from './cursors/yellow.png';

const MODES = {
  mikrei: { cursor: blue },
  din: { cursor: green },
  taahm: { cursor: pink },
  koteret: { cursor: purple },
  אמירה: { cursor: red },
  שאלה: { cursor: yellow },
  תשובה: { cursor: blue },
  קושיא: { cursor: green },
  תירוץ: { cursor: pink },
  ראיה: { cursor: purple },
  סיוע: { cursor: yellow },
};

const LAYOUT = {
  talmud: ['mikrei', 'din', 'taahm', 'koteret'],
  mishnah: ['אמירה', 'שאלה', 'תשובה', 'קושיא', 'תירוץ', 'ראיה', 'סיוע'],
};

export default function GraphContextMenu() {
  const handleClick = (event, data, element) => {
    const { target, name, dispatch } = data;
    const { id } = target;
    const { cursor } = MODES[name];

    document.body.style.cursor = `url(${cursor}), auto`;
    dispatch({
      type: 'SET_CURSOR',
      payload: { cursor: name, id },
    });
  };
  const dispatch = useDispatch();

  return (
    <ContextMenu id="1" className="context-menu">
      {Object.keys(LAYOUT).map((text) => (
        <SubMenu title={text}>
          {LAYOUT[text].map((category) => (
            <MenuItem onClick={handleClick} data={{ name: category, dispatch }}>
              {category}
            </MenuItem>
          ))}
        </SubMenu>
      ))}
    </ContextMenu>
  );
}
