import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./typing.module.scss";
import { motion } from "framer-motion";
import Triangle from "../../assets/triangle.svg";
import useWindowWidth from "../../hooks/useWindowWidth";

const TypingText = ({
  text,
  clicked,
  setClicked,
  angle,
  rightEyeRef,
  leftEyeRef,
}) => {
  const width = useWindowWidth(200);
  const splitText = text.split("");
  const textContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0,
        staggerChildren: 0.04,
        delayChildren: width > 1000 ? 17.5 : 10.5,
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
  //   var canvas = document.getElementById('tutorial');
  // var ctx = canvas.getContext('2d');

  return (
    <motion.div
      className={styles.typingTextContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: width > 1000 ? 17 : 10 }}
    >
      {/* <div className={styles.laserEyesContainer}>
        <div className={styles.eyesContainer}>
        
          <div className={styles.laserContainer}>
            <motion.div
              variants={laserLine}
              animate={clicked ? "fire" : "stop"}
              className={styles.outerLine}
            ></motion.div>
            <motion.div
              variants={laserLine}
              animate={clicked ? "fire" : "stop"}
              className={styles.innerLine}
            ></motion.div>
          </div>
        </div>
        <div className={styles.eyesContainer}>
          <div className={styles.eye} ref={rightEyeRef}>
            <motion.div
              variants={eyes}
              animate={clicked ? "fire" : "stop"}
              className={styles.outerEye}
            ></motion.div>
            <motion.div
              variants={eyes}
              animate={clicked ? "fire" : "stop"}
              className={styles.innerEye}
            ></motion.div>
          </div>
          <div className={styles.laserContainer}>
            <motion.div
              variants={laserLine}
              animate={clicked ? "fire" : "stop"}
              className={styles.outerLine}
            ></motion.div>
            <motion.div
              variants={laserLine}
              animate={clicked ? "fire" : "stop"}
              className={styles.innerLine}
            ></motion.div>
          </div>
        </div>
      </div> */}

      <div className={styles.mobileGuide}>
        <Image src={"/mobileGuide-min.png"} width={200} height={200} priority />
      </div>
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
            <a
              href={
                "https://www.youtube.com/watch?v=zL19uMsnpSU&ab_channel=cameronbarnett"
              }
              target={"_blank"}
              rel={"noreferrer"}
            >
              <motion.div
                className={styles.flashingTriangle}
                variants={flashingTriangle}
              >
                <Triangle />
              </motion.div>
              Free ETH ?
            </a>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TypingText;
