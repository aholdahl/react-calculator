import React from 'react';
// import logo from '../logo.svg';
import './App.css';
// import { isFlowPredicate } from '@babel/types';
import Calculator from '../Calculator/Calculator.js';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Calculator/>
    </div>
  );
}

export default App;
