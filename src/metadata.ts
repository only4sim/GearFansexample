import fs from 'fs'
import { getWasmMetadata } from '@gear-js/api'

const metaFileBuffer = fs.readFileSync('./wasm/fungible_token.meta.wasm')

async function getMetaInfo() {
  const meta = await getWasmMetadata(metaFileBuffer)
  console.log(meta)
}

getMetaInfo()
