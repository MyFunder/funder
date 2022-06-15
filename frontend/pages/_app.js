import { Web3Provider } from "../contexts/Web3Context";

import "../styles/globals.scss";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Web3Provider>
  );
}

export default MyApp;
