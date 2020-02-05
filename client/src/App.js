import React from 'react';
import logo from './logo.svg';
import './App.css';

import { DrizzleProvider } from 'drizzle-react'; 


import {abi, contractAddress, owner} from './contractConfigurations.json';



const options = {
  contracts: [
    abi,
    contractAddress,
    owner
  ]
}

function App() {
  console.log(abi, contractAddress, owner)
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
