import { useState } from "react";
import Image from "next/image";
import useWishlistDispatch from "../../hooks/useWishlistDispatch";
import useWishlistState from "../../hooks/useWishlistState";
import VariantPicker from "../VariantPicker";
import styles from "./product.module.scss";
import FlashingTriangle from "../flashingTriangle";
const Product = ({ product, gender, onChange, productName }) => {
  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();

  const { id, name, variants } = product;
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  const activeVariant = variants.find(
    (v) => v.external_id === activeVariantExternalId
  );
  const activeVariantFile = activeVariant.files.find(
    ({ type }) => type === "preview"
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price);

  const addToWishlist = () => addItem(product);
  const onWishlist = isSaved(id);

  function updateSelectedVariant(e) {
    setActiveVariantExternalId(e.target.value);
    console.log(e.target.value);
  }
  return (
    <article className={styles.productContainer}>
      <div className={styles.logo}>
        <Image
          src={"/rtcLogo.png"}
          width={50}
          height={50}
          alt={`${activeVariant.name} ${name}`}
          title={`${activeVariant.name} ${name}`}
        />
      </div>
      <p className={styles.productTitle}>{productName}</p>
      <div className={styles.productImageContainer}>
        {activeVariantFile && (
          <Image
            src={activeVariantFile.preview_url}
            width={150}
            height={150}
            alt={`${activeVariant.name} ${name}`}
            title={`${activeVariant.name} ${name}`}
          />
        )}
      </div>
      <div>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
      <div>
        <div className={styles.genderSelect}>
          <label>
            {gender == "female" && <FlashingTriangle />}
            FEMALE
            <input
              type={"radio"}
              name={`${name}-gender`}
              value={"female"}
              onChange={() => onChange("female")}
            />
          </label>
          <div className={styles.centerLine}></div>
          <label>
            {gender == "male" && <FlashingTriangle />}
            MALE
            <input
              type={"radio"}
              name={`${name}-gender`}
              value={"male"}
              onChange={() => onChange("male")}
            />
          </label>
        </div>

        <VariantPicker
          value={activeVariantExternalId}
          onChange={(e) => updateSelectedVariant(e)}
          variants={variants}
          disabled={oneStyle}
          productName={name}
          selected={activeVariantExternalId}
        />
        <button
          data-item-id={activeVariantExternalId}
          data-item-price={activeVariant.retail_price}
          data-item-url={`/api/products/${activeVariantExternalId}`}
          data-item-description={activeVariant.name}
          data-item-image={activeVariantFile.preview_url}
          data-item-name={name}
          className={`snipcart-add-item ${styles.addToCart}`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
