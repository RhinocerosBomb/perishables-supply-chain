import React, { useState, useEffect, useContext } from "react";
import TableInfo from "./TableInfo";
import { DrizzleContext } from "drizzle-react";

function MainComponent(props) {
  const [showTable, setShowTable] = useState(false);
  const [latestSupplyKey, setLatestSupplyKey] = useState();
  const drizzleContext = useContext(DrizzleContext)
    console.log(drizzleContext)
  useEffect(() => {
    //    const dataKey = props.drizzle.contracts.SupplyChainTracker.methods.getSuppliesLatest.call();
    //     setLatestSupplyKey(dataKey);
        // console.log(props)
      // return state.contracts.SupplyChainTracker.storedData[dataKey].value;
  }, []);
//   console.log(props.SupplyChainTracker)
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

export default MainComponent;
