import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import "../styles/app.css";
import { defaultSEO } from "../../next-seo.config";
import { WishlistProvider } from "../context/wishlist";
import { AppWrapper } from "../context/userState";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <WishlistProvider>
        <Layout>
          <DefaultSeo {...defaultSEO} />
          <Component {...pageProps} />
        </Layout>
      </WishlistProvider>
    </AppWrapper>
  );
}

export default MyApp;
