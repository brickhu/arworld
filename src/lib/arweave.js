import ArweaveMultihost from "arweave-multihost";
import { createData,ArweaveSigner } from "arbundles";


export const arweave = ArweaveMultihost.init(
  // Hosts
  [
    {
      host: "arweave.net", // Hostname or IP address for a Arweave host
      protocol: "https",   // Port
      port: 443,           // Network protocol http or https
    },
    {
      host: "g8way.io",
      protocol: "https",
      port: 443,
    },
    {
      host: "112.120.10.102",
      protocol: "http",
      port: 1984,
    },
    {
      host: "54.198.61.121",
      protocol: "http",
      port: 1984,
    },
  ], {
    timeout: 10000,         // Network request timeouts in milliseconds
  });

export const generateWallet = async() =>{
  let key = await arweave.wallets.generate();
  let address = await arweave.wallets.jwkToAddress(key)
  const wallet = {address,key}
  console.log('wallet: ', wallet);
  saveWallet(wallet)
  setCurrentWallet(wallet)
  return wallet
}

export const saveWallet = (wallet)=>{
  const wallets = JSON.parse(window.localStorage.getItem('wallets')) || []
  wallets.push(wallet)
  window.localStorage.setItem("wallets",JSON.stringify(wallets))
}

export const setCurrentWallet = (wallet) => {
  window.localStorage.setItem("currentWallet",wallet.address)
}

export const getCurrentWallet = () => {
  return window.localStorage.getItem("currentWallet")
}

export const getCurrentWalletInfo = async() => {
   const address = window.localStorage.getItem("currentWallet")
   if(address) {
    const balance = await getBalance(address)
    return {address,balance}
   }else{
    return null
   }
}

export const getBalance = async(address) => {
  const balance = await arweave.wallets.getBalance(address)
  if(balance<=0) {
    return 0
  }
  const ar = await arweave.ar.winstonToAr(balance)
  return ar
}

export const getKeyByAddress = (address) => {
  const wallets = JSON.parse(window.localStorage.getItem('wallets')) 
  console.log(wallets.length)
  if(wallets.length<=0) return
  const theWallet = wallets.find((item)=>item.address = address)
  if(!theWallet) return
  return theWallet?.key
}

export const postDataItem = async({data,tags},jwk) => {
  if(!jwk) return
  try {
    tags.push({name:"App",value:"arb"})
    const { TurboFactory } = await import('@ardrive/turbo-sdk/web')
    const signer = new ArweaveSigner(jwk);
    const turbo = TurboFactory.authenticated({ privateKey: jwk, });
    const dataItem = createData(typeof(data)==="string"?data:JSON.stringify(data), signer, {tags});
    await dataItem.sign(signer);
    const uploadResult = await turbo.uploadSignedDataItem({
      dataItemStreamFactory: () => dataItem.getRaw(),
      dataItemSizeFactory: () => dataItem.length,
      signal: AbortSignal.timeout(10_000), // Optional: cancel the upload after 10 seconds
    });

    console.log(uploadResult)
    return uploadResult
    
  } catch (error) {
    console.log('postDataItem error: ', error);
  }
}

