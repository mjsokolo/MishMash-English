import React from 'react';
import './css/GraphContextMenu.css';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';

export const MODES = {
  מקרה: { color: 'MidnightBlue', types: ['arrow', 'box'] },
  דין: { color: 'CadetBlue', types: ['arrow'] },
  טעם: { color: 'DarkSlateGrey', types: ['arrow'] },
  כותרת: { color: 'DarkSlateBlue', types: ['arrow', 'box'] },
  מעשה: { color: 'LightSlateGrey', types: ['arrow', 'box'] },
  אמירה: { color: 'red', types: ['arrow', 'box'] },
  שאלה: { color: 'yellow', types: ['arrow', 'box'] },
  תשובה: { color: 'blue', types: ['arrow'] },
  קושיא: { color: 'green', types: ['arrow'] },
  תירוץ: { color: 'pink', types: ['arrow'] },
  ראיה: { color: 'purple', types: ['arrow'] },
  סיוע: { color: 'yellow', types: ['arrow'] },
  אגדה: { color: 'red', types: ['arrow', 'box'] },
  אוקימתא: { color: 'red', types: ['arrow'] },
};

const LAYOUT = {
  mishnah: ['מקרה', 'דין', 'טעם', 'כותרת', 'מעשה'],
  talmud: [
    'אמירה',
    'שאלה',
    'תשובה',
    'קושיא',
    'תירוץ',
    'ראיה',
    'סיוע',
    'אגדה',
    'אוקימתא',
  ],
};

export const NodeMenuId = 'node_menu';

export default function GraphContextMenu() {
  // updates State and changes cursor color
  const handleClick = (event, data, element) => {
    const { target, label, type, dispatch } = data;
    const { id } = target;
    // document.body.style.cursor = `url(${cursor}), auto`;
    if (type === 'arrow') {
      dispatch({ type: 'setMode', payload: { label, id } });
    } else {
      dispatch({ type: 'setBox', payload: { label, id } });
    }
  };

  const removeBox = (event, data, element) => {
    const { target, dispatch } = data;
    const { id } = target;
    dispatch({ type: 'removeBox', payload: { id } });
  };
  const dispatch = useDispatch();

  return (
    <ContextMenu id={NodeMenuId} className="context-menu">
      <MenuItem onClick={removeBox} data={{ dispatch }} key={'remove'}>
        {'Remove Box'}
      </MenuItem>

      {Object.keys(LAYOUT).map((book) => (
        <SubMenu title={book} key={book}>
          {LAYOUT[book].map((label) => (
            <SubMenu title={label} key={label}>
              {MODES[label].types.map((type) => (
                <MenuItem
                  onClick={handleClick}
                  data={{ label, type, dispatch }}
                  key={type}
                >
                  {type}
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
      ))}
    </ContextMenu>
  );
}
