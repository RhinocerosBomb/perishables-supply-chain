import React from 'react';
import {drizzleConnect} from 'drizzle-react';
import drizzle from 'drizzle';

function CacheCall(){
  
var state = drizzle.store.getState()

if (state.drizzleStatus.initialized) {
    const dataKey = drizzle.contracts.SimpleStorage.methods.storedData.cacheCall()

    return state.contracts.SimpleStorage.storedData[dataKey].value
}

return ('Loading...')
}