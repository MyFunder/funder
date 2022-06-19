import React from "react";
import Donations from "./Donations";
import styles from "./DonateList.module.scss";

function DonateList(props) {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.heading}>
          Donations <span>Ongoing</span>
        </h2>
      </div>
      <div className={styles.list}>
        {/* <div className={styles.list__detail}>  */}
        {props.donateData.map((donate) => (
          <Donations
            key={donate.id}
            id={donate.id}
            name={donate.name}
            image={donate.image}
            desc={donate.desc}
            period={donate.period}
            amount={donate.amount}
            address={donate.address}
          />
        ))}
      </div>
    </div>
    //  </div>
  );
}

export default DonateList;
