import fs from 'fs'
import { GearKeyring } from '@gear-js/api'

const jsonKeyring = fs.readFileSync('./account/key.json').toString()

const keyring = GearKeyring.fromJson(jsonKeyring, "987654321")

const _pub = keyring.publicKey
const _addressRaw = keyring.addressRaw

let publicKey = "0x" + Buffer.from(_pub).toString('hex')
let addressRaw = "0x" + Buffer.from(_addressRaw).toString('hex')

console.log("address type:", keyring.type)
console.log("publicKey: ", publicKey)
console.log("address Raw:", addressRaw)
console.log("address:", keyring.address)
console.log("meta:", keyring.meta)
