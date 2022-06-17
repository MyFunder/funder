import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h4 className={styles.heading}>Funder</h4>
      </div>
      <div className={styles.nav}>
        <p className={styles.nav__para}>Forum</p>
        <p className={styles.nav__para}>Github</p>
        <p className={styles.nav__para}>Developers</p>
        <p className={styles.nav__para}>Docs</p>
      </div>

      <p className={styles.copy}>Copyrights 2022</p>
    </div>
  );
}

export default Footer;
