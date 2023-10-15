import React, {useState, useEffect} from "react";
import {ethers} from 'ethers';


import "./signStyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//const hre = require("hardhat");

import JarvABI from "../abis/JarvABI.json"

// // Config
import config from "../config.json"
function Sign(props)
{
  const [name, setName] = useState("");
  const [num, setNum] = useState(null);
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [blood, setBlood] = useState("");
  const [eNum, setENum] = useState("");

  const handleName = (e)=>{
    setName(e.target.value);
  }

  const handleNum = (e)=>{
    setNum(e.target.value);
  }

  const handleAge = (e)=>{
    setAge(e.target.value);
  }

  const handleEmail = (e)=>{
    setEmail(e.target.value);
  }

  const handleBlood = (e)=>{
    setBlood(e.target.value);
  }
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("MetaMask or a compatible wallet is not installed.");
    }
  };

  
  const doBlockchain = async ()=>{
    try{
      if (!window.ethereum.selectedAddress) {
        await connectWallet();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Use your Ethereum node URL

      const signer = provider.getSigner();
      //const [signer] = new ethers.Signer();

      const contract = new ethers.Contract(config["31337"].Jarv.address, JarvABI, signer);

      const tx = await contract.setData(result.name, result.num,result.age, result.email, result.blood, result.hash);
      const t = await tx.wait();
      console.log("Transaction hash:", tx.hash);
      console.log(t.status);
      const addr = await signer.getAddress()
      console.log({addr});
      console.log({tx})
      console.log({t})
      // try {
      //   console.log(props.account);
      //   console.log(signer.getAddress());
      //   const userData = await contract.getData("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      //   console.log("User data:", userData);
      // } catch (error) {
      //   console.error("Error calling getData:", error);
      // }
      
    }catch(error){
      console.log("Error", error);
    }

  }
  
  const result = {}
  const handleSubmit = (e)=>{
    e.preventDefault();
    result.name = name
    result.num = num;
    result.age = age;
    result.email = email;
    result.blood = blood;
    result.hash = "hash";
    //putBlockchainData(result);
    doBlockchain();
  }

  useEffect(() => {
    if (window.ethereum.selectedAddress) {
      // Auto-fetch user data if the wallet is connected
      doBlockchain();
    }
  }, []);
    return (
        <>
          <p>{props.cond}</p>
            {/* get the domains and search if isSetUp is false or not. If it is false, then ask them to set up, else go to Login Page */}
            <main className="form-signin">
  <form>
    {/* LOGIN PAGE */}
    {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
    <h1 className="h3 mb-3 fw-normal discord-purple">Set Up</h1>

    {/* <div className="form-floating">
      <span><input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/></span>
      <span><input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/></span>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control radius-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div> */}

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Name: </span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={name} onChange={handleName}/>
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Phone No: </span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={num} onChange={handleNum}/>
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Gender: </span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={age} onChange={handleAge}/>
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Email: </span>
  <input type="email" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={email} onChange={handleEmail}/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Blood Group: </span>
  <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={blood} onChange={handleBlood}/>
</div>

<div className="input-group mb-3">
  <input type="file" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
</div>

{/* <div className="input-group mb-3">
  <input type="password" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
</div> */}

    <button className="w-100 btn btn-lg discord-background-purple" type="button" onClick={handleSubmit}>Sign in</button>
  </form>
</main>
        </>
    )
}


export default Sign;