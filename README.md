# perishables-supply-chain

## Steps to run it:

```sh
npm run ganache-start //ganache-cli develop
npm run migrate //truffle migrate --reset
cd client
npm start
```
Perishable Beer Suuply Chain:
The goals for the project is to form a blockchain interface to show beer delivery in progress with IoT devices from the brewery, to the warehouse, and then the store. Our definition of consumable beer is that it has to be delivered in less than 3 days under 33 degrees celsius, if beer is kept more than that timeline, it will be non consumable. 
Our preferred goal timeline of delivery is that the IoT devices will be started from the brewery, all beer will be created, it will take one day to be shipped to the warehouse, one more day at the warehouse, and three days at the beer store. Which totals to 5 days. We will be creating an Ethereum public blockchain, with a react interface. An innovative interface with grid of locations of the kegs and temperatures for the day. Graph for each keg, each day. 

Data: 
The data we collected will be from 5 separate parties. Brewer, Shipper #1, Warehouse, Shipper #2, and then finally the retailer. 
The data collected will be transmitted through an IoT device which will be individually attached to each keg that goes through the different stops. 
It will be recording the temperature of the keg (recorded as a uint)
Also it will check the geographical location of the keg at all times up until it is sold. (recorded as a string)
The inputs will be inputted by each party and signed off during the stay of the keg under their name.  

FlowChart:
![](https://github.com/RhinocerosBomb/perishables-supply-chain/blob/master/Screen%20Shot%202020-02-08%20at%2012.39.30%20PM.png)

Type of Architecture: 
An ethereum public blockchain architecture means that the data and access to the system is available to anyone who is willing to participate. In this process records are visible to those take part in the agreement process. In terms of efficiency, the time for each transaction is less eco friendly since it requires a lot of computing power.

Identify Dependencies:
For our public blockchain we will use a local development blockchain that can mimic the behaviour of a public blockchain using Ganache for ethereum Development. This will allow us to deploy smart contracts, develop applications, and run tests on the network. 




## notes
* Due to solidity not being able to return complex dynamic data structures, the logs from the supply chain must by serialized. Therefore, in the dApp the data has to be deserialized to be able to be readable.
* Data in frontend should be represented like this
```javascript
// Note that condition is not received from the smart contract, rather is is determined in the frontend
// after calculated from the timestamp
// For example: if too many days has passed since the last log then condition would be the String "EXPIRED"
[{location, timeStamp, temperature, condition}, {...}, {...}, ...]
```
* The data that is actually received will be a String of concatonated bytes of arbitrary length
  * Data will look like "0x00010000000203..."
  * Each 14 characters after "0x" represents 1 supply chain log. So the string of bytes after "0x" will be sliced in 14 characters each to show each individual entry.
  * "0x" can be discarded.
  * "0001" represents the locationId of 1 but should be represented as a readable string. For ex: "Jason's Brewery". Just hardcode a lookup for a couple ids. For example:
  ```javascript
  const locationNameLookup = {
    "0001": "Jason's Brewery",
    "0002": Sakib's Beer Store,
    //...
  }
   ```
  * "00000002" represents the timestamp in seconds. Therefore must multiply by 1000 to parse into a JS Date object.
  *"03" represents the temperature. To parse into celsius, convert from hex to decimals, then subtract by 128. This will give both positive and negatave temperatures.
