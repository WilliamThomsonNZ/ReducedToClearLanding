import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Laser = ({ width }) => {
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const [laserEyesActive, setLaserEyesActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftEyeDesktopRef = useRef(null);
  const rightEyeDesktopRef = useRef(null);
  let wayPoints = [];
  function setLaserDirection(e) {
    if (canvasRef.current == null || clicked || width < 1000) return;
    setClicked(true);
    setTimeout(() => {
      runLaserEyes(e);
    }, 1800);
  }
  const eyes = {
    fire: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8,
      },
    },
    stop: {
      opacity: 0,
      transition: {
        duration: 0.4,
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

  const character = {
    initial: {
      y: -200,
      rotate: 180,
      scaleX: -1,
    },

    fire: {
      y: 0,

      transition: {
        duration: 0.8,
      },
    },
    stop: {
      y: -200,
      rotate: 180,
      scaleX: -1,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  const canvasRef = useRef(null);
  function setCanvas() {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getEyePosition() {
    let leftEye = leftEyeDesktopRef.current.getBoundingClientRect();
    let rightEye = rightEyeDesktopRef.current.getBoundingClientRect();
    let xAdditional = 40;
    setLeftEyePosition({ x: leftEye.x + xAdditional, y: leftEye.y + 32 });
    setRightEyePosition({ x: rightEye.x + xAdditional, y: rightEye.y + 32 });
  }

  function fire(rightLine, leftLine) {
    //Get context for canvas & clear
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const widthOuter = width > 1400 ? 20 : 15;
    const widthInner = width > 1400 ? 10 : 5;
    const innerBlur = width > 1400 ? 2 : 1;
    // LeftEye
    ctx.beginPath();
    ctx.moveTo(leftEyePosition.x, leftEyePosition.y);
    ctx.lineTo(leftLine.x, leftLine.y);
    ctx.lineWidth = widthOuter;
    ctx.strokeStyle = "red";
    ctx.filter = "blur(15px)";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(leftEyePosition.x, leftEyePosition.y);
    ctx.lineTo(leftLine.x, leftLine.y);
    ctx.lineWidth = widthInner;
    ctx.strokeStyle = "#fff";
    ctx.filter = `blur(${innerBlur}px)`;
    ctx.stroke();

    //Right eye
    ctx.beginPath();
    ctx.moveTo(rightEyePosition.x, rightEyePosition.y);
    ctx.lineTo(rightLine.x + 10, rightLine.y + 10);
    ctx.lineWidth = widthOuter;
    ctx.strokeStyle = "red";
    ctx.filter = "blur(15px)";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightEyePosition.x, rightEyePosition.y);
    ctx.lineTo(rightLine.x + 10, rightLine.y + 10);
    ctx.lineWidth = widthInner;
    ctx.strokeStyle = "#fff";
    ctx.filter = `blur(${innerBlur}px)`;
    ctx.stroke();
  }
  const leftLine = {
    x: leftEyePosition.x,
    y: leftEyePosition.y,
    vx: 0,
    vy: 0,
  };

  const rightLine = {
    x: rightEyePosition.x,
    y: rightEyePosition.y,
    vx: 0,
    vy: 0,
  };

  function runLaserEyes(e) {
    const endY = e.pageY;
    const endX = e.pageX;
    const points = calcWaypoints(endX, endY);
    wayPoints = points;
    update();
  }

  function calcWaypoints(endX, endY) {
    var vertices = [];
    vertices.push({
      x: rightEyePosition.x,
      y: rightEyePosition.y,
    });
    vertices.push({
      x: endX,
      y: endY,
    });
    vertices.push({
      x: rightEyePosition.x,
      y: rightEyePosition.y,
    });
    var waypoints = [];
    for (var i = 1; i < vertices.length; i++) {
      var pt0 = vertices[i - 1];
      var pt1 = vertices[i];
      var dx = pt1.x - pt0.x;
      var dy = pt1.y - pt0.y;
      for (var j = 0; j < 40; j++) {
        var x = pt0.x + (dx * j) / 40;
        var y = pt0.y + (dy * j) / 40;
        waypoints.push({
          x: x,
          y: y,
        });
      }
    }
    waypoints.push({ x: rightEyePosition.x, y: rightEyePosition.y });
    waypoints.push({ x: 0, y: 0 });
    return waypoints;
  }
  const t = 1;
  function update() {
    let animation;
    if (t < 82) {
      fire(rightLine, leftLine);
      leftLine.x = wayPoints[t - 1].x;
      leftLine.y = wayPoints[t - 1].y;

      rightLine.x = wayPoints[t - 1].x;
      rightLine.y = wayPoints[t - 1].y;
      t++;

      animation = requestAnimationFrame(update);
    } else {
      animation = requestAnimationFrame(update);
      cancelAnimationFrame(animation);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setClicked(false);
    }
  }

  useEffect(() => {
    console.log("running canvas setup");
    if (canvasRef.current != null) {
      setCanvas();
      getEyePosition();
    }
  }, [canvasRef.current]);
  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvasContainer}
        onClick={(e) => setLaserDirection(e)}
      ></canvas>
      <motion.div
        className={styles.socialsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: width > 1000 ? 5.5 : 0 }}
      >
        <a
          href={"https://twitter.com/reducedtoclear_"}
          className={styles.social}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <Image
            src={"/twitter.png"}
            width={80}
            height={80}
            className={styles.socialImage}
          />
        </a>
        <div
          className={`${styles.social} ${styles.discord}`}
          onClick={(e) => setLaserDirection(e)}
        >
          <div className={styles.discordHover}>
            <Image
              src={"/discordHover3.png"}
              width={80}
              height={80}
              className={styles.socialImage}
            />
          </div>
          <motion.div
            className={styles.discordBase}
            whileHover={{ opacity: 0 }}
            whileTap={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={"/discord3.png"}
              width={80}
              height={80}
              className={styles.socialImage}
            />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className={styles.imageContainer}
        variants={character}
        initial={"initial"}
        animate={clicked ? "fire" : "stop"}
      >
        <Image src={"/popOut.png"} height={200} width={200} />
      </motion.div>
      <div className={styles.eyesTest}>
        <div className={styles.eyesContainer}>
          <div className={styles.eye} ref={leftEyeDesktopRef}>
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
        </div>
        <div className={styles.eyesContainer}>
          <div className={styles.eye} ref={rightEyeDesktopRef}>
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
        </div>
      </div>
    </>
  );
};

export default Laser;
