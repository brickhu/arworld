import Link from "next/link"
import { connect,createDataItemSigner } from "@permaweb/aoconnect";
// import { message, result, spawn,results } from "@permaweb/aoconnect";
import { Button } from "@/components/ui/button";
const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
  {
    MU_URL: "https://mu.ao-testnet.xyz",
    CU_URL: "https://cu.ao-testnet.xyz",
    GATEWAY_URL: "https://arweave.net",
  },
);

import { getCurrentWallet, getKeyByAddress,generateWallet,arweave,getCurrentWalletKey } from "@/lib/arweave"

export default function AOtest() {
  
  async function handleResult() {
    console.log('handleResult()')
    let data = await results({
      process: "tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I",
      sort: "ASC",
      limit: 25,
    });
    console.log(data)
  }

  async function handleMessage() {
    console.log('handleMessage()')
    const wallet = await getCurrentWalletKey();
    await message({
      /*
        The arweave TXID of the process, this will become the "target".
        This is the process the message is ultimately sent to.
      */
      process: "tm1jYBC0F2gTZ0EuUQKq5q_esxITDFkAG6QEpLbpI9I",
      // Tags that the process will use as input.
      tags: [
        { name: "Action", value: "Eval" },
        { name: "Another-Tag", value: "another-value" },
      ],
      // A signer function used to build the message "signature"
      signer: createDataItemSigner(wallet),
      /*
        The "data" portion of the message.
        If not specified a random string will be generated
      */
      data:"any data",
    })
    .then(console.log)
    .catch(console.error);
    
  }

  return (
    <div>
      <div><Link href="/">back</Link></div>
      <div className="flex gap-2">
        <Button onClick={handleMessage}>message发送消息</Button>
        <Button onClick={handleResult}>result读取单条结果</Button>
        <Button onClick={handleResult}>results读取多条结果</Button>
        <Button onClick={handleResult}>spawn创建进程</Button>
      </div>
    </div>
  )
}