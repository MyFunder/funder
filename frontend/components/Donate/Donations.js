import { useRouter } from "next/router";

import styles from "./Donations.module.scss";
import btn from "../../styles/button.module.scss";
import Image from "next/image";
import matic from "../../public/polygon.png";
import { useContext, useState, useEffect } from "react";
import { Web3Context } from "../../contexts/Web3Context";
import { utils } from "ethers";

function Donations(props) {
  const { customContractInstance } = useContext(Web3Context);
  const [amountGen, setAmountGen] = useState();
  const router = useRouter();
  const { id, name, image, desc, address, period, amount } = props;
  function showDetailsHandler() {
    router.push("/" + id);
  }

  const amountGenerated = async () => {
    const genAmount = await customContractInstance.checkBalanceOf(
      props.address
    );
    setAmountGen(utils.formatUnits(genAmount, 18));
  };

  useEffect(() => {
    amountGenerated();
  });
  return (
    // <div className={styles.card}>
    <div className={styles.card__container}>
      <div className={styles.card__image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__amount}>
          <div className={styles.card__poly}>
            <div className={styles.card__polyIcon}>
              <Image src={matic} alt="matic" height={20} width={20} />
            </div>
            <p className={styles.card__totalPrice}>{amount} matic needed</p>
          </div>
          <div className={styles.card__poly}>
            <div className={styles.card__polyIcon}>
              <Image src={matic} alt="matic" height={20} width={20} />
            </div>
            <p className={styles.card__curPrice}>{amountGen} matic donated</p>
          </div>
        </div>
        <div className={styles.card__head}>
          <h2 className={styles.card__heading}>{name}</h2>
        </div>

        <div className={styles.card__addr}>
          <p className={styles.card__address}>{address}</p>
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
    // </div>
  );
}

export default Donations;
