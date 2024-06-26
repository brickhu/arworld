import {useEffect,useState,Fragment} from 'react'
import Link from "next/link"
import Head from 'next/head'
import * as ar from "../lib/arweave"

function Home() {
  const [walletInfo,setWalletInfo] = useState(null)
  const [tx,setTx] = useState(null)
  const [posting,setPosting] = useState(false)
  const [data,setData] = useState(null)


  useEffect(()=>{
    const address = ar.getCurrentWallet()
    if(address){
      setWalletInfo({address})
    }
  },[])

  useEffect(()=>async()=>{
    if(!tx) return
    console.log('获取data',tx)
    const data = await ar.getData(tx,{decode: true,string: true})
    console.log(data)
  },[tx])



  const createNewWallet = async() => {
    const {address} = await ar.generateWallet()
    setWalletInfo({address})
  }


  const testIrys = async() => {
    setPosting(true)
    const address = walletInfo?.address||await ar.getCurrentWallet()
    const key = await ar.getKeyByAddress(address)
    const postResult = await ar.postDataItem({
      data:{"body":"Global reliance on centrally controlled services is not healthy for blockchain ecosystems.Users should have options and blockchain networks should have client diversity.If we’re serious about securing data forever, we must strive for robust decentralized open source software and infrastructure. Where these options are not available, then centralized services should be transparent and as open as possible. They should be verifiable and allow anyone to run their own version. We built Turbo on these principles and will continue to evolve it to the needs of the community.As Sam Williams likes to say: build protocols not productocols."},
      tags:[{name:"Type",value:"JSON"}]
    },key)
    console.log('postResult: ', postResult);
    setTx(postResult?.id)
    setPosting(false)
  }

  const handleReloadUrl = () => {
    window.electronAPI.reloadUrl("https://www.baidu.com")
  }


  return (
    <Fragment>
      <Head>
        <title>arworld</title>
      </Head>
      <div>
      {walletInfo?
          <div>{walletInfo?.address+":"+walletInfo?.balance+" AR"}</div>:
          <div>
            <button
              className='btn-blue'
              onClick={createNewWallet}
            >
              createWallet
            </button>
          </div>
        }
                
        <button className='w-40 text-red-500 bg-black' onClick={testIrys} disabled={!walletInfo||posting}>{posting?'Posting...':"Post Data"}</button>
        <div>{tx?<span>{tx}</span>:<span>no tx</span>}</div>
        <div>
          <Link href='/post'>go to post</Link>
        </div>
        <div>
          <Link href='/browser'>browser →</Link>
        </div>
        <div>
          <Link href='/ao'>AO test →</Link>
        </div>
        <div>
          <button onClick={handleReloadUrl}>reload</button>
        </div>
      </div>
    </Fragment>
  )
}


export default Home;

