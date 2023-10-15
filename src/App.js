import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import React from "react";
import Sign from "./components/Sign";
// // ABIs
import JarvABI from './abis/JarvABI.json'

// // Config
import config from './config.json';

function App() {

  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [jarv, setJarv] = useState(null);
  const [details, setDetails] = useState();
  const [isLoading, changeLoading] = useState(true);
  const loadBlockchainData = async ()=>{
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    setProvider(provider);

    const network = await provider.getNetwork()
    // console.log(network);

    const jarv = new ethers.Contract(config[network.chainId].Jarv.address, JarvABI, provider);
    setJarv(jarv);

    const accounts = await window.ethereum.request({'method': 'eth_requestAccounts'})
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);

    console.log(account);
    const details = await jarv.getData(account);
    setDetails(details);

    console.log(details);

    window.ethereum.on('accountsChanged', async ()=>{
      const accounts = await window.ethereum.request({'method': 'eth_requestAccounts'})
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
    changeLoading(false);
  }

  useEffect(()=>{
    loadBlockchainData();
  }, [])
  
  // make the set Data thing work and then check if the conditional rendering actually works
  // then do IPFS
  // for now keep IPFS empty
  return (
    <div>
        {/* <p>{account}</p> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : details.isSetUp ? (
          <p>Details are Set Up... You will be redirected shortly</p>
        ) : (
          <Sign account = {account}/>
        )}
    </div>
  );
}

export default App;