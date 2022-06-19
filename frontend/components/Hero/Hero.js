import styles from "./Hero.module.scss";
import HeroModal from "./HeroModal";
import { useState, useEffect } from "react";

function Hero() {
  const [showModal, setShowModal] = useState(false);

  const onClickShowModal = () => {
    if (!showModal) {
      setShowModal(true);
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.hero__box}>
        <h1>Spread Your Love,</h1>
        <h1>Through Donation</h1>
        <p>
          A decentralized crowdfunding platform to help raise funds to help
          frens in real time.
        </p>
        <div className={styles.hero__btn}>
          <button className={styles.hero__getBtn} onClick={onClickShowModal}>
            Get Started
          </button>
          <button className={styles.hero__watchBtn}>Watch Video</button>
        </div>
      </div>
      <HeroModal onClose={() => setShowModal(false)} showModal={showModal} />
    </div>
  );
}

export default Hero;
