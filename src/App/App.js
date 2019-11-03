import React from 'react';
import './App.css';
import Calculator from '../Calculator/Calculator.js';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="pageTitle">Calculator</h1>
        <p>Note: This is a simple calculator and can only handle one operation on two positive numbers per submission.</p>
      </header>
      <Calculator/>
    </div>
  );
}

export default App;
