import Head from "next/head";
import Hero from "../components/Hero/Hero";
import HeroDonation from "../components/Hero/HeroDonation";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Funder</title>
        <meta name="Funder" content="initial-scale=1" width="device-width" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <Hero /> */}
      <HeroDonation />
    </div>
  );
}
