import React from "react";

import Table from "react-bootstrap/Table";

import { JwModal } from "./modal";

import { drizzleConnect } from "drizzle-react";
import drizzle from "drizzle";

function TableInfo(props) {
  console.log(props);
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
      <tbody>


        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          {props.isDetails && (
            <td>
              <button className="detailsBtn" onClick={JwModal.open("modal-1")}>
                details
              </button>
              <JwModal id="modal-1">
                <h1>Detail</h1>

                <button onClick={JwModal.close("modal-1")}>Close</button>
              </JwModal>
            </td>
          )}
          {!props.isDetails &&
//something else
<button className="updateBtn" onClick={JwModal.open("modal-1")}>
Update
</button>
          }
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <button className="detailsBtn">details</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <button className="detailsBtn">details</button>
          </td>
        </tr>
      </tbody>
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
