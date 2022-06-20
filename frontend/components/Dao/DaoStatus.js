import React from "react";
import styles from "./DaoStatus.module.scss";

import { useContext, useState, useRef, useEffect } from "react";
import { FunderAddr, FunderAbi } from "../../constants";
import { Web3Context } from "../../contexts/Web3Context";
import { Contract, ethers, utils } from "ethers";

function DaoStatus() {
  const { provider, connect } = useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);
  const statusInputRef = useRef();

  const onSetStatus = async (e) => {
    e.preventDefault();

    if (!provider) {
      alert("connect wallet to mumbai network and try again");
      await connect();
      return;
    }

    setSubmitting(true);
    const enteredAddr = statusInputRef.current.value;

    const signer = provider.getSigner();
    const FunderContractInstance = new Contract(FunderAddr, FunderAbi, signer);

    const setStatusTx = await FunderContractInstance.setStatus(
      enteredAddr.toString()
    );
    const receipt = await setStatusTx.wait(1);

    alert("Status set successfully");
    setSubmitting(false);
  };
  return (
    <div className={styles.status}>
      <label htmlFor="status">Set beneficiary Status</label>
      <input
        className={styles.status__input}
        required
        type="text"
        id="status"
        placeholder="input beneficiary address"
        ref={statusInputRef}
      />
      <button className={styles.status__btn} onClick={onSetStatus}>
        onSetStatus
      </button>
    </div>
  );
}

export default DaoStatus;
