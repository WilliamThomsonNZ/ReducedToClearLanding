import styles from "../components/Product/product.module.scss";
import FlashingTriangle from "./flashingTriangle/index";
const VariantPicker = ({ variants, productName, selected, ...props }) => {
  if (variants.length === (0 || 1)) return null;

  return (
    <div className={styles.variantsContainer}>
      {variants.map(({ external_id, name }) => (
        <label key={`${external_id}-label`}>
          {selected == external_id && <FlashingTriangle />}
          {name}
          <input
            type={"radio"}
            key={external_id}
            value={external_id}
            name={`${productName}-size`}
            onChange={props.onChange}
          />
        </label>
      ))}
    </div>
  );
};

export default VariantPicker;
