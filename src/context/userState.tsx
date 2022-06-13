import { createContext, useContext, useState } from "react";


interface UserState { 
    walletConnected:boolean;
    userWallet: string;
    web3Modal: any;
    updateWalletAddress:(val:string) => void;
    updateWalletConnected:(val:boolean) => void;
    updateWeb3Modal:(val:any) => void;
}
const AppContext = createContext({} as UserState);

export function AppWrapper({ children }) {
  const [userWallet, setUserWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [web3Modal, setWeb3Modal] = useState({});

  let userWalletState = {
    updateWalletAddress: (val) => setUserWallet(val),
    updateWalletConnected: (val) => setWalletConnected(val),
    updateWeb3Modal: (val) => setWeb3Modal(val),
    walletConnected,
    userWallet,
    web3Modal,
  };

  return (
    <AppContext.Provider value={userWalletState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
