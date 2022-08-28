import React from 'react';
import '../../ContextMenu.css';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';

export const MODES = {
  Scenario: { color: '#222255', types: ['link', 'box'] },
  Ruling: { color: '#222255', types: ['link', 'box'] },
  Reasoning: { color: '#222255', types: ['link'] },
  Heading: { color: '#222255', types: ['link', 'box'] },
  Legend: { color: '#222255', types: ['link', 'box'] },
  Generalization: { color: '#222255', types: ['link', 'box'] },
  Statement: { color: '#ee6677', types: ['link', 'box'] },
  Question: { color: '#ee6677', types: ['link', 'box'] },
  Answer: { color: '#ee6677', types: ['link'] },
  Challenge: { color: '#ee6677', types: ['link'] },
  Resolution: { color: '#ee6677', types: ['link'] },
  'Proof/Support': { color: '#ee6677', types: ['link'] },
  Story: { color: '#ee6677', types: ['link', 'box'] },
  Limitation: { color: '#ee6677', types: ['link'] },
  Dispute: { color: '#ee6677', types: ['link', 'box'] },
  'Halakhic Midrash': { color: '#222255', types: ['link', 'box'] },
  'Our Mishnah': { color: '#222255', types: ['link', 'box'] },
  Excerpt: { color: '#222255', types: ['link', 'box'] },
};

const LAYOUT = {
  Tannaitic: [
    'Scenario',
    'Ruling',
    'Reasoning',
    'Heading',
    '---',
    'Legend',
    'Limitation',
    'Generalization',
    'Halakhic Midrash',
  ],
  Talmud: [
    'Our Mishnah',
    'Excerpt',
    '---',
    'Statement',
    'Question',
    'Answer',
    'Challenge',
    'Resolution',
    'Proof/Support',
    '---',
    'Story',
    'Limitation',
    'Dispute',
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
    if (type === 'link') {
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
          {LAYOUT[book].map((label) => {
            if (label === '---') {
              return <MenuItem>{label}</MenuItem>;
            }
            return (
              <SubMenu title={label} key={label}>
                {MODES[label].types.map((type) => (
                  <>
                    <MenuItem
                      onClick={handleClick}
                      data={{ label, type, dispatch }}
                      key={type}
                    >
                      {type}
                    </MenuItem>
                  </>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
      ))}
    </ContextMenu>
  );
}
export function RemoveBoxMenu() {
  const removeBox = (event, data, element) => {
    const { target, dispatch } = data;
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
