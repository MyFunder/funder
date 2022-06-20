import { useContext, useState } from "react";
import CreateForm from "../components/CreateFundraiser/CreateForm";
import { FunderAddr, FunderAbi } from "../constants";
import { Web3Context } from "../contexts/Web3Context";
import { Contract, ethers } from "ethers";
import { useRouter } from "next/router";

function Create() {
  const { provider, connect, wallet } = useContext(Web3Context);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const router = useRouter();

  const onClickCreate = async (e) => {
    e.preventDefault();
    try {
      if (!provider) {
        alert("connect wallet to mumbai network and try again");
        await connect();
        return;
      }
      let data = {
        name: e.target.name.value, // string
        amount: Number(e.target.amount.value), // number
        image: e.target.image.value, // string
        desc: e.target.desc.value, // string
        period: e.target.period.value, // number
      };

      let myDate = data.period.split("-");
      let newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
      const date = newDate.getTime();
      console.log(date);

      setSubmitting(true);

      const signer = provider.getSigner();
      const FunderContractInstance = new Contract(
        FunderAddr,
        FunderAbi,
        signer
      );

      const createDonation = await FunderContractInstance.requestFund(
        data.name,
        data.amount,
        date
      );

      const receipt = await createDonation.wait(1);
      // Get the eventsId
      // const eventsId = receipt?.events[0].args[3].toString();
      // push Id into the data
      let addAddr = {
        address: wallet.address,
        date: date,
      };

      let pushIdData = { ...addAddr, ...data };

      console.log(pushIdData);

      //////////////////////////////////////////////////
      // Sending data to our backend
      const response = await fetch("/api/new-donation", {
        method: "POST",
        body: JSON.stringify(pushIdData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const dataBackend = await response.json();
      // console.log(dataBackend);

      setCompleted(true);
      alert("Fundraiser created successfully");
      setSubmitting(false);
      e.target.reset();
      router.push("/donate");
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  return (
    <div>
      <CreateForm
        submitting={submitting}
        completed={completed}
        onClickCreate={onClickCreate}
      />
    </div>
  );
}

export default Create;
