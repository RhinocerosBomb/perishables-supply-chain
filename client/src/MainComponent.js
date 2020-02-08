import React, { useState, useEffect, useMemo } from 'react'
import TableInfo from './TableInfo'
import parseUtils from './utils/parser'

function MainComponent({ drizzleState, drizzle }) {
  const [latestSupplyKey, setLatestSupplyKey] = useState('')
  const [latestSupplyItemsParsed, setLatestSupplyItemsParsed] = useState([])
  const [SupplyByIdParsed, setSupplyByIdParsed] = useState([])
  const [SupplyByIdKey, setSupplyByIdKey] = useState([])
  const { SupplyChainTracker } = drizzleState.contracts
  const supplyLatestData = SupplyChainTracker.getSuppliesLatest[latestSupplyKey]
  const supplyByIdData = SupplyChainTracker.getSupplyLogs[SupplyByIdKey]

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
    console.log(id)
    const contract = drizzle.contracts.SupplyChainTracker
    console.log(contract.methods)
    const dataKey = contract.methods['getSupplyLogs(uint256)'].cacheCall(id)

    setSupplyByIdKey(dataKey)
  }

  return (
    <div>
      <TableInfo
        isDetails
        show
        showDetails={showDetails}
        data={latestSupplyItemsParsed}
        web3={drizzle.web3}
      />
      <TableInfo
        show={SupplyByIdParsed.length > 0}
        web3={drizzle.web3}
        data={SupplyByIdParsed}
        web3={drizzle.web3}
      />
    </div>
  )
}

export default MainComponent
