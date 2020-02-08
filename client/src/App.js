import React from 'react'
import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'

import MainComponent from './MainComponent'

import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

import 'bootstrap/dist/css/bootstrap.min.css';

import SupplyChainTracker from './contracts/SupplyChainTracker.json'
console.log(SupplyChainTracker);
const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545'),
  },
  contracts: [SupplyChainTracker],
}


function App() {
  return (
    <DrizzleProvider options={options}>
      <LoadingContainer>
        <div className="App">

          <MainComponent></MainComponent>
         
        </div>
      </LoadingContainer>
    </DrizzleProvider>
  )
}

export default App
