import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../context/userState";
import useWishlistState from "../hooks/useWishlistState";
import useSnipcartCount from "../hooks/useSnipcartCount";
import { getProviderOrSigner } from "../utils";
import Image from "next/image";
import WalletConnect from "../components/walletConnection";
const Layout = ({ children }) => {
  const { hasItems } = useWishlistState();
  const { cart } = useSnipcartCount();
  const cartHasItems = cart.items.count !== 0;

  return (
    <>
      {/* <header className="py-6 md:py-12">
        <WalletConnect />
        <Link href={"/"}>Home</Link>
        <Link href={"/merch"}>Merch</Link>
      </header> */}
      {/* <main className="py-6 md:py-12"> */}
      <div>{children}</div>
      {/* </main> */}
    </>
  );
};

export default Layout;
