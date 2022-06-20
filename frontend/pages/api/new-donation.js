import { MongoClient } from "mongodb";

// POST /api/new-donation

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MongoURi);

    const db = client.db();

    const donationCollection = db.collection("donations");
    const result = await donationCollection.insertOne(data);

    console.log(result);

    client.close();

    // 201 indicate successful addiction
    res.status(201).json({ message: "Donation inserted" });
  }
}

export default handler;
