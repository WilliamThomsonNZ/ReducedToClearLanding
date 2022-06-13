import * as React from "react";
import { GetStaticProps } from "next";
import shuffle from "lodash.shuffle";
import { useEffect, useState } from "react";
import { printful } from "../lib/printful-client";
import { formatVariantName } from "../lib/format-variant-name";
import { PrintfulProduct } from "../types";
import styles from "../styles/merch.module.scss";
import ProductGrid from "../components/ProductGrid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
type IndexPageProps = {
  products: PrintfulProduct[];
};

const IndexPage: React.FC<IndexPageProps> = ({ products }) => {
  const [overlayActive, setOverlayActive] = useState(false);
  return (
    <>
      <div>
        <h1>All Products</h1>
      </div>
      <button
        className={styles.merchShowButton}
        onClick={(e) => setOverlayActive(!overlayActive)}
      >
        <Image src={"/merchLogo.png"} height={80} width={80} />
      </button>
      <AnimatePresence>
        {overlayActive && (
          <motion.div
            className={styles.merchOverlayContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className={styles.merchShowButton}
              onClick={(e) => setOverlayActive(!overlayActive)}
            >
              X
            </button>
            <div className={styles.productGridContainer}>
              <ProductGrid products={products} />
            </div>
            <button className={styles.checkoutButton}>CHECKOUT</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { result: productIds } = await printful.get("sync/products");
  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );

  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
