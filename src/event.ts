const fs = require("fs")

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
  const rpc = "wss://rpc-node.gear-tech.io"
  // const workshopRpc = "wss://node-workshop.gear.rs/"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  gearApi.query.system.events((events) => {
    events.forEach(async ({
      event: { data, method }
    }) => {
      console.log({ method })

      if (method == "MessageDispatched") {
        const msg = new MessageDispatchedData(data)

        const messageId = msg.messageId.toHex()
        const outcome = msg.outcome

        console.log({ messageId })
        console.log({ outcome })

        console.log("isSuccess", outcome.isSuccess)
        console.log("isFailure", outcome.isFailure)

        if (outcome.isFailure) {
          const errMsg = outcome.asFailure.toHuman()
          console.log({ errMsg })
        } else {
          const okMsg = outcome.asSuccess.toHuman()
          console.log({ okMsg })
        }

      }

      if (method == "Log") {
        const logdata = new LogData(data)
        const payload = logdata.payload

        const metaFileBuffer = fs.readFileSync('./wasm/fungible_token.meta.wasm')
        const meta = await getWasmMetadata(metaFileBuffer)
        let type = meta.handle_output!

        let decoded = CreateType.create(type, payload, meta)
        console.log(/---payload decode---/)
        console.log(JSON.stringify(decoded))
        console.log(/---payload decode---/)
      }

    })

  })
}

getMessageDispatchedEvent()