import React from "react";

import { useContext, useState, useRef, useEffect } from "react";
import { FunderAddr, FunderAbi } from "../constants";
import { Web3Context } from "../contexts/Web3Context";
import { Contract, ethers } from "ethers";

function Dashboard() {
  const { provider, connect, wallet } = useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);

  // check if user address has a fundraiser and == signer

  const onClickWithdrawAll = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (!provider) {
      alert("connect wallet to mumbai network and try again");
      await connect();
      return;
    }
    const signer = provider.getSigner();
    // const customProvider = new ethers.providers.JsonRpcProvider(
    //   process.env.ALCHEMY_URL
    // );
    // await customProvider.ready;
    const FunderContractInstance = new Contract(FunderAddr, FunderAbi, signer);
    console.log(FunderContractInstance);
    const genAmount = await FunderContractInstance.checkBalanceOf(
      wallet.address,
      { gasPrice: ethers.utils.parseUnits("100", "gwei"), gasLimit: 1000000 }
    );

    console.log(genAmount);

    // const receipt = await genAmount.wait();
    // console.log(receipt);
  };
  return (
    <div>
      <button onClick={onClickWithdrawAll}>Viewfn</button>
    </div>
  );
}

export default Dashboard;
