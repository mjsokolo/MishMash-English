import './App.css';
import React from 'react';
import Draggable from 'react-draggable';
import GraphContextMenu from './features/graph/GraphContextMenu';
import ConnectionContextMenu from './features/graph/ConnectionContextMenu';
import ConnectionListener from './features/graph/ConnectionListener';
import Blocks from './features/blocks/Blocks';
import HeaderButtons from './features/HeaderButtons/HeaderButtons';
import Graph from './features/graph/Graph';
import { SaveState, LoadState } from './features/HeaderButtons/DownloadButton';

function App() {
  return (
    <div className="App">
      <GraphContextMenu />
      <ConnectionContextMenu />
      <ConnectionListener />
      <div className="top">
        <div className="load_save_buttons">
          <SaveState />
          <LoadState />
        </div>
        <div className="right_buttons">
          <HeaderButtons />
        </div>
      </div>
      <div className="bottom">
        <Draggable className="drag-wrap" handle=".drag-bar">
          <div className="left_panel">
            <div className="drag-bar" />
            <Graph />
          </div>
        </Draggable>
        <div className="right_panel">
          <Blocks />
        </div>
      </div>
    </div>
  );
}

export default App;
