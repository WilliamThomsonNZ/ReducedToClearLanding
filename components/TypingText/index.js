import React from "react";
import styles from "./typing.module.scss";
import { motion } from "framer-motion";
import Triangle from "../../assets/triangle.svg";
const TypingText = ({ text }) => {
  const splitText = text.split("");
  const textContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0,
        staggerChildren: 0.04,
        delayChildren: 1,
      },
    },
  };

  const textVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.05,
      },
    },
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
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
        duration: 0.5,
        repeat: Infinity,
      },
    },
  };
  return (
    <div className={styles.typingTextContainer}>
      <motion.div
        variants={textContainerVariants}
        className={styles.textContainer}
        initial={"initial"}
        animate={"animate"}
      >
        {splitText.map((letter, index) => (
          <motion.span variants={textVariant} key={index}>
            {letter}
          </motion.span>
        ))}
        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.textBoxButton}
            variants={buttonVariants}
          >
            <motion.div
              className={styles.flashingTriangle}
              variants={flashingTriangle}
            >
              <Triangle />
            </motion.div>
            wen mint?
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TypingText;
