import { GearApi } from '@gear-js/api'

async function connect() {
  // const rpc = "wss://rpc-node.gear-tech.io"

  //testnet endpoint
  const rpc = "wss://rpc-node.gear-tech.io:443"
  // const workshopRpc = "wss://node-workshop.gear.rs/"
  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const [chain, nodeName, nodeVersion, genesis] = await Promise.all([
    gearApi.chain(),
    gearApi.nodeName(),
    gearApi.nodeVersion(),
    gearApi.genesisHash.toHex(),
  ]);

  console.log(
    `You are connected to chain ${chain} with genesis block ${genesis} using ${nodeName} v${nodeVersion}`,
  );

  const unsub = await gearApi.gearEvents.subscribeToNewBlocks((header) => {
    console.log(
      `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`,
    );
  });
}

connect().catch(console.error)
