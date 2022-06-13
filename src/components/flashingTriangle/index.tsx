import React from "react";
import Triangle from "../../assets/triangle.svg";
import { motion } from "framer-motion";
import styles from "./triangle.module.scss";
const FlashingTriangle = () => {
  const flashingTriangle = {
    initial: {
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    animate: {
      opacity: 1,

      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };
  return (
    <motion.div
      className={styles.flashingTriangle}
      variants={flashingTriangle}
      initial={"initial"}
      animate={"animate"}
    >
      <Triangle />
    </motion.div>
  );
};

export default FlashingTriangle;
