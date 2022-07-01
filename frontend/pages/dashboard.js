import { useContext, useState, useEffect } from "react";

import { Web3Context } from "../contexts/Web3Context";

function Dashboard() {
  const { provider, customContractInstance, connect, wallet } =
    useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);

  // check if user address has a fundraiser and == signer

  const onClickWithdrawAll = async () => {
    if (!provider) {
      alert("connect wallet to mumbai network and try again");
      await connect();
      return;
    }

    const genAmount = await customContractInstance.checkBalanceOf(
      wallet.address
    );

    console.log(Number(genAmount));
  };
  return (
    <div>
      <button onClick={onClickWithdrawAll}>Viewfn</button>
    </div>
  );
}

export default Dashboard;
