import React from 'react';
import './FontField.css';

export function NodeFontField() {
  function handleChange(e) {
    let zoom = e.target.value;

    if (!Number.isNaN(zoom) && parseInt(zoom)) {
      zoom = parseInt(zoom);
    } else {
      zoom = 100;
    }
    const canvas = document.getElementById('canvas');
    canvas.style.zoom = `${zoom}%`;
    const links = document.getElementById('links');
    links.style.zoom = `${zoom}%`;
  }
  return (
    <form onSubmit={(e) => e.preventDefault()} id="node-font-field">
      {'⬛ 🔎'}
      <input
        id="node-font-field-input"
        type="text"
        maxLength="3"
        size="1"
        defaultValue="100"
        onChange={handleChange}
      />
    </form>
  );
}

export function BlocksFontField() {
  function handleChange(e) {
    let zoom = e.target.value;

    if (!Number.isNaN(zoom) && parseInt(zoom)) {
      zoom = parseInt(zoom);
    } else {
      zoom = 100;
    }
    const blocks = document.getElementById('blocks-selecting-area');
    blocks.style.zoom = `${zoom}%`;
    // scroll to the beginning of the text
    blocks.scrollLeft = blocks.scrollWidth - blocks.clientWidth;
  }
  return (
    <form onSubmit={(e) => e.preventDefault()} id="node-font-field">
      <input
        id="node-font-field-input"
        type="text"
        maxLength="3"
        size="1"
        defaultValue="100"
        onChange={handleChange}
      />
      {'🔍אב'}
    </form>
  );
}
