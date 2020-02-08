import React, { useState, useEffect, useContext } from 'react'
// import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'
import MainComponent from './MainComponent'

import 'bootstrap/dist/css/bootstrap.min.css'

function App({ drizzle }) {
  const [loading, setLoading] = useState(true)
  const [drizzleState, setDrizzleState] = useState()

  useEffect(() => {
    const unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        setLoading(false)
        setDrizzleState(drizzleState)
      }
    })

    return unsubscribe
  }, [])

  return (
    <div className="App">
      {!loading && drizzleState && (
        <MainComponent drizzleState={drizzleState} drizzle={drizzle} />
      )}
      {(loading || !drizzleState) && <div>loading</div>}
    </div>
  )
}

export default App
