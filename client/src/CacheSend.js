import React from 'react';
import {drizzleConnect} from 'drizzle-react';
import drizzle from 'drizzle';

function CacheSend(){
  
var state = drizzle.store.getState()

if (state.drizzleStatus.initialized) {
    const stackId = drizzle.contracts.SimpleStorage.methods.set.cacheSend(2, {from: '0x3f...'})

    if (state.transactionStack[stackId]) {
        const txHash = state.transactionStack[stackId]

        return state.transactions[txHash].status
    }
}

return ('Loading...')
}