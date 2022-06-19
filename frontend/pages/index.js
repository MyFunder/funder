
import Hero from "../components/Hero/Hero";
import HeroDonation from "../components/Hero/HeroDonation";
import styles from "../styles/Home.module.scss";

let nowInMs = Date.now();
let nowInSecond = Math.round(nowInMs / 1000);
console.log(nowInSecond); //

export default function Home() {
  return (
    <div className={styles.container}>
     
      <Hero />
      {/* <HeroDonation /> */}
    </div>
  );
}
1655593286400;
