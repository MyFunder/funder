import React from "react";
import styles from "./DonationDetail.module.scss";
import btn from "../../styles/button.module.scss";

function DonationDetail(props) {
  return (
    <section className={styles.detail}>
      <h2 className={styles.detail__heading}>Donate</h2>
      <div className={styles.detail__card}>
        <div className={styles.detail__image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={styles.detail__content}>
          <div className={styles.detail__price}>
            <p className={styles.detail__totalPrice}>${props.amount}</p>
            <p className={styles.detail__curPrice}>${props.amount}</p>
          </div>
          <div className={styles.detail__name}>
            <h1>{props.name}</h1>
          </div>

          <p className={styles.detail__desc}>{props.desc}</p>
          <p>{props.period}</p>
          <div className={styles.detail__input}>
            <input
              className={styles.detail__num}
              type="number"
              required
              placeholder="Input amount"
            />
          </div>
          <div>
            <button
              className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.detail__btn}`}
              // onClick={showDetailsHandler}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationDetail;
