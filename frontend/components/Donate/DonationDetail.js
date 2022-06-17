import React from "react";
import styles from "./DonationDetail.module.scss";
function DonationDetail(props) {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      <address>{props.desc}</address>
      <p>{props.period}</p>
    </section>
  );
}

export default DonationDetail;
