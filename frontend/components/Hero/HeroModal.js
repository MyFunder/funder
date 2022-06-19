import styles from "./HeroModal.module.scss";
import Link from "next/link";

function HeroModal({ showModal }) {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__card}>
        <span className={styles.modal__close}>&times;</span>
        <div className={styles.modal__btn}>
          <Link href="./donate">
            <button className={styles.modal__getBtn}>Donate</button>
          </Link>
          <Link href="./create">
            <button className={styles.modal__createBtn}>
              Create a Fundraiser
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroModal;
