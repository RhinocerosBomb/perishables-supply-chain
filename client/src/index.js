import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Drizzle } from 'drizzle'
import Web3 from 'web3'

import SupplyChainTracker from './contracts/SupplyChainTracker.json'
const options = {
  web3: {
    block: false,
    customProvider: new Web3('ws://localhost:8545'),
  },
  contracts: [SupplyChainTracker],
}

const drizzle = new Drizzle(options)

// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// Got API key with google cloud subcription.
// This API key will only be limited to this repo. Forks wont work.

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyCwrqKeHb2B05R8lLbuqzM6mtqzLeD9s24&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: 43.65107, lng: -79.347015 }}>
//     {props.isMarkerShown && (
//       <Marker position={{ lat: 43.65107, lng: -79.347015 }} />
//     )}
//   </GoogleMap>
// ));

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'))
