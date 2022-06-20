import fs from 'fs'
import { u8aToHex } from '@polkadot/util';
import {GearApi, GearKeyring, getWasmMetadata, DispatchMessageEnqueuedData } from '@gear-js/api'
import { exit } from 'process'

const jsonKeyring = fs.readFileSync('./account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "987654321")
const metaFileBuffer = fs.readFileSync('./wasm/fungible_token.meta.wasm')

const programId = "0x223a3aea44276c10764b22eae98769e68144f455ff0b10b8150a6c49e3010ea3"

async function mint() {
  const rpc = "wss://rpc-node.gear-tech.io"
  // const workshopRpc = "wss://node-workshop.gear.rs/"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const payload = {
    "mint":{
      "account": "5CyREBErNFhogptd92dtC8ybuoUczVYh2ijvdhTpS2PJGeq7",
      "amount": "1000",
    }
  }

  console.log("isLocked: ", keyring.isLocked)

  const meta = await getWasmMetadata(metaFileBuffer)

  try {
    const message = {
      destination: programId, // programId
      payload: payload,
      gasLimit: 2_000_000_000,
      value: 0
    }

    const res = await gearApi.message.submit(message, meta)
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
