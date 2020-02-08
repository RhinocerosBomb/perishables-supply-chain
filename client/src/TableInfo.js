import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const locationLookup = {
  '0x0000': "Jason's Brewery",
  '0x0001': "Sami's's Brewery",
  '0x0002': "Sakib's Warehouse",
  '0x0003': "Nrup's Warehouse",
  '0x0004': "Snoop Doggs's Storage",
  '0x0005': "Hulk Hogans's Storage",
  '0x0006': "God's Beer Store",
  '0x0007': "Kasra's Beer Store",
}

const conditionLookup = {
  '0x00': 'Arrival',
  '0x01': 'Transit',
  '0x02': 'Keg Exploded',
  '0x03': 'Expired',
  '0x04': 'IOT Malfunction',
  '0x05': 'Completed Route',
}

function TableInfo({
  isDetails,
  show,
  showDetails,
  data,
  web3,
  formVals,
  setFormVals,
  submitForm
}) {
  const [showModal, setShowModal] = useState(false)

  const getRowColor = condition => {
    if(condition === '0x02' || condition === '0x03' || condition === '0x04') {
      return 'red'
    } else if (condition === '0x05') {
      return 'green';
    } else {
      return null;
    }
  }
  const onSubmit = itemId => {
    submitForm(itemId)
    setShowModal(false)
  }

  if (!show) {
    return null
  }

  return (
    <div>
      {isDetails && (
        <div>
          <h1>Kegs</h1>
          <div
            style={{
              position: 'absolute',
              marginRight: '10px',
              cursor: 'pointer',
              fontSize: '20px',
              top: 0,
              right: 0,
            }}
            onClick={() => setShowModal(true)}
          >
            + New
          </div>
        </div>
      )}
      {!isDetails && <h1>Details</h1>}
      <Table striped bordered hover>
        <thead>
          <tr>
            {isDetails && <th>ID</th>}
            {!isDetails && <th>stage</th>}
            <th>Location</th>
            <th>TimeStamp</th>
            <th>Temperature</th>
            <th>Condition</th>
            {isDetails && <th>Details</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((fields, index) => (
            <tr key={index} style={{backgroundColor: getRowColor(fields.condition)}}>
              <td>{index}</td>
              <td>{locationLookup[fields.locationId]}</td>
              <td>
                {new Date(
                  web3.utils.hexToNumber(fields.timeStamp) * 1000,
                ).toUTCString()}
              </td>
              <td>{web3.utils.hexToNumber(fields.temperature) - 128}°</td>
              <td>{conditionLookup[fields.condition]}</td>
              {isDetails && (
                <td>
                  <button
                    className="detailsBtn"
                    onClick={() => showDetails(index)}
                  >
                    details
                  </button>
                </td>
              )}
            </tr>
          ))}
          {!isDetails && (
            <tr>
              <td>
                <button className="updateBtn" onClick={() => setShowModal(true)}>Update</button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isDetails ? 'Add New Keg' : 'Add New Keg Log'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Location </label>
            <select
              value={formVals.locationId}
              onChange={e =>
                setFormVals({ ...formVals, locationId: e.target.value })
              }
            >
              {Object.keys(locationLookup).map(val => (
                <option value={val} key={val}>{locationLookup[val]}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Temperature(c°)</label>
            <input
              type="number"
              min="-128"
              max="128"
              required
              onChange={e =>
                setFormVals({ ...formVals, temperature: e.target.value })
              }
              value={formVals.temperature}
            />
          </div>
          <div>
            <label>Condition </label>
            <select
              value={formVals.condition}
              onChange={e =>
                setFormVals({ ...formVals, condition: e.target.value })
              }
            >
              {Object.keys(conditionLookup).map(val => (
                <option value={val} key={val}>{conditionLookup[val]}</option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSubmit(isDetails)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableInfo
