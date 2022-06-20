import fs from 'fs'

import {
  GearApi,
  CreateType,
  getWasmMetadata,
  DispatchMessageEnqueuedData,
  InitFailureData,
  InitMessageEnqueuedData,
  InitSuccessData,
  LogData,
  MessageDispatchedData,
} from '@gear-js/api';

async function getMessageDispatchedEvent() {
  // const rpc = "wss://rpc-node.gear-tech.io"

  //testnet endpoint
  // const rpc = "wss://rpc-node.gear-tech.io:443"

  //workshop endpoint
  const rpc = "wss://node-workshop.gear.rs:443"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  gearApi.query.system.events((events) => {
    // events
    //   .filter(({ event }) => gearApi.events.gear.MessageEnqueued.is(event))
    //   .forEach(({ event: { data } }) => {
    //     console.log(data.toHuman());
    //   });

    console.log(1);
  
    events
      //.filter(({ event }) => gearApi.events.balances.Transfer.is(event))
      .filter(({event}) => (event.section == "system" && event.method == "ExtrinsicFailed" ) || event.section == "gear")
      .forEach(({ event: { section, method, data } }) => {
        console.log(`${section}::${method}`);
        //console.log(method);
        console.log(data.toHuman());
        
      });
  })

}

getMessageDispatchedEvent()