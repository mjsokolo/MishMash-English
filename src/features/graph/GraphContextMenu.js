import React from 'react';
import '../../ContextMenu.css';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';

export const MODES = {
  מקרה: { color: '#222255', types: ['arrow', 'box'] },
  דין: { color: '#222255', types: ['arrow', 'box'] },
  טעם: { color: '#222255', types: ['arrow'] },
  כותרת: { color: '#222255', types: ['arrow', 'box'] },
  מעשה: { color: '#222255', types: ['arrow', 'box'] },
  כלל: { color: '#222255', types: ['arrow', 'box'] },
  אמירה: { color: '#ee6677', types: ['arrow', 'box'] },
  שאלה: { color: '#ee6677', types: ['arrow', 'box'] },
  תשובה: { color: '#ee6677', types: ['arrow'] },
  קושיא: { color: '#ee6677', types: ['arrow'] },
  תירוץ: { color: '#ee6677', types: ['arrow'] },
  ראיה: { color: '#ee6677', types: ['arrow'] },
  סיוע: { color: '#ee6677', types: ['arrow'] },
  אגדתא: { color: '#ee6677', types: ['arrow', 'box'] },
  אוקימתא: { color: '#ee6677', types: ['arrow'] },
  מחלוקת: { color: '#ee6677', types: ['arrow', 'box'] },
};

const LAYOUT = {
  Tannaitic: ['מקרה', 'דין', 'טעם', 'כותרת', 'מעשה', 'אוקימתא', 'כלל'],
  Talmud: [
    'אמירה',
    'שאלה',
    'תשובה',
    'קושיא',
    'תירוץ',
    'ראיה',
    'סיוע',
    'אגדתא',
    'אוקימתא',
    'מחלוקת',
  ],
};

export const NODE_MENU_ID = 'node_menu';
export const REMOVE_BOX_MENU_ID = 'remove_box_menu_id';

export function GraphContextMenu() {
  // updates State and changes cursor color
  const handleClick = (event, data, element) => {
    const { target, label, type, dispatch } = data;
    const { id } = element.firstChild;
    // document.body.style.cursor = `url(${cursor}), auto`;
    if (type === 'arrow') {
      dispatch({ type: 'setMode', payload: { label, id } });
    } else {
      dispatch({ type: 'addBox', payload: { label, id } });
    }
  };

  const dispatch = useDispatch();

  return (
    <ContextMenu id={NODE_MENU_ID} className="context-menu" hideOnLeave>
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

export function RemoveBoxMenu() {
  const removeBox = (event, data, element) => {
    const { target, dispatch } = data;
    console.log(element);
    const label = element.firstChild.getAttribute('nodelabel');
    const id = element.firstChild.getAttribute('nodeid');
    dispatch({ type: 'removeBox', payload: { id, label } });
  };
  const dispatch = useDispatch();

  return (
    <ContextMenu id={REMOVE_BOX_MENU_ID} className="context-menu" hideOnLeave>
      <MenuItem onClick={removeBox} data={{ dispatch }} key={'remove'}>
        {'Remove Box'}
      </MenuItem>
    </ContextMenu>
  );
}
