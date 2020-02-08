import React, {useState} from "react";
import TableInfo from "./TableInfo";

function MainComponent() {
    const [showTable, setShowTable] = useState(false)

  return (
    <div>
      <TableInfo isDetails show showDetails={() => setShowTable(true)}/>
      <TableInfo show={showTable}/>
    </div>
  );
}
export default MainComponent;
