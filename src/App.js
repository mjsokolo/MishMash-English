import './App.css';
import React from 'react';
import Blocks from './features/blocks/Blocks';
import HeaderButtons from './features/HeaderButtons/HeaderButtons';
import Graph from './features/graph/Graph';

function App() {
  return (
    <div className="App">
      <div className="graph">{Graph()}</div>
      <div className="right_panel">
        {HeaderButtons()}
        <Blocks />
      </div>
    </div>
  );
}

export default App;
