import Head from "next/head";
import Image from "next/image";
import styles from "../styles/index.module.scss";
import TypingText from "../components/TypingText";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useWindowWidth from "../hooks/useWindowWidth";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  const [laserEyesActive, setLaserEyesActive] = useState(false);
  let wayPoints = [];
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftEyeDesktopRef = useRef(null);
  const rightEyeDesktopRef = useRef(null);
  const gifContainer = useRef(null);
  const width = useWindowWidth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 8000);
    setTimeout(() => {
      setLaserEyesActive(true);
    }, 20000);
  }, []);

  function setLaserDirection(e) {
    if (canvasRef.current == null || clicked || !laserEyesActive) return;
    setClicked(true);
    setTimeout(() => {
      runLaserEyes(e);
    }, 1000);
  }
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
    if (width < 1000) {
      xAdditional = 25;
      leftEye = leftEyeRef.current.getBoundingClientRect();
      rightEye = rightEyeRef.current.getBoundingClientRect();
    }
    setLeftEyePosition({ x: leftEye.x + xAdditional, y: leftEye.y + 25 });
    setRightEyePosition({ x: rightEye.x + xAdditional, y: rightEye.y + 25 });
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
    }
  }

  useEffect(() => {
    if (canvasRef.current != null) {
      setCanvas();
    }
  }, [canvasRef.current]);

  const colors = ["#06ff29", "ff0000", "#06aeff", "#da06ff"];
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <div className={styles.loadingAnimation}>
          <div className={styles.loadingAnimationInner}>
            <img
              src={"/loading.gif"}
              className={styles.loadingAnimationImage}
            />
            <a
              href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/62841633602125627004461028476566339821126370754397700221279471775592520613889"
              className={styles.nftLink}
              target="_blank"
              rel="noreferrer"
            />
          </div>
        </div>
      ) : (
        <div className={styles.container} onClick={(e) => setLaserDirection(e)}>
          <div className={styles.background}>
            ;
            <Image
              src={"/background.JPG"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority={true}
            />
            <motion.div className={styles.gifContainer} ref={gifContainer}>
              <img src={"/testpng.png"} classclassName={styles.gifImage} />
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
                      // onAnimationComplete={() => {
                      //   setTimeout(() => {
                      //     setClicked(false);
                      //   }, 1000);
                      // }}
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
            </motion.div>
          </div>
          <motion.div
            className={styles.introPageContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: width > 1000 ? 12 : 1 }}
            onAnimationComplete={() => getEyePosition()}
          >
            <canvas ref={canvasRef} className={styles.canvasContainer}></canvas>
            <div className={styles.socialsContainer}>
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
              <div className={`${styles.social} ${styles.discord}`}>
                <div className={styles.discordHover}>
                  <Image
                    src={"/discordHover.png"}
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
                    src={"/discord.png"}
                    width={80}
                    height={80}
                    className={styles.socialImage}
                  />
                </motion.div>
              </div>
            </div>
            {/* <div className={styles.guideDesktop}>
              <Image src={"/mobileGuide.png"} width={400} height={400} />
            </div> */}
            <div className={styles.typingTextContainer}>
              <TypingText
                text={
                  "Greetings, anon. I am DOOMape, sent by the overlord himself to guide you through the smog of web3. Your early arrival is most welcome and preparations are well underway. Pay careful attention to the overlords official messenger @reducedtoclear_ that is the ONLY way we will contact you."
                }
                clicked={clicked}
                setClicked={(val) => setClicked(val)}
                angle={10}
                leftEyeRef={leftEyeRef}
                rightEyeRef={rightEyeRef}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
