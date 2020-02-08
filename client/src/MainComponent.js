import React, { useState, useEffect, useMemo } from 'react'
import TableInfo from './TableInfo'
import parseUtils from './utils/parser'

function MainComponent({ drizzleState, drizzle }) {
  const [selectedId, setSelectedId] = useState();
  const [latestSupplyKey, setLatestSupplyKey] = useState('')
  const [latestSupplyItemsParsed, setLatestSupplyItemsParsed] = useState([])
  const [supplyByIdParsed, setSupplyByIdParsed] = useState([])
  const [supplyByIdKey, setSupplyByIdKey] = useState([])
  const [formVals, setFormVals] = useState({
    locationId: '0x0000',
    temperature: 0,
    condition: '0x00',
  })
  const [startSupplyStackId, setStartSupplyStackId] = useState();
  const { SupplyChainTracker } = drizzleState.contracts
  const supplyLatestData = SupplyChainTracker.getSuppliesLatest[latestSupplyKey]
  const supplyByIdData = SupplyChainTracker.getSupplyLogs[supplyByIdKey]
  // const { transactionStack } = drizzleState;
  // const startSupplyTxHash = transactionStack[startSupplyStackId];
  // console.log(startSupplyTxHash)
  // const txHash = transactionStack[this.state.stackId];

  useEffect(() => {
    const contract = drizzle.contracts.SupplyChainTracker
    const dataKey = contract.methods['getSuppliesLatest'].cacheCall()

    setLatestSupplyKey(dataKey)
  })

  useEffect(() => {
    if (supplyLatestData) {
      const items = parseUtils.bytesStringSplit(supplyLatestData.value)
      const newItems = parseUtils.byteStringSplitItem(items, {
        locationId: 4,
        timeStamp: 8,
        temperature: 2,
        condition: 2,
      })

      setLatestSupplyItemsParsed(newItems)
    }
  }, [supplyLatestData])

  useEffect(() => {
    if (supplyByIdData) {
      const items = parseUtils.bytesStringSplit(supplyByIdData.value)
      const newItems = parseUtils.byteStringSplitItem(items, {
        locationId: 4,
        timeStamp: 8,
        temperature: 2,
        condition: 2,
      })

      setSupplyByIdParsed(newItems)
    }
  }, [supplyByIdData])

  const showDetails = id => {
    const contract = drizzle.contracts.SupplyChainTracker
    const dataKey = contract.methods['getSupplyLogs(uint256)'].cacheCall(id)
    setSelectedId(id);
    setSupplyByIdKey(dataKey)
  }

  const submitForm = isNew => {
    const locationId = formVals.locationId;
    const timeStamp = Math.trunc(Date.now()/1000);
    const temperature = formVals.temperature + 128;
    const condition = formVals.condition;

    if(isNew) {
      const contract = drizzle.contracts.SupplyChainTracker;

      const stackId = contract.methods["startSupply"].cacheSend(locationId, timeStamp, temperature, condition, {
        from: drizzleState.accounts[0]
      });
  
      // setStartSupplyStackId(stackId);

    } else {
      const contract = drizzle.contracts.SupplyChainTracker;

      const stackId = contract.methods["appendSupply"].cacheSend(selectedId, locationId, timeStamp, temperature, condition, {
        from: drizzleState.accounts[0]
      });
    }
  }

  return (
    <div>
      <TableInfo
        isDetails
        show
        showDetails={showDetails}
        data={latestSupplyItemsParsed}
        web3={drizzle.web3}
        formVals={formVals}
        setFormVals={setFormVals}
        submitForm={submitForm}
      />
      <TableInfo
        show={supplyByIdParsed.length > 0}
        web3={drizzle.web3}
        data={supplyByIdParsed}
        web3={drizzle.web3}
        formVals={formVals}
        setFormVals={setFormVals}
        submitForm={submitForm}
      />
    </div>
  )
}

export default MainComponent
