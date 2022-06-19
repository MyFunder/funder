import { MongoClient, ObjectId } from "mongodb";
import DonationDetail from "../../components/Donate/DonationDetail";

function DonationDetails(props) {
  return (
    <div>
      <DonationDetail
        image={props.donateData.image}
        name={props.donateData.name}
        desc={props.donateData.desc}
        amount={props.donateData.amount}
        period={props.donateData.period}
        address={props.donateData.address}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MongoURi);

  const db = client.db();

  const donationCollection = db.collection("donations");

  const donateData = await donationCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: donateData.map((donate) => ({
      params: { donateId: donate._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const donateId = context.params.donateId;

  const client = await MongoClient.connect(process.env.MongoURi);

  const db = client.db();

  const donationCollection = db.collection("donations");

  const selectedDonateData = await donationCollection.findOne({
    _id: ObjectId(donateId),
  });

  client.close();

  return {
    props: {
      donateData: {
        id: selectedDonateData._id.toString(),
        name: selectedDonateData.name,
        image: selectedDonateData.image,
        desc: selectedDonateData.desc,
        period: selectedDonateData.period,
        amount: selectedDonateData.amount,
        address: selectedDonateData.address,
      },
    },
  };
}
export default DonationDetails;
