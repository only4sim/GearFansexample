import fs from 'fs'
import { GearApi, GearKeyring } from '@gear-js/api'

const jsonKeyring = fs.readFileSync('../account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "987654321")

const metapath = "../wasm/fungible_token.meta.wasm"
const metaFileBuffer = fs.readFileSync(metapath)
const programId = "0x4eadf300b249ff5ab9a73074d98ef2ce5084ddb91c60704d3728c89a14bfa36a"

async function balance() {
  // const rpc = "wss://rpc-node.gear-tech.io"

  //testnet endpoint
  // const rpc = "wss://rpc-node.gear-tech.io:443"

  //workshop endpoint
  const rpc = "wss://node-workshop.gear.rs:443"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const addressRaw = keyring.addressRaw

  console.log(1)

  const state = await gearApi.programState.read(programId, metaFileBuffer, {
    BalanceOf: `${addressRaw}`,
  })

  const daoBalance = state.toHuman()
  console.log(daoBalance)

}

balance()
