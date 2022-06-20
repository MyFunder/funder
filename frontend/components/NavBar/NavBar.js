import React from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";

function NavBar() {
  return (
    <div className={styles.container}>
      <Link href="./">
        <h4 className={styles.items}>Home</h4>
      </Link>
      <Link href="./donate">
        <h4 className={styles.items}>Donate</h4>
      </Link>
      <Link href="./create">
        <h4 className={styles.items}>Create Fundraiser</h4>
      </Link>
      <Link href="./dao">
        <h4 className={styles.items}>Dao</h4>
      </Link>
    </div>
  );
}

export default NavBar;
