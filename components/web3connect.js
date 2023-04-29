import { nftCollection, nftAbi } from "./config";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import React from "react";

export const connectWallet = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const addressRaw = signer.getAddress();
  const addressStr = (await addressRaw).valueOf();

  let contract = new ethers.Contract(nftCollection, nftAbi, signer);
  let getIds = await contract.walletOfOwner(addressStr); //getting nft ids owned by the particular address

//   console.log(getIds[0]);

  // @note Grabbing the fiest nft for our job
  if (getIds[0] === undefined) {
    return 0;
  } else {
    return 1;
  }
};
