import styles from "./DonationDetail.module.scss";
import btn from "../../styles/button.module.scss";
import Image from "next/image";
import matic from "../../public/polygon.png";
import { useContext, useState, useRef, useEffect } from "react";
import { Web3Context } from "../../contexts/Web3Context";
import { ethers, utils } from "ethers";

function DonationDetail(props) {
  const { provider, customContractInstance, contractInstance } =
    useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);
  const [amountGen, setAmountGen] = useState();
  const [status, setStatus] = useState();
  const amountInputRef = useRef();

  const beneficiaryStatus = async () => {
    const status = await customContractInstance.getBeneficiaryStatus(
      props.address
    );
    setStatus(status);
  };

  const amountGenerated = async () => {
    const genAmount = await customContractInstance.checkBalanceOf(
      props.address
    );
    setAmountGen(utils.formatUnits(genAmount, 18));
  };

  const onClickDonate = async (e) => {
    e.preventDefault();

    if (!provider) {
      alert("connect wallet to mumbai network and try again");
      await connect();
      return;
    }

    setSubmitting(true);
    const enteredAmount = amountInputRef.current.value;

    const Donation = await contractInstance.donateFunds(props.address, {
      value: ethers.utils.parseEther(enteredAmount.toString()),
    });
    const receipt = await Donation.wait(1);

    alert("Donation successfully");
    setSubmitting(false);
  };

  useEffect(() => {
    amountGenerated();
    beneficiaryStatus();
  }, [onClickDonate]);

  return (
    <section className={styles.detail}>
      <h2 className={styles.detail__heading}>Donate</h2>
      <div className={styles.detail__card}>
        <div className={styles.detail__image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={styles.detail__content}>
          <div className={styles.detail__price}>
            <div className={styles.detail__poly}>
              <Image src={matic} alt="matic" height={15} width={25} />
              <p className={styles.detail__totalPrice}>{props.amount} needed</p>
            </div>
            <div className={styles.detail__poly}>
              <Image src={matic} alt="matic" height={15} width={20} />
              <p className={styles.detail__curPrice}>{amountGen} donated</p>
            </div>
          </div>
          <p className={styles.detail__addr}>Address: {props.address}</p>
          <div className={styles.detail__name}>
            <h1>{props.name}</h1>
          </div>

          <p className={styles.detail__desc}>{props.desc}</p>
          <p>{props.period}</p>
          <div className={styles.detail__input}>
            <input
              className={styles.detail__num}
              required
              type="number"
              id="amount"
              min="0"
              placeholder="Input amount"
              ref={amountInputRef}
            />
          </div>
          {status ? (
            <div>
              {!submitting ? (
                <button
                  className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.detail__btn}`}
                  onClick={onClickDonate}
                >
                  Donate
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className={styles.detail__status}>
              <p className={styles.detail__para}>
                Fundraiser not yet approve by dao
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DonationDetail;
