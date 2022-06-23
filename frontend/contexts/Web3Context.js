import { useEffect, createContext, useState } from "react";
import Web3Modal, { CHAIN_DATA_LIST } from "web3modal";
import { Contract, ethers } from "ethers";
import {
  DEFAULT_CHAIN_ID,
  providerOptions,
} from "../components/connector/Connectors";
import { DEFAULT_CHAINS } from "../components/connector/Blockchain";

import { FunderAddr, FunderAbi } from "../constants";

export const Web3Context = createContext();

export const Web3Provider = (props) => {
  const { children } = props;
  const [provider, setProvider] = useState();
  const [wallet, setWallet] = useState();
  const [modal, setModal] = useState();
  const [user, setUser] = useState();

  ////////////////////////////////////////////////////////////////////////////////////
  const onConnect = async (modal) => {
    const instance = await modal?.connect();
    if (!instance) {
      return undefined;
    }

    instance.on("accountsChanged", (accounts) => {
      const prov = new ethers.providers.Web3Provider(instance);
      if (wallet?.address !== accounts[0]) {
        getWeb3Account(prov);
      }
    });

    instance.on("chainChanged", (chainId) => {
      const prov = new ethers.providers.Web3Provider(instance);
      connectTo(DEFAULT_CHAIN_ID);
      getWeb3Account(prov);
    });

    const prov = new ethers.providers.Web3Provider(instance);
    const { chainId } = await prov.getNetwork();
    if (chainId !== DEFAULT_CHAIN_ID) {
      connectTo(DEFAULT_CHAIN_ID);
      setProvider(prov);
      getWeb3Account(prov);

      return prov;
    }
    setProvider(prov);
    getWeb3Account(prov);

    return prov;
  };

  ////////////////////////////////////////////////////////////////////////////

  const getWeb3Account = async (provider) => {
    if (!provider) {
      throw new Error("provider is not defined");
    }
    const myWallet = {};
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      myWallet.address = address;
      const bal = await provider.getBalance(address);
      myWallet.balance = bal;
      // const ensName = await provider.lookupAddress(address);
      // if (ensName) {
      // 	myWallet.ensName = ensName;
      // 	const resolver = await provider.getResolver(ensName);
      // 	const avatarMetaData = await resolver?.getText("avatar");
      // 	myWallet.avatar = avatarMetaData;
      // }
    } catch (e) {
      console.error(e);
    }
    setWallet(myWallet);
    return myWallet;
  };

  ///////////////////////////////////////////////////////////
  /**
   * Disconnect from the provider
   */
  const onDisconnect = async () => {
    if (modal?.cachedProvider === "custom-uauth") {
      modal?.clearCachedProvider();
      await uauth.logout();
    }
    if (modal) {
      modal?.clearCachedProvider();
      setWallet(undefined);
    }
  };

  /////////////////////////////////////////////////////////

  // when modal is available
  useEffect(() => {
    if (modal?.cachedProvider) {
      onConnect(modal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  /////////////////////////////////////////////////////////

  // on page load init web3modal
  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: CHAIN_DATA_LIST[DEFAULT_CHAIN_ID].network,
      cacheProvider: true,
      providerOptions,
      theme: {
        background: "rgb(229, 229, 229, 0.9)",
        main: "rgb(0, 0, 0, 0.6)",
        secondary: "rgb(136, 136, 136)",
        border: "rgb(9, 97, 247, 0.2)",
        hover: "rgb(9, 97, 247)",
      },
    });
    setModal(web3Modal);
  }, []);

  /////////////////////////////////////////////////////////

  /**
   * Calling connect on the Web3Modal instance will open the modal and return a provider
   * @returns ethers.providers.Web3Provider (or undefined if not connected)
   */

  const connect = async () => {
    if (modal) {
      try {
        const provider = await onConnect(modal);
        return provider;
      } catch (error) {
        console.error(error);
      }
    }
    return undefined;
  };

  ////////////////////////////////////////////////////////
  /**
   * Connect to a specific chain (asking wallet to switch/add network before connecting)
   * @param chainId chainId to connect to
   * @returns
   */
  const connectTo = async (chainId) => {
    if (!window.ethereum) {
      throw Error("No web3 provider found");
    }
    if (!DEFAULT_CHAINS.hasOwnProperty(chainId)) {
      throw Error(
        "Provided ChainId not supported. Supported chains are: ",
        DEFAULT_CHAINS
      );
    }
    const walletNetwork = window.ethereum.networkVersion;
    // console.log('current and default wallet network: ', walletNetwork);
    if (walletNetwork !== chainId.toString()) {
      return window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...DEFAULT_CHAINS[chainId.toString()],
            },
          ],
        })
        .then(() => {
          return connect();
        })
        .catch((e) => {
          console.error(e);
          return undefined;
        });
    } else {
      return connect();
    }
  };
  ////////////////////////////////////////////////////////
  /**
   * Disconnect wallet
   */
  const disconnect = () => {
    onDisconnect();
  };
  /////////////////////////////////////////////////////////
  // Custom contract Instance
  const customProvider = new ethers.providers.JsonRpcProvider(
    "https://matic-mumbai.chainstacklabs.com"
  );

  const customContractInstance = new Contract(
    FunderAddr,
    FunderAbi,
    customProvider
  );

  // Contract Instance

  const signer = provider?.getSigner();
  const contractInstance = new Contract(FunderAddr, FunderAbi, signer);

  const checkConnection = async () => {
    if (!provider) {
      alert("connect wallet to mumbai network and try again");
      await connect();
      return;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        wallet,
        provider,
        connect,
        connectTo,
        disconnect,
        customContractInstance,
        contractInstance,
        checkConnection,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
