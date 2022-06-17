import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Data from "./DonateData";
import styles from "./Donations.module.scss";
import btn from "../../styles/button.module.scss";

function Donations(props) {
  const router = useRouter();
  const { id, name, image, desc, period, amount } = props;
  function showDetailsHandler() {
    router.push("/" + id);
  }

  return (
    <li>
      <div className={styles.card}>
        <div className={styles.card__image}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__amount}>
            <p className={styles.card__totalPrice}>${amount} needed</p>
            <p className={styles.card__curPrice}>$530 donated</p>
          </div>

          <div className={styles.card__head}>
            <h2 className={styles.card__heading}>{name}</h2>
          </div>

          <div className={styles.card__desc}>
            <p className={styles.card__para}>{desc}</p>
          </div>
          <div>
            <button
              className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.card__btn}`}
              onClick={showDetailsHandler}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Donations;
