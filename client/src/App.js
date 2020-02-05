import React from 'react'
import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'

import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

import { contract, contractAddress, owner } from './contractConfigurations.json'

const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545'),
  },
  contracts: [contract],
}

function App() {
  return (
    <DrizzleProvider options={options}>
      <LoadingContainer>
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
      </LoadingContainer>
    </DrizzleProvider>
  )
}

export default App
