import { MongoClient } from "mongodb";
import DonateList from "../components/Donate/DonateList";

function Donate(props) {
  const onClickDonate = async () => {};
  return (
    <div>
      <DonateList donateData={props.donateData} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MongoURi);

  const db = client.db();

  const donationCollection = db.collection("donations");

  const donateData = await donationCollection.find().toArray();

  client.close();

  return {
    props: {
      donateData: donateData.map((donate) => ({
        name: donate.name,
        id: donate._id.toString(),
        image: donate.image,
        desc: donate.desc,
        period: donate.period,
        amount: donate.amount,
      })),
    },
    revalidate: 1,
  };
}

export default Donate;
