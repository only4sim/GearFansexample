import { GearApi } from '@gear-js/api'

async function connect() {
  const rpc = "wss://rpc-node.gear-tech.io"

  const gearApi = await GearApi.create({
    providerAddress: rpc
  })

  const [chain, nodeName, nodeVersion] = await Promise.all([
    gearApi.chain(),
    gearApi.nodeName(),
    gearApi.nodeVersion(),
  ]);

  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`,
  );

  const unsub = await gearApi.gearEvents.subscribeToNewBlocks((header) => {
    console.log(
      `New block with number: ${header.number.toNumber()} and hash: ${header.hash.toHex()}`,
    );
  });
}

connect().catch(console.error)
