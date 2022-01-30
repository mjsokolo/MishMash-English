import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import Selecto from 'react-selecto';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Note, ToggleNoteButton } from './Note';
import TextField from './Text';
import './Blocks.css';
import { GROUP_MENU_ID } from './GroupsContextMenu';

export default function Blocks() {
  const order = useSelector((state) => state.blocks.present.order);
  const [selection, setSelection] = useState(new Set());
  // const addEl = (el) => {
  //   setSelection((prev) => new Set(prev).add(el));
  // };
  // const removeEl = (el) => {
  //   setSelection((prev) => new Set(prev).delete(el));
  // };

  const blocks = order.map((id) => (
    <div className="block" key={id}>
      <TextField id={id} />
      <ToggleNoteButton id={id} />
      <Note id={id} />
    </div>
  ));
  return (
    <>
      <ContextMenuTrigger id={GROUP_MENU_ID} holdToDisplay={-1}>
        <Draggable handle="#drag-bar-blocks">
          <div id="blocks">
            <div id="drag-bar-blocks" />
            <div id="blocks-selecting-area">{blocks}</div>
          </div>
        </Draggable>
      </ContextMenuTrigger>
      <Selecto
        // The container to add a selection element
        // container={document.querySelector('#blocks-selecting-area')}
        // The area to drag selection element (default: container)
        dragContainer={'#blocks-selecting-area'}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={['.text-editor']}
        // Whether to select by click (default: true)
        selectByClick={false}
        // Whether to select from the target inside (default: true)
        selectFromInside={true}
        // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
        continueSelect={false}
        // Determines which key to continue selecting the next target via keydown and keyup.
        // toggleContinueSelect={'shift'}
        // The container for keydown and keyup events
        // keyContainer={window}
        // The rate at which the target overlaps the drag area to be selected. (default: 100)
        hitRate={5}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add('selected');
            el.style.backgroundColor = 'lightgrey';
          });
          e.removed.forEach((el) => {
            el.classList.remove('selected');
            el.style.backgroundColor = 'white';
          });
        }}
      />
    </>
  );
}
