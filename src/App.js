import './App.css';
import React from 'react';
import Blocks from './features/blocks/Blocks';
import HeaderButtons from './features/HeaderButtons/HeaderButtons';
import Graph from './features/graph/Graph';
import { SaveState, LoadState } from './features/HeaderButtons/DownloadButton';

function App() {
  return (
    <div className="App">
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
        <div className="left_panel">
          <Graph />
        </div>
        <div className="right_panel">
          <Blocks />
        </div>
      </div>
    </div>
  );
}

export default App;
