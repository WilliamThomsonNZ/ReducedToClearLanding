import Head from "next/head";
import Image from "next/image";
import styles from "../styles/index.module.scss";
import TypingText from "../components/TypingText";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 });
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 });
  // const [wayPoints, setWayPoints] = useState([]);
  let wayPoints = [];
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setLoading();
    }, 8000);
  }, []);
  function setLaserDirection(e) {
    setClicked(true);
    setTimeout(() => {
      runLaserEyes(e);
    }, 1000);
  }

  const canvasRef = useRef(null);
  function setCanvas() {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getEyePosition() {
    const leftEye = leftEyeRef.current.getBoundingClientRect();
    const rightEye = rightEyeRef.current.getBoundingClientRect();
    setLeftEyePosition({ x: leftEye.x + 25, y: leftEye.y + 25 });
    setRightEyePosition({ x: rightEye.x + 25, y: rightEye.y + 25 });
  }

  function fire(rightLine, leftLine) {
    //Get context for canvas & clear
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // LeftEye
    ctx.beginPath();
    ctx.moveTo(leftEyePosition.x, leftEyePosition.y);
    ctx.lineTo(leftLine.x, leftLine.y);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "red";
    ctx.filter = "blur(15px)";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(leftEyePosition.x, leftEyePosition.y);
    ctx.lineTo(leftLine.x, leftLine.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#fff";
    ctx.filter = "blur(1px)";
    ctx.stroke();

    //Right eye
    ctx.beginPath();
    ctx.moveTo(rightEyePosition.x, rightEyePosition.y);
    ctx.lineTo(rightLine.x + 10, rightLine.y + 10);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "red";
    ctx.filter = "blur(15px)";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightEyePosition.x, rightEyePosition.y);
    ctx.lineTo(rightLine.x + 10, rightLine.y + 10);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#fff";
    ctx.filter = "blur(1px)";
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
    setCanvas();
    getEyePosition();
  }, []);

  const colors = ["#06ff29", "ff0000", "#06aeff", "#da06ff"];
  return (
    <div className={styles.container} onClick={(e) => setLaserDirection(e)}>
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
        <>
          <div className={styles.background}>
            ;
            <Image
              src={"/background.JPG"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            {/* <Image
              src={"/shadow.gif"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            /> */}
          </div>
          <motion.div
            className={styles.introPageContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
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

            <div className={styles.typingTextContainer}>
              <TypingText
                text={
                  "Dark forces of the non-fungible kind are converging XX/XX/2022 @ 11:11PM EST..."
                }
                clicked={clicked}
                setClicked={(val) => setClicked(val)}
                angle={10}
                leftEyeRef={leftEyeRef}
                rightEyeRef={rightEyeRef}
              />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
