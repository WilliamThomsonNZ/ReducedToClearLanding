import {useAppContext} from "../context/userState"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Contract, utils } from "ethers";
import { getAmountMinted, getProviderOrSigner } from "../utils"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants"
import Head from "next/head";

export default function Mint() {
  const [totalMinted, setTotalMinted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amountToMint, setAmountToMint] = useState(1);
  const [displayError, setDisplayError] = useState(false);
  const userState = useAppContext();
  const [errorText, setErrorText] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function handleError(text:string) {
    setErrorText(text);
    setDisplayError(true);
    setTimeout(() => {
      setDisplayError(false);
    }, 6000);
  }
  function handleMintSuccess() {
    setDisplaySuccess(true);
    setTimeout(() => {
      setDisplaySuccess(false);
    }, 10000);
  }
  async function handleMintClick() {
    if (!userState.userWallet) {
      handleError("Please connect your wallet");
      console.log("wallet not connected")
      return;
    }
    if (loading) return;
    setLoading(true);
    const mintPrice = 0.02;
    try {
      if (amountToMint == 0) return;
      if (totalMinted == 20) return;
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const mintValue = String(amountToMint * mintPrice);
      const tx = await contract.mint(amountToMint, {
        value: utils.parseEther(mintValue),
      });
      await tx.wait();
      const amount = await getAmountMinted();
      setTotalMinted(amount);
      handleMintSuccess();
      setLoading(false);
    } catch (err) {
      console.error(err);
      let errorMessage;
      switch (err.code) {
        case "INSUFFICIENT_FUNDS":
          errorMessage = "Insufficient funds.";
          break;
        default:
          errorMessage =
            "An error occured and the transaction was not processed.";
          break;
      }
      handleError(errorMessage);
      setLoading(false);
    }
  }
  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, []);

  useEffect(() => {
    async function run() {
      const amount = await getAmountMinted();
      setTotalMinted(amount);
    }
    run();
  }, [userState.walletConnected]);

  return (
    <>
    <h1>
      Minting page
    </h1>
    <button onClick={e => handleMintClick()}>Mint</button>
    </>
  );
}
