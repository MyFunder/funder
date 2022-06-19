import { Web3Provider } from "../contexts/Web3Context";
import Head from "next/head";
import "../styles/globals.scss";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Header />
      <Head>
        <title>Funder</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Component {...pageProps} />
      <Footer />
    </Web3Provider>
  );
}

export default MyApp;
