import { providers, Contract } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function getProviderOrSigner(
  needSigner: boolean,
  metamask: boolean
): Promise<any> {
  let provider;
  console.log(metamask);
  if (metamask) {
    const web3modal = new Web3Modal({
      network: "rinkeby",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    provider = await web3modal.connect();
  } else {
    provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    await provider.enable();
  }

  const web3Provider = new providers.Web3Provider(provider);
  const { chainId } = await web3Provider.getNetwork();
  if (chainId != 31337) {
    window.alert("Change the network to rinkeby");
    throw new Error("Change network to rinkeby");
  }
  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
}

export function readifyAddress(addr: string): string {
  const readableAddr = `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  return readableAddr;
}

export async function getAmountMinted(): Promise<number> {
  try {
    const provider = await getProviderOrSigner(false, true);
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const amountMinted = await contract.totalSupply();
    return amountMinted;
  } catch (err) {
    console.error(err);
  }
}
