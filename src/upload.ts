import fs from 'fs'
import { GearApi, GearKeyring, getWasmMetadata } from '@gear-js/api'
import { exit } from 'process'

const jsonKeyring = fs.readFileSync('./account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "11111111")
console.log("isLocked: ", keyring.isLocked)

async function uploadProgram() {
  const metaFileBuffer = fs.readFileSync('./wasm/fungible_token.meta.wasm')
  const codeBuffer = fs.readFileSync('./wasm/fungible_token.opt.wasm')

  const rpc = "wss://rpc-node.gear-tech.io"
  // const workshopRpc = "wss://node-workshop.gear.rs/"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const meta = await getWasmMetadata(metaFileBuffer)

  const payload = {
    name: "GearFans Token",
    symbol: "GFT"
  }

  const params = {
    code: codeBuffer,
    gasLimit: 2000_000_000,
    value: 0,
    initPayload: payload
  }

  try {
    const programId = await gearApi.program.submit(params, meta)
    console.log({programId})
  } catch (error) {
    console.error(`${error}`)
  }

  try {
    await gearApi.program.signAndSend(keyring, (data) => {
      console.log({data})
    })
  } catch (error) {
    console.error(`${error}`)
  }

  exit(0)
}

uploadProgram()
