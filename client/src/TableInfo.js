import React from "react";

import Table from "react-bootstrap/Table";

import { JwModal } from "./modal";

import { drizzleConnect } from "drizzle-react";
import drizzle from "drizzle";

function TableInfo(props) {
  console.log(props);

  let showDetail = e => {
    props.showDetails();
    console.log("s");
  };

  if (!props.show) {
    return null;
  }
  const elements = ['one', 'two', 'three','four'];
  const element2 = ['table1', 'table2', 'table3','table4'];
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Location</th>
          <th>TimeStamp</th>
          <th>Temperature</th>
          <th>Details</th>
        </tr>
      </thead>

      {props.isDetails && (
        <tbody>

{elements.map((value, index) => {
        return  <tr>
        <td>{index}</td>
        <td>{value}</td>
        <td>Otto</td>
        <td>@mdo</td>

        <td>
          <button className="detailsBtn" onClick={showDetail}>
            details
          </button>
        </td>
      </tr>
      })}

        </tbody>
      )}

      {!props.isDetails && (
        
        <tbody>

{element2.map((value, index) => {
        return <tr>
        <td>{index}</td>
        <td>{value}</td>
        <td>Otto</td>
        <td>@mdo</td>

        <td>
          <button className="updateBtn">Update</button>
        </td>
      </tr>

      })}

        </tbody>
      )}
    </Table>
  );
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    SupplyChainTracker: state.contracts.SupplyChainTracker
  };
};

export default drizzleConnect(TableInfo, mapStateToProps);
