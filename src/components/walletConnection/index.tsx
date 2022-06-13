import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/userState";
import { getProviderOrSigner } from "../../utils";
import styles from "./walletConnect.module.scss";
import Image from "next/image";
const WalletConnect = () => {
  const [useMetaMask, setUseMetaMask] = useState(false);
  const [walletSelectShow, setWalletSelectShow] = useState(false);
  const userState = useAppContext();

  async function connectWallet() {
    try {
      const signer = await getProviderOrSigner(true, useMetaMask);
      const addr = await signer.getAddress();
      userState.updateWalletAddress(addr);
      userState.updateWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

  function handleWalletSelect(metamask: boolean) {
    setUseMetaMask(metamask);
  }
  useEffect(() => {
    if (walletSelectShow) {
      connectWallet();
      setWalletSelectShow(false);
    }
  }, [useMetaMask]);

  async function handleConnectWalletClick() {
    setWalletSelectShow(true);
    if (!userState.walletConnected) {
    }
  }
  return (
    <>
      <button onClick={(e) => handleConnectWalletClick()}>
        {userState.walletConnected ? userState.userWallet : "Connect wallet"}
      </button>
      {walletSelectShow && (
        <div className={styles.walletSelectContainer}>
          <button
            className={styles.metaMaskContainer}
            onClick={(e) => handleWalletSelect(true)}
          >
            {/* <Image src={"../../assets/metamaskLogo"} /> */}
            <h6>MetaMask</h6>
          </button>
          <button
            className={styles.walletConnectContainer}
            onClick={(e) => handleWalletSelect(false)}
          >
            {/* <Image src={"../../assets/metamaskLogo"} /> */}
            <h6>WalletConnect</h6>
          </button>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
