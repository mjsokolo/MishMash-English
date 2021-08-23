import './App.css';
import React from 'react';
import Blocks from './features/blocks/Blocks';
import HeaderButtons from './features/HeaderButtons/HeaderButtons';
import Graph from './features/graph/Graph';
import { SaveState, LoadState } from './features/HeaderButtons/DownloadButton';

function App() {
  return (
    <div className="App">
      <div className="load_save_buttons">
        <SaveState />
        <LoadState />
      </div>
      <div className="graph">{Graph()}</div>
      <div className="right_buttons">
        <HeaderButtons />
      </div>
      <div className="right_panel">
        <Blocks />
      </div>
    </div>
  );
}

export default App;
