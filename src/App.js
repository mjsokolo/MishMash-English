import './App.css';
import React from 'react';
import Blocks from './features/blocks/Blocks';
import HeaderButtons from './features/HeaderButtons/HeaderButtons';

function App() {
  return (
    <div className="App">
      {HeaderButtons()}
      {Blocks()}
    </div>
  );
}

export default App;
