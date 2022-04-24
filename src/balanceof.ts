import fs from 'fs'
import { GearApi, GearKeyring } from '@gear-js/api'

const jsonKeyring = fs.readFileSync('./account/key.json').toString()
const keyring = GearKeyring.fromJson(jsonKeyring, "11111111")

const metapath = "./wasm/fungible_token.meta.wasm"
const metaFileBuffer = fs.readFileSync(metapath)
const programId = "0x1d0867c638d109b6d5b7336660e7688cacb939f1d1508062dd6d648389a9eaa6"

async function balance() {
  const rpc = "wss://rpc-node.gear-tech.io:443"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const addressRaw = keyring.addressRaw

  const state = await gearApi.programState.read(programId, metaFileBuffer, {
    BalanceOf: `${addressRaw}`,
  })

  const daoBalance = state.toHuman()
  console.log(daoBalance)

}

balance()
