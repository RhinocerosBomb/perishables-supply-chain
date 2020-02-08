import React from 'react'
import Table from 'react-bootstrap/Table'

const locationLookup = {
  '0x0000': "Jason's Brewery",
  '0x0001': "Sakib's Warehouse",
  '0x0002': "Kasra's BeerStore",
}

function TableInfo({ isDetails, show, showDetails, data, web3 }) {
  if (!show) {
    return null
  }

  return (
    <Table striped bordered hover>
      <thead>
        <h1>{isDetails && 'Kegs'}</h1>
        <tr>
          {isDetails && <th>ID</th>}
          {!isDetails && <th>stage</th>}
          <th>Location</th>
          <th>TimeStamp</th>
          <th>Temperature</th>
          <th>Condition</th>
          {isDetails && <th>Details</th>}
          {!isDetails && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((fields, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{locationLookup[fields.locationId]}</td>
            <td>
              {new Date(
                web3.utils.hexToNumber(fields.timeStamp) * 1000,
              ).toUTCString()}
            </td>
            <td>{web3.utils.hexToNumber(fields.temperature) - 128}°</td>
            <td>{fields.condition}</td>
            {isDetails && (
              <td>
                <button className="detailsBtn" onClick={() => showDetails(index)}>
                  details
                </button>
              </td>
            )}
            {!isDetails && (
              <td>
                <button className="updateBtn">Update</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableInfo
