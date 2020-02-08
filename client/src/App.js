import React from "react";
import Web3 from "web3";
import logo from "./logo.svg";
import "./App.css";
import { Drizzle, generateStore } from "drizzle";
import MainComponent from "./MainComponent";

import { DrizzleContext } from "drizzle-react";

import "bootstrap/dist/css/bootstrap.min.css";

import SupplyChainTracker from "./contracts/SupplyChainTracker.json";
const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545")
  },
  contracts: [SupplyChainTracker]
};

const drizzleStore = generateStore(options);

const drizzle = new Drizzle(options, drizzleStore);

function App() {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
        <div className="App">
          <DrizzleContext.Consumer>
          <MainComponent/>
          </DrizzleContext.Consumer>
        </div>
    </DrizzleContext.Provider>
  );
}

export default App;
