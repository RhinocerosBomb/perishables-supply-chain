# perishables-supply-chain

## Steps to run it:

```sh
npm run ganache-start //ganache-cli develop
npm run migrate //truffle migrate --reset
cd client
npm start
```

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
