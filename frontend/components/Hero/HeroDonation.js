// import React from "react";
// import { useRouter } from "next/router";

// import styles from "./HeroDonation.module.scss";
// import btn from "../../styles/button.module.scss";

// function HeroDonation() {
//   const router = useRouter();

//   const showDetailHandler = () => {
//     router.push("/" + props.id);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>
//         Donations <span>Ongoing</span>
//       </h2>
//       <div className={styles.card}>
//         <div className={styles.card__container}>
//           <div className={styles.card__image}>
//             <img src="./doctor.png" alt="school fees" />
//           </div>
//           <div className={styles.card__content}>
//             <div className={styles.card__amount}>
//               <p className={styles.card__totalPrice}>$2000 needed</p>
//               <p className={styles.card__curPrice}>$530 donated</p>
//             </div>

//             <div className={styles.card__head}>
//               <h2 className={styles.card__heading}>School Fees</h2>
//             </div>

//             <div className={styles.card__desc}>
//               <p className={styles.card__para}>
//                 James is a final year mediical students, who needs to pay his
//                 fees so he can write his final exams.
//               </p>
//             </div>
//             <div>
//               <button
//                 className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.card__btn}`}
//                 onClick={showDetailHandler}
//               >
//                 Donate Now
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* ////////////////// */}
//         <div className={styles.card__container}>
//           <div className={styles.card__image}>
//             <img src="./doctor.png" alt="school fees" />
//           </div>
//           <div className={styles.card__content}>
//             <div className={styles.card__amount}>
//               <p className={styles.card__totalPrice}>$2000 needed</p>
//               <p className={styles.card__curPrice}>$530 donated</p>
//             </div>

//             <div className={styles.card__head}>
//               <h2 className={styles.card__heading}>School Fees</h2>
//             </div>

//             <div className={styles.card__desc}>
//               <p className={styles.card__para}>
//                 James is a final year mediical students, who needs to pay his
//                 fees so he can write his final exams.
//               </p>
//             </div>
//             <div>
//               <button
//                 className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.card__btn}`}
//               >
//                 Donate Now
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* //////////////////////// */}
//         <div className={styles.card__container}>
//           <div className={styles.card__image}>
//             <img src="./doctor.png" alt="school fees" />
//           </div>
//           <div className={styles.card__content}>
//             <div className={styles.card__amount}>
//               <p className={styles.card__totalPrice}>$2000 needed</p>
//               <p className={styles.card__curPrice}>$530 donated</p>
//             </div>

//             <div className={styles.card__head}>
//               <h2 className={styles.card__heading}>School Fees</h2>
//             </div>

//             <div className={styles.card__desc}>
//               <p className={styles.card__para}>
//                 James is a final year mediical students, who needs to pay his
//                 fees so he can write his final exams.
//               </p>
//             </div>
//             <div>
//               <button
//                 className={`${btn.btn} ${btn.btn__animated} ${btn.btn__primary} ${styles.card__btn}`}
//               >
//                 Donate Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroDonation;
