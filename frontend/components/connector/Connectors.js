import * as UAuthWeb3Modal from "./uauth_web3modal";
import UAuthSPA from "@uauth/js";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN_DATA_LIST } from "web3modal";

export const DEFAULT_CHAIN_ID = 80001;

// These options are used to construct the UAuthSPA instance.
export const uauthOptions = {
  clientID: "fc231b70-0a18-4ab5-9c5e-3b0ed7266143",
  redirectUri: "https://funder-beige.vercel.app",
  scope: "openid wallet email:optional humanity_check:optional",
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        80001: process.env.ALCHEMY_URL,
      },
      network: CHAIN_DATA_LIST[DEFAULT_CHAIN_ID].network,
      chainId: 80001,
      // infuraId: "630e61a016f845e58b198597976a9d12", // Required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Clubry", // Required
      // infuraId: "630e61a016f845e58b198597976a9d12", // Required
      rpc: process.env.ALCHEMY_URL, // Optional if `infuraId` is provided; otherwise it's required
      chainId: 80001, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
  // All custom `web3modal` providers must be registered using the "custom-"
  // // prefix.
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },
};
