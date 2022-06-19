import styles from "./HeroModal.module.scss";
import Link from "next/link";
import {useEffect} from 'react'

function HeroModal({ showModal, onClose }) {
  if (!showModal) {
    return null;
  }

  useEffect(() => {
	const close = (e) => {
	  if(e.keyCode === 27){
		onClose()
		
	  }
	}
	window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
},[])
  return (
    <div className={styles.modal} onClick={((e) => e.stopPropagation)} >
      <div className={styles.modal__card} >
        <span onClick={onClose} className={styles.modal__close}>&times;</span>
        <div className={styles.modal__btn}>
          <Link href="./donate">
            <button className={styles.modal__getBtn}>Donate</button>
          </Link>
          <Link href="./create">
            <button  className={styles.modal__createBtn}>
              Create a Fundraiser
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroModal;
