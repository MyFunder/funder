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

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   if (req.method === "OPTION") {
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
//     return res.status(200).json({});
//   }
//   next();
// });
