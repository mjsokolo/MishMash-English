import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DownloadButton.css';

function downloadObjectAsJson(exportObj, exportName) {
  let dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function SaveState() {
  const s = useSelector((state) => state.blocks.present);
  // const positions = useSelector((state) => state.blocks.present.positions);
  const [name, setName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    downloadObjectAsJson(s, name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {'Save File '}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
}

export function LoadState() {
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(file.name);
    const file = document.getElementById('file').files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const state = JSON.parse(reader.result);
      console.log(state);
      dispatch({
        type: 'loadState',
        payload: {
          state,
        },
      });
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="file" name="file" className="inputfile" />
      {/* <label for="file">Load File:</label> */}
      <input type="submit" value="Load" />
    </form>
  );
}
