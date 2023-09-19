import { ethers } from "ethers";
require("dotenv").config();

var provider;
var signer;

export const connectWallet = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
  
    await provider.send("eth_requestAccounts", []);
  
    signer = await provider.getSigner();
  
    console.log(signer);
}

export const getUserAddress = async () => {
    address = await signer.address;
    return address;
}