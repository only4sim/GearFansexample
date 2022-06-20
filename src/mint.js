import fs from 'fs'
import { u8aToHex } from '@polkadot/util';
import {GearApi, GearKeyring, getWasmMetadata, DispatchMessageEnqueuedData } from '@gear-js/api'
import { exit } from 'process'

const jsonKeyring = fs.readFileSync('../account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "987654321")
const metaFileBuffer = fs.readFileSync('../wasm/fungible_token.meta.wasm')

const programId = "0x4eadf300b249ff5ab9a73074d98ef2ce5084ddb91c60704d3728c89a14bfa36a"

async function mint() {
  // const rpc = "wss://rpc-node.gear-tech.io"

  //testnet endpoint
  // const rpc = "wss://rpc-node.gear-tech.io:443"

  //workshop endpoint
  const rpc = "wss://node-workshop.gear.rs:443"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const payload = {
    "mint":{
      //"account": "5CyREBErNFhogptd92dtC8ybuoUczVYh2ijvdhTpS2PJGeq7",
      "amount": "1000",
    }
  }

  console.log("isLocked: ", keyring.isLocked)

  // const meta = await getWasmMetadata(metaFileBuffer)

  // try{
  //   await gearApi.balance.transferBalance(keyring, "5CyREBErNFhogptd92dtC8ybuoUczVYh2ijvdhTpS2PJGeq7", 2)
  // } catch(error){
  //   console.error(`${error}`)
  // }


  // const state = await gearApi.programState.read(programId, metaFileBuffer, {});
  // console.log(state.toHuman());

  // const alice = await GearKeyring.fromSuri('//Alice');
  // gearApi. subsribeBalanceChange(keyring.address, (newBalance) => {
  //   console.log(newBalance.toHuman());
  //   console.log(newBalance);
  // });

  try {
    const message = {
      destination: programId, // programId
      payload: payload,
      //gasLimit: 2_000_000_000,
      gasLimit: 2000000,
      value: 0,
    }

    // const res = await gearApi.message.submit(message, meta)
    const res = await gearApi.message.submit(message)
  } catch (error) {
    console.error(`${error}`)
    exit(233)
  }

  try {
   await gearApi.message.signAndSend(keyring, async (data) => {
      console.log("********")
      console.log({data});
      console.log("********")
    })

  } catch (error) {
    console.error(`${error}`)
  }

  console.log()
  exit(0)
}

mint()
