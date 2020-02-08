import React, { useState, useEffect } from "react";
import TableInfo from "./TableInfo";
import { drizzleConnect } from "drizzle-react";

function MainComponent(props) {
  const [showTable, setShowTable] = useState(false);
  const [latestSupplyKey, setLatestSupplyKey] = useState();

  useEffect(() => {
    if (props.drizzleStatus.initialized) {
        console.log(props.drizzle)
       const dataKey = props.drizzle.contracts.SupplyChainTracker.methods.getSuppliesLatest.cacheCall();
        setLatestSupplyKey(dataKey);
        console.log(dataKey)
      // return state.contracts.SupplyChainTracker.storedData[dataKey].value;
    }
  }, [props.drizzleStatus.initialized]);
  console.log(props.SupplyChainTracker)
  return (
    <div>
      <TableInfo isDetails show showDetails={() => setShowTable(true)} />
      <TableInfo show={showTable} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state: state,
    drizzleStatus: state.drizzleStatus,
    SupplyChainTracker: state.contracts.SupplyChainTracker
  };
};

export default drizzleConnect(MainComponent, mapStateToProps);
