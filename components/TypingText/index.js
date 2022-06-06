import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./typing.module.scss";
import { motion } from "framer-motion";
import Triangle from "../../assets/triangle.svg";
const TypingText = ({
  text,
  clicked,
  setClicked,
  angle,
  rightEyeRef,
  leftEyeRef,
}) => {
  const splitText = text.split("");
  const textContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0,
        staggerChildren: 0.04,
        delayChildren: 2,
      },
    },
  };
  const laserLine = {
    fire: {
      width: 0,
      transition: {
        duration: 0.5,
        delay: 1.5,
      },
    },
    width: {
      width: 0,
    },
    stop: {
      width: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const eyes = {
    fire: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    stop: {
      opacity: 0,
      transition: {
        duration: 1,
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
    <div className={styles.typingTextContainer}>
      <div className={styles.laserEyesContainer}>
        <div className={styles.eyesContainer}>
          <div className={styles.eye} ref={leftEyeRef}>
            <motion.div
              variants={eyes}
              animate={clicked ? "fire" : "stop"}
              className={styles.outerEye}
            ></motion.div>
            <motion.div
              variants={eyes}
              animate={clicked ? "fire" : "stop"}
              className={styles.innerEye}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setClicked(false);
                }, 1000);
              }}
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
      </div>

      <div className={styles.mobileGuide}>
        <Image src={"/mobileGuide.png"} width={200} height={200} />
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
