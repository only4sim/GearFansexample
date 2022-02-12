import fs from 'fs'
import { GearApi, GearKeyring, getWasmMetadata } from '@gear-js/api'
import { exit } from 'process'

const jsonKeyring = fs.readFileSync('./account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "11111111")
const metaFileBuffer = fs.readFileSync('./wasm/fungible_token.meta.wasm')

async function sendMsg() {
  const rpc = "wss://rpc-node.gear-tech.io"
  // const workshopRpc = "wss://node-workshop.gear.rs"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const payload = {
    "BalanceOf": "5CyREBErNFhogptd92dtC8ybuoUczVYh2ijvdhTpS2PJGeq7"
  }

  const meta = await getWasmMetadata(metaFileBuffer)
  const programId = "0x223a3aea44276c10764b22eae98769e68144f455ff0b10b8150a6c49e3010ea3"

  try {
    const message = {
      destination: programId,
      payload: payload,
      gasLimit: 2000_000_000,
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
      console.log({data})
      console.log("********")
    })

  } catch (error) {
    console.error(`${error}`)
  }

  console.log()
  exit(0)
}

sendMsg()
