import Product from "./Product/Product";
import { useState } from "react";
const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return null;
  console.log(products);
  const [genderRugged, setGenderRugged] = useState("female");
  const [genderRTC, setGenderRTC] = useState("male");
  //Lift the state to this file for male and female both tees,
  //When the user changes the gender, the product array replaces the item with the other gender.
  const ruggedShirts = products.filter((variant) =>
    variant.name.includes("Rugged") ? true : false
  );
  const reducedShirts = products.filter((variant) =>
    variant.name.includes("Reduced") ? true : false
  );
  console.log(reducedShirts, ruggedShirts);
  const reducedProducts = {
    male: reducedShirts.filter((variant) => variant.name.includes("Mens"))[0],
    female: reducedShirts.filter((variant) =>
      variant.name.includes("Women's")
    )[0],
  };
  const ruggedProducts = {
    male: ruggedShirts.filter((variant) => variant.name.includes("Men's"))[0],
    female: ruggedShirts.filter((variant) =>
      variant.name.includes("Women's")
    )[0],
  };
  console.log(reducedProducts);
  return (
    <>
      {/* {products.map((product) => (
        <Product key={product.id} {...product} />
      ))} */}
      {genderRugged == "female" ? (
        <Product
          key={ruggedProducts.female.id}
          product={ruggedProducts.female}
          onChange={(val) => setGenderRugged(val)}
          gender={genderRugged}
          productName={
            <>
              RUGGED
              <br /> TEE
            </>
          }
        />
      ) : (
        <Product
          key={ruggedProducts.male.id}
          product={ruggedProducts.male}
          onChange={(val) => setGenderRugged(val)}
          gender={genderRugged}
          productName={
            <>
              RUGGED
              <br /> TEE
            </>
          }
        />
      )}
      {genderRTC == "female" ? (
        <Product
          key={reducedProducts.female.id}
          product={reducedProducts.female}
          onChange={(val) => setGenderRTC(val)}
          gender={genderRTC}
          productName={
            <>
              REDUCED
              <br /> TEE
            </>
          }
        />
      ) : (
        <Product
          key={reducedProducts.male.id}
          product={reducedProducts.male}
          onChange={(val) => setGenderRTC(val)}
          gender={genderRTC}
          productName={
            <>
              REDUCED <br /> TEE
            </>
          }
        />
      )}
    </>
  );
};

export default ProductGrid;
